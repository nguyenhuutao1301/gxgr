// app/post/[slug]/page.tsx
export const revalidate = 60 * 60 * 24;
import React, { FC } from "react";
import { siteConfig } from "@/config/site.config";
import { getPost } from "@/api/post/apiGetPosts";

import { Typography, Avatar, Divider, Chip } from "@mui/material";
import PageNotFond from "../../(static)/404/page";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";
//types
import type { Post } from "@/types/Post";

//helper
import helperArrayHeading from "@/helpers/extraArrayHeading";

//components
import ActionButton from "@/components/ActionButton";
import LabelBottomNavigation from "@/components/BottomNavigation";
import TrackUserLocation from "@/components/TrackLocation";
import LikePost from "@/components/Blogs/LikePost";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import PostContent from "@/components/Blogs/PostContent/PostContent";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
import GetReviewBlogsWithTags from "@/components/Blogs/GetBlogs/GetReviewWithTag";
import CallPrompt from "@/components/CallPrompt";
import SettingWrap from "@/components/SettingWrap";

// Sử dụng dynamic import cho CommentsSection và FAQSchema

const CommentsSection = dynamic(() => import("@/components/Blogs/CommentsSection/CommentsList"));
const FAQSchema = dynamic(() => import("@/components/Blogs/FAQSchema/FAQSchema"));

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

type PostPageProps = {
  params: { slug: string[] }; // slug là mảng các segment
};
const getFullImageUrl = (url?: string) =>
  url?.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL}${url ?? "/uploads/default-blogs.png"}`;

// Generate SEO metadata
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  if (!slug) {
    return {
      title: "404 - Page Not Found | GrapViet",
      description:
        "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
      alternates: {
        canonical: `${siteConfig.domain}/404`,
      },
      openGraph: {
        title: "404 - Page Not Found | GrapViet",
        description:
          "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
        type: "website",
        siteName: siteConfig.name,
      },
    };
  }
  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
    console.error(`Failed to fetch post with slug: ${slug}`);
    return {
      title: "bài viết không tồn tại",
      description: "The requested page could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const post = res.data;
  const imglink = getFullImageUrl(post.image?.url);
  const canonicalUrl = `${siteConfig.domain}/post/${slug}`;
  const headings = helperArrayHeading(post.content);
  const articleSection = headings.length > 0 ? headings : [post.category?.name ?? ""];
  return {
    title: post.title,
    description: post.description.substring(0, 160),
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      images: [imglink],
      type: "article",
    },
    other: {
      "article:published_time": post.publishedDate,
      "article:modified_time": post.modifiedDate || post.publishedDate,
      "article:author": post.authorName,
      "article:section": articleSection,
      "article:tag": post.tags.join(", "),
    },
  };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
  // Kết hợp lại thành chuỗi slug
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  if (!slug) {
    return <Typography color="error">URL không tồn tại</Typography>;
  }

  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
    console.error("Failed to fetch post:", res?.error);
    //404 page
    return (
      <>
        <Header />
        <PageNotFond />
        <SettingWrap slug={slug} Component={ActionButton} />
        <SettingWrap slug={slug} Component={LabelBottomNavigation} defaultPhone="0336488240" />
        <SettingWrap slug={slug} Component={CallPrompt} defaultPhone="0336488240" />
        <Footer />
      </>
    );
  }
  const post: Post = res.data;
  // Giả sử post có trường _id dùng để xác định bài viết, nếu không hãy dùng slug
  const postId = post?._id || slug;

  const imglink = getFullImageUrl(post.image?.url);
  const headings = helperArrayHeading(post.content);
  const articleSection = headings.length > 0 ? headings : [post.category?.name ?? ""];
  // Schema.org markup cho SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: imglink,
    author: {
      "@type": "Person",
      name: post.authorName,
      url: `${siteConfig.domain}${post.authorUrl}`,
    },
    publisher: {
      "@type": "Organization",
      name: "My Blog",
      logo: {
        "@type": "ImageObject",
        url: `${backendUrl}/uploads/logo.png`,
      },
    },
    datePublished: post.publishedDate ? post.publishedDate : "",
    dateModified: post.modifiedDate ? post.modifiedDate || post.publishedDate : "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.domain}/post/${slug}`,
    },
    articleSection: articleSection,
    keywords: post?.tags ? post?.tags.join(", ") : "",
  };
  const hasLikes = (post.likes?.length ?? 0) > 0;

  const reviewSchema = hasLikes
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: post.title,
        image: post.image.url,
        description: post.description ?? "",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5.0",
          ratingCount: post.likes?.length ?? 1,
        },
      }
    : null;
  return (
    <>
      <section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: post.breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.name,
                item: `${siteConfig.domain}${breadcrumb.url}`,
              })),
            }),
          }}
        />
        {reviewSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(reviewSchema),
            }}
          />
        )}
        {/* FAQ Schema */}
        <FAQSchema content={post.content} />
      </section>

      <Header />
      <main className="px-1 md:px-8 lg:px-16 xl:px-24">
        {/* Breadcrumbs */}
        <section className="mt-5">
          <BreadcrumbsComponent breadcrumbs={post.breadcrumbs} currentTitle={post.title} />
        </section>

        {/* Main Post Content */}
        <article className="flex flex-col mt-5 xl:mt-8">
          <h1 className="text-wrap text-left text-lg text-black">{post.title}</h1>
          <section className="flex items-center mb-5">
            <Avatar alt={post.authorName} src={post.authorUrl} />
            <Link href={`${post.authorUrl}`} passHref>
              <Typography variant="body1" color="textSecondary" ml={2}>
                By {post?.authorName} | Published on {new Date(post.publishedDate).toLocaleDateString()}
              </Typography>
            </Link>
          </section>
          {/* Nội dung bài viết */}
          <section className="px-0 md:px-[100px]">
            <div className="blog-content w-full max-w-screen-xl mx-auto">
              <PostContent
                authorUrl={post.authorUrl}
                image={imglink}
                title={post.title}
                author={post.authorName}
                createdAt={post.publishedDate}
                content={post.content}
              />
            </div>
            <LikePost postId={postId} postLikes={post.likes ?? []} />
            <Divider sx={{ my: 2 }} />
            {post.tags.map((tag, index) => (
              <Chip key={index} label={`#${tag}`} sx={{ mr: 1, mb: 1 }} />
            ))}
          </section>
        </article>

        {/* Comments Section: chỉ hiển thị nếu bài viết tồn tại */}
        <section className="mb-8">
          <CommentsSection postId={postId} />
        </section>
        <GetReviewBlogsWithTags excludeSlug={post.slug} tags={post.tags} />
        <TrackUserLocation />
        <SettingWrap slug={slug} Component={ActionButton} />
        <SettingWrap slug={slug} Component={LabelBottomNavigation} />
        <SettingWrap slug={slug} Component={CallPrompt} />
      </main>
      <Footer slug={post.slug} />
    </>
  );
};

export default PostPage;
