'use server';

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

  try {
    await apiClient<SignInResponse>('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(parsed.data),
    });
  } catch {
    return { error: 'Sign in failed. Check your credentials and try again.' };
  }

  redirect('/dashboard');
}
