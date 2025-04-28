"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const [status, setStatus] = useState("loading");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // You can verify the session here if needed
      setStatus("success");
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-8 text-center">
        {status === "loading" ? (
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-primary/20 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        ) : (
          <>
            <CheckCircle className="h-24 w-24 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">
              Subscription Successful!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your subscription has been activated. You now have access to all
              the premium features.
            </p>
            <div className="space-y-4">
              <Link
                href="/profile"
                className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-md text-center font-medium"
              >
                View My Subscription
              </Link>
              <Link
                href="/"
                className="block w-full bg-muted py-3 px-4 rounded-md text-center font-medium"
              >
                Return to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
