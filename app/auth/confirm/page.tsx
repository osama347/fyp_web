import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ConfirmPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login?error=Failed to confirm email");
  }

  // Check if email is confirmed
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user.email_confirmed_at) {
    redirect("/auth/login?error=Email not confirmed");
  }

  

  
  redirect("http://localhost:3000/");
}
