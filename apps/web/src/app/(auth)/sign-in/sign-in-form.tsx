'use client';

import { useActionState } from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInAction, type SignInState } from './actions';

const initialState: SignInState = {};

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      {state.error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="gap-2">
        <LogIn aria-hidden="true" className="h-4 w-4" />
        {pending ? 'Signing in' : 'Sign in'}
      </Button>
    </form>
  );
}
