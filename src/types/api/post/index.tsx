type CreatePostResult = {
  title: string;
  description: string;
  slug: string;
  content: string;
  authorName: string;
  authorUrl?: string;
  publishedDate?: string | Date;
  modifiedDate?: string | Date;
  image: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  category?: {
    name?: string;
    url?: string;
  };
  breadcrumbs?: {
    name?: string;
    url?: string;
  }[];
  comments?: {
    author: string;
    content: string;
    date?: string | Date;
  }[];
};
type DeletePostResult = {
  error: string;
  success: boolean;
};
type UpdateLikesResult = {
  success: boolean;
  result?: string[];
  message: string;
};
export type { CreatePostResult, DeletePostResult, UpdateLikesResult };
