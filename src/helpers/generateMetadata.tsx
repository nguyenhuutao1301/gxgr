import { Metadata } from "next";
import { Post } from "../types/Post";

const BaseApi = process.env.NEXT_PUBLIC_API_URL || "";
const UrlWeb = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function generateMetadata(
  post: Post,
  slug: string
): Promise<Metadata> {
  const fullImageUrl = post?.image?.url
    ? `${BaseApi}${post.image.url}`
    : `${BaseApi}/default-image.jpg`;

  return {
    title: post.title,
    description: post.description.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      url: `${UrlWeb}/post/${slug}`,
      images: [fullImageUrl],
      type: "article",
    },
    keywords: post.tags,
  };
}
