"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp, signInWithOAuth } from "@/app/actions/auth";
import { signUpSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { Apple, Github, LucideIcon } from "lucide-react";

const GoogleIcon: LucideIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l-2.307 2.307c-1.04-1.04-2.467-1.667-3.6-1.667-2.067 0-3.747 1.68-3.747 3.733s1.68 3.733 3.747 3.733c1.2 0 2.133-.4 2.813-1.093l-.013-.027z"
    />
  </svg>
);

export default function SignupPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: FormData) {
    setServerError(null);
    setIsLoading(true);
    const result = await signUp(formData);
    if (result?.error) {
      setServerError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Create an account
          </h1>
          <p className="text-muted-foreground">Sign up for Virtual Mirror</p>
        </div>

        <Form {...form}>
          <form action={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError && (
              <p className="text-destructive text-sm">{serverError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <form
            action={async () => {
              await signInWithOAuth("apple");
            }}
          >
            <Button variant="outline" className="w-full">
              <Apple className="h-5 w-5" />
            </Button>
          </form>
          <form action={signInWithOAuth.bind(null, "google")}>
            <Button variant="outline" className="w-full">
              <GoogleIcon className="h-5 w-5" />
            </Button>
          </form>
          <form action={signInWithOAuth.bind(null, "github")}>
            <Button variant="outline" className="w-full">
              <Github className="h-5 w-5" />
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
