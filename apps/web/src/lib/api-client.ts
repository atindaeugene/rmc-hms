type ApiClientOptions = RequestInit & { accessToken?: string };

export async function apiClient<TResponse>(path: string, options: ApiClientOptions = {}): Promise<TResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_API_URL is not configured');

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (options.accessToken) headers.set('Authorization', `Bearer ${options.accessToken}`);

  const response = await fetch(`${baseUrl}${path}`, { ...options, headers, cache: 'no-store' });
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
  return response.json() as Promise<TResponse>;
}
