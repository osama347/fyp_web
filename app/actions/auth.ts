'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3001/auth/confirm',
    },
  });


  if (error) {
    return { error: error.message };
  }

  // Check if the user is authenticated immediately
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    
    redirect('http://localhost:3000/'); // Removed ?user=${user.id}
  } else {
    
    redirect('/confirm-email');
  }
}

export async function signInWithOAuth(provider: 'apple' | 'google' | 'github') {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3001/auth/callback',
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(data.url);
}

export async function signIn(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('http://localhost:3000/'); // Removed ?user=${user.id}
}

export async function signOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();
  redirect('/login');
}