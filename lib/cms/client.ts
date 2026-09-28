const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
  throw new Error('CMS_URL environment variable is not configured');
}

export async function cmsFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${CMS_URL}${endpoint}`, {
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `CMS request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}