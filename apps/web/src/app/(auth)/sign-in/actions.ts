'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInResponse = { accessToken: string; refreshToken: string };

export type SignInState = { error?: string };

export async function signInAction(_state: SignInState, formData: FormData): Promise<SignInState> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) return { error: 'Enter a valid email and password.' };

  let tokens: SignInResponse;
  try {
    tokens = await apiClient<SignInResponse>('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(parsed.data),
    });
  } catch {
    return { error: 'Sign in failed. Check your credentials and try again.' };
  }

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === 'production';
  cookieStore.set('rmc_access_token', tokens.accessToken, { httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: 60 * 15 });
  cookieStore.set('rmc_refresh_token', tokens.refreshToken, { httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });

  redirect('/dashboard');
}
