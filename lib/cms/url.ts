const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
  throw new Error('CMS_URL environment variable is not configured');
}

export function getCmsUrl(path: string): string {
  return `${CMS_URL}${path}`;
}