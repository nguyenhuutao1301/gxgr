import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/Post";
import { getFilterTagsPosts } from "@/api/post/apiGetPosts";
const ApiURL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  tags: string[];
  limit?: number;
  excludeSlug?: string;
};

export default async function GetReviewBlogsWithTags({
  tags,
  limit = 10,
  excludeSlug,
}: Props) {
  const res = await getFilterTagsPosts(tags, limit);
  const posts: Post[] = res?.success
    ? excludeSlug
      ? res.data.filter((post: Post) => post.slug !== excludeSlug)
      : res.data
    : [];

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString(
            "vi-VN",
            { year: "numeric", month: "2-digit", day: "2-digit" }
          );

          return (
            <div
              key={post._id}
              className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`${ApiURL}${post.image.url}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{formattedDate}</p>

                  <h3 className="text-lg font-semibold mb-2">
                    {post.title.length > 50
                      ? post.title.substring(0, 50) + "..."
                      : post.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {post.description.length > 60
                      ? post.description.substring(0, 60) + "..."
                      : post.description}
                  </p>

                  <p className="mt-2 text-sm font-medium text-blue-600">
                    Tác Giả: {post.authorName}
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <Link href={`/post/${post.slug}`}>
                    <span className="inline-block bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded hover:bg-blue-600 transition">
                      Xem thêm
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
