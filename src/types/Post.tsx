// types/Post.ts

export type Image = {
  url: string;
  alt?: string;
};

export type Breadcrumb = {
  name: string;
  url: string;
};

export type Comment = {
  author: string;
  content: string;
  date: string; // ISO date string, e.g., "2024-11-06T00:00:00.000Z"
};

export type Category = {
  name: string;
  url: string;
};

export type Post = {
  _id: string;
  title: string;
  description: string; // Short description for SEO
  slug: string; // URL-friendly title
  content: string; // Main content, often in HTML or markdown
  authorName: string;
  authorUrl?: string; // Optional URL for author profile image or profile page
  publishedDate: string; // ISO date string for publication date
  modifiedDate?: string; // Optional date for last modification
  image: Image; // Main image with URL and alt text
  tags: string[]; // Keywords or topics related to the post
  category: Category; // Post category with name and URL
  breadcrumbs: Breadcrumb[]; // Array of breadcrumbs for navigation
  comments: Comment[]; // Array of comments
  createdAt: string;
  updatedAt: string;
  likes?: string[];
};
export type CategoryPostType = {
  label: string; // Category label
  url: string; // URL for the category
};
