import { Link } from "@mui/material";
import { getAllPosts } from "@/api/post/apiGetPosts";
type Props = {
  slug?: string;
};

export default async function NewPostFooter({ slug }: Props) {
  const res = await getAllPosts(5);
  if (!res.success) {
    console.error("Failed to fetch posts:", res.error);
  }

  const posts =
    res.success && Array.isArray(res.data)
      ? res.data
          .filter((post) => !slug || post.slug !== slug)
          .map((post) => ({
            _id: post._id,
            slug: post.slug,
            title: post.title,
          }))
      : [];

  if (!posts.length) {
    return null;
  }
  return (
    <div>
      {posts.map((post) => (
        <Link
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          key={post._id}
          href={`/post/${post.slug}`}
          color="inherit"
          display="block"
          underline="hover"
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}
