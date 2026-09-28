export interface TeamPhoto {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  bio: string;
  photo: TeamPhoto;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTeamCollectionResponse {
  data: TeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}