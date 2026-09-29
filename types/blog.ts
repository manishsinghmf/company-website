export interface BlogTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface BlogParagraphBlock {
  type: 'paragraph';
  children: BlogTextNode[];
}

export type BlogContentBlock = BlogParagraphBlock;

export interface BlogCoverImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContentBlock[];
  publishedDate: string;
  coverImage: BlogCoverImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiBlogCollectionResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}