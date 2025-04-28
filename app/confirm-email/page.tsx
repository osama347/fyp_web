import Link from 'next/link';

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border text-center">
        <h1 className="text-2xl font-bold text-foreground">Check Your Email</h1>
        <p className="text-muted-foreground">
          We’ve sent a confirmation link to your email. Please click the link to confirm your account.
        </p>
        <p className="text-muted-foreground">
          Once confirmed, you’ll be redirected to the Virtual Mirror.
        </p>
        <Link href="/auth/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}