import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Allow cookies to be shared across different domains
          options = {
            ...options,
            sameSite: "none",
            secure: true,
          };

          request.cookies.set({
            name,
            value,
            ...options,
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow these routes to process without redirection
  if (
    request.nextUrl.pathname === "/auth/callback" ||
    request.nextUrl.pathname === "/confirm-email" ||
    request.nextUrl.pathname === "/auth/confirm"
  ) {
    return response;
  }

  if (
    user &&
    (request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/signup")
  ) {
    const url = new URL("/", request.url);
    if (request.headers.get("referer")?.includes("localhost:3001")) {
      url.port = "3001";
    }
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/callback",
    "/confirm-email",
    "/auth/confirm",
    "/",
  ],
};
