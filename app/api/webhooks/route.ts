import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil", // Updated to match your project's API version
});

// Initialize Supabase client with admin privileges
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map plan names to UUIDs
// This map is used to convert plan names to their corresponding UUIDs
const PLAN_ID_MAP = {
  Starter: "00000000-0000-0000-0000-000000000001", // Replace with actual UUIDs
  Pro: "00000000-0000-0000-0000-000000000002",
  Enterprise: "00000000-0000-0000-0000-000000000003",
};

export async function POST(req: Request) {
  try {
    console.log("Webhook received");
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;
    console.log("Signature received:", signature);

    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    console.log("Webhook event verified, type:", event.type);

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed": {
        console.log("Processing checkout.session.completed");
        const session = event.data.object as Stripe.Checkout.Session;

        // Get user ID from client_reference_id
        const userId = session.client_reference_id;
        console.log("User ID:", userId);

        // Get plan name from metadata
        const planName = session.metadata?.plan_id;
        console.log("Plan name:", planName);

        // Map plan name to UUID
        const planId = PLAN_ID_MAP[planName as keyof typeof PLAN_ID_MAP];
        console.log("Plan ID:", planId);

        if (!userId || !planId) {
          console.error("Missing userId or planId", {
            userId,
            planName,
            planId,
          });
          return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        // Get subscription details from Stripe
        const subscriptionData = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        console.log("Subscription data retrieved:", subscriptionData.id);

        // Check if user already has an active subscription
        console.log("Checking for existing subscription...");
        const { data: existingSubscription, error: checkError } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", userId)
          .eq("status", "active")
          .single();

        console.log("Existing subscription check complete", {
          existingSubscription: !!existingSubscription,
          error: checkError?.message,
        });

        if (existingSubscription) {
          // Update existing subscription (upgrade case)
          console.log("Updating existing subscription...");
          const { error } = await supabase
            .from("subscriptions")
            .update({
              plan_id: planId,
              status: "active",
              stripe_subscription_id: subscriptionData.id,
              current_period_start: new Date(
                subscriptionData.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(
                subscriptionData.current_period_end * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingSubscription.id);

          if (error) {
            console.error("Error updating subscription:", error);
            throw error;
          }

          console.log(
            `Subscription upgraded for user ${userId} to plan ${planName}`
          );
        } else {
          // Create new subscription
          console.log("Creating new subscription...");
          const { error } = await supabase.from("subscriptions").insert({
            user_id: userId,
            status: "active",
            plan_id: planId,
            stripe_subscription_id: subscriptionData.id,
            current_period_start: new Date(
              subscriptionData.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscriptionData.current_period_end * 1000
            ).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (error) {
            console.error("Error inserting subscription:", error);
            throw error;
          }

          console.log(`New subscription created for user ${userId}`);
        }

        // Update user's subscription tier in `user_info`
        console.log("Updating user_info...");
        const { error: userInfoError } = await supabase
          .from("user_info")
          .update({
            tier: planName,
            stripe_subscription_id: subscriptionData.id,
            trial_count: null, // Reset trial count for paid plans
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (userInfoError) {
          console.error("Error updating user_info:", userInfoError);
          throw userInfoError;
        }
        console.log("user_info updated successfully");

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscriptionData = event.data.object as Stripe.Subscription;
        console.log("Processing subscription event:", event.type);
        console.log(
          "Subscription data:",
          JSON.stringify(subscriptionData, null, 2)
        );

        // Find the corresponding user in Supabase
        const { data: user, error: userError } = await supabase
          .from("user_info")
          .select("id")
          .eq("stripe_customer_id", subscriptionData.customer)
          .single();

        if (userError || !user) {
          console.error(
            "User not found for Stripe customer ID:",
            subscriptionData.customer
          );
          console.error("User error:", userError);
          return NextResponse.json(
            { error: "User not found" },
            { status: 400 }
          );
        }
        console.log("Found user:", user.id);

        // Update user_info with subscription details
        const { error: userInfoError } = await supabase
          .from("user_info")
          .update({
            stripe_subscription_id: subscriptionData.id,
            tier: subscriptionData.items.data[0].price.lookup_key as
              | "basic"
              | "standard"
              | "premium",
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (userInfoError) {
          console.error("Error updating user_info:", userInfoError);
          throw userInfoError;
        }
        console.log("user_info updated successfully for user:", user.id);

        // Insert or update subscription record in subscriptions table
        const { error: subscriptionError } = await supabase
          .from("subscriptions")
          .upsert(
            {
              user_id: user.id,
              stripe_subscription_id: subscriptionData.id,
              plan_id: subscriptionData.items.data[0].price.id,
              status: subscriptionData.status,
              start_date: subscriptionData.current_period_start
                ? new Date(
                    subscriptionData.current_period_start * 1000
                  ).toISOString()
                : new Date().toISOString(),
              end_date: subscriptionData.current_period_end
                ? new Date(
                    subscriptionData.current_period_end * 1000
                  ).toISOString()
                : null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: "stripe_subscription_id",
            }
          );

        if (subscriptionError) {
          console.error("Error upserting subscription:", subscriptionError);
          throw subscriptionError;
        }
        console.log(
          "Subscription record upserted successfully for user:",
          user.id
        );

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Processing invoice.payment_succeeded event");
        console.log("Invoice data:", JSON.stringify(invoice, null, 2));

        // Get the Stripe subscription ID - use subscription_id instead of subscription
        const subscriptionId = invoice.subscription_id as string;
        console.log("Subscription ID from invoice:", subscriptionId);

        // Retrieve the subscription details from Stripe
        const subscriptionData = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        console.log(
          "Retrieved subscription data:",
          JSON.stringify(subscriptionData, null, 2)
        );

        // Find the corresponding user in Supabase using the Stripe customer ID
        const { data: user, error: userError } = await supabase
          .from("user_info")
          .select("id")
          .eq("stripe_customer_id", subscriptionData.customer)
          .single();

        if (userError || !user) {
          console.error(
            "User not found for Stripe customer ID:",
            subscriptionData.customer
          );
          console.error("User error:", userError);
          return NextResponse.json(
            { error: "User not found" },
            { status: 400 }
          );
        }
        console.log("Found user for payment:", user.id);

        // Save the payment details into the `invoices` table
        const { error: invoiceError } = await supabase.from("invoices").insert({
          user_id: user.id,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_paid, // Amount paid in cents
          currency: invoice.currency,
          status: invoice.status,
          invoice_date: new Date(invoice.created * 1000).toISOString(),
          payment_date: new Date().toISOString(), // Current timestamp
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (invoiceError) {
          console.error("Error inserting invoice:", invoiceError);
          throw invoiceError;
        }

        console.log(
          `Payment saved for user ${user.id} with invoice ID ${invoice.id}`
        );

        // Update subscription status in subscriptions table
        const { error: subscriptionUpdateError } = await supabase
          .from("subscriptions")
          .update({
            status: subscriptionData.status,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId);

        if (subscriptionUpdateError) {
          console.error(
            "Error updating subscription status:",
            subscriptionUpdateError
          );
          throw subscriptionUpdateError;
        }
        console.log(
          `Subscription status updated for subscription ID ${subscriptionId}`
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscriptionData = event.data.object as Stripe.Subscription;

        // Find the corresponding user in Supabase
        const { data: user, error: userError } = await supabase
          .from("user_info")
          .select("id")
          .eq("stripe_subscription_id", subscriptionData.id)
          .single();

        if (userError || !user) {
          console.error(
            "User not found for subscription ID:",
            subscriptionData.id
          );
          return NextResponse.json(
            { error: "User not found" },
            { status: 400 }
          );
        }

        // Revert the user to the free tier
        const { error: updateError } = await supabase
          .from("user_info")
          .update({
            tier: "free",
            trial_count: 5, // Reset trial count to 5
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (updateError) {
          console.error("Error reverting user to free tier:", updateError);
          throw updateError;
        }

        console.log(`Subscription canceled for user ${user.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed", message: error.message },
      { status: 400 }
    );
  }
}
