"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Subscription handler function
const handleSubscription = async (
  priceId: string,
  planName: string,
  userId: string
) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to initialize");

    // Create checkout session
    const {
      data: { sessionId },
    } = await axios.post("/api/create-checkout-session", {
      price: priceId,
      planName: planName,
      userId: userId,
    });

    // Redirect to Stripe checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Checkout error:", error);
    }
  } catch (err) {
    console.error("Subscription error:", err);
  }
};

function Pricing() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();

  const tiers = [
    {
      name: "Starter",
      id: "free",
      price: "0",
      priceId: "",
      description: "For casual users & first-time tryers",
      features: [
        "5 AI-powered virtual try-ons/month",
        "Basic clothing categories",
        "Standard resolution outputs",
        "Community support",
        "Public style sharing",
        "Watermarked results",
      ],
      cta: "Start Trying",
    },
    {
      name: "Pro",
      id: "pro",
      price: "29",
      priceId: "price_1RDQKmKaiKLF8iTyy1kfNzxA",
      description: "For fashion enthusiasts & content creators",
      features: [
        "Unlimited virtual try-ons",
        "Premium clothing categories",
        "HD resolution outputs",
        "Priority processing",
        "Background customization",
        "Exclusive style catalogs",
        "Watermark-free results",
        "Outfit saving & organization",
      ],
      cta: "Go Pro",
      featured: true,
    },
    {
      name: "Enterprise",
      id: "enterprise",
      price: "299",
      priceId: "",
      description: "For brands & retailers",
      features: [
        "Custom AI model training",
        "Bulk try-on processing",
        "White-label solutions",
        "API access",
        "Dedicated support",
        "Analytics dashboard",
        "Multi-user collaboration",
        "Custom integration",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
    },
  ];

  const handlePlanClick = (tier) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/auth/login");
      return;
    }

    if (tier.id === "enterprise") {
      window.location.href = "/contact";
    } else if (tier.priceId) {
      handleSubscription(tier.priceId, tier.name, user?.id);
    }
  };

  return (
    <div className="min-h-screen text-foreground">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start for free, upgrade when you need. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                tier.featured
                  ? "border-2 border-primary bg-card shadow-xl"
                  : "border border-border bg-card/50"
              }`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-4">
                  {tier.price === "0" ? "Free" : `$${tier.price}`}
                  <span className="text-lg text-muted-foreground">
                    {tier.price !== "Custom" && tier.price !== "0" && "/mo"}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePlanClick(tier);
                }}
              >
                {!isAuthenticated ? "Login to Subscribe" : tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground">
          <p className="mb-4">Need something different?</p>
          <Link
            href="/contact"
            className="text-primary hover:underline underline-offset-4"
          >
            Contact our sales team →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
