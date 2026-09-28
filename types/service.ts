export interface ServiceImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  image: ServiceImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}