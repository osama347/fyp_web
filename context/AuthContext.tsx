"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  subscription: any | null;
  refreshSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  session: null,
  subscription: null,
  refreshSession: async () => {},
});

const fetchUserSubscription = async (userId: string) => {
  const supabase = createClient();
  try {
    const { data, error, status, statusText } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching subscription:", error);
      console.error("Status:", status);
      console.error("Status Text:", statusText);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching subscription:", err);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    const supabase = createClient();
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    if (currentSession) {
      setSession(currentSession);
      setUser(currentSession.user);

      if (currentSession.user) {
        const sub = await fetchUserSubscription(currentSession.user.id);
        setSubscription(sub);
      }
    } else {
      setSession(null);
      setUser(null);
      setSubscription(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Get the initial session
    refreshSession();

    // Set up auth state change listener
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        session,
        subscription,
        refreshSession,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
