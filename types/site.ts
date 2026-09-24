export interface SiteSettings {
  id: number;
  documentId: string;
  companyName: string;
  footerText: string;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}