import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Building2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

type Branch = { id: string; code: string; name: string; isActive: boolean };

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('rmc_access_token')?.value;
  if (!accessToken) redirect('/sign-in');

  let branch: Branch;
  try {
    branch = await apiClient<Branch>('/branches/current', { accessToken });
  } catch {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Building2 aria-hidden="true" className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-base font-semibold">RMC HMS</h1>
              <p className="text-sm text-muted-foreground">{branch.name}</p>
            </div>
          </div>
          <span className="rounded-md border px-3 py-1 text-sm text-muted-foreground">{branch.code}</span>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-2xl font-semibold tracking-normal">Hospital Operations</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Core modules will be enabled after approval, starting from the agreed next module.</p>
      </section>
    </main>
  );
}
