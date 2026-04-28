// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const secret = searchParams.get("secret");

  // Kiểm tra secret token bảo mật
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!slug) {
    return Response.json({ revalidated: false, message: "Missing slug" });
  }

  // Revalidate đường dẫn bài viết
  revalidatePath(`/post/${slug}`);
  return Response.json({ revalidated: true, now: Date.now() });
}
