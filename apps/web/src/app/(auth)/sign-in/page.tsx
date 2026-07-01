import { Building2 } from 'lucide-react';
import { SignInForm } from './sign-in-form';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-normal">RMC HMS</h1>
            <p className="text-sm text-muted-foreground">Renice Medical Center</p>
          </div>
        </div>
        <SignInForm />
      </section>
    </main>
  );
}
