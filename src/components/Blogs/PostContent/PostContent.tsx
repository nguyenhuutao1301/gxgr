// components/PostContent.tsx
import Link from "next/link";
import { FC } from "react";
import ImageWithBooking from "@/components/Blogs/ImageWithBooking";
type PostContentProps = {
  authorUrl?: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image?: string;
};

const PostContent: FC<PostContentProps> = ({
  title,
  author,
  authorUrl,
  createdAt,
  content,
  image,
}) => {
  return (
    <article className="max-w-4xl mx-auto p-4">
      {/* Ảnh */}
      {image && (
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-full md:w-[70%] aspect-[3/2] rounded overflow-hidden">
            <ImageWithBooking image={image} title={title} />
          </div>
        </div>
      )}

      {/* Nội dung bài viết */}
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Footer: Tác giả + Action */}
      <div className="mt-8 border-t pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm text-gray-600">
            <Link
              href={authorUrl ?? "/"}
              className="text-blue-600 hover:underline"
            >
              Đăng bởi {author}
            </Link>{" "}
            - {new Date(createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PostContent;
