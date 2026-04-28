// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const secret = searchParams.get("secret");

  // Kiểm tra secret token bảo mật
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Revalidate đường dẫn bài viết
  revalidateTag("getallpost");
  return Response.json({ revalidated: true, now: Date.now() });
}
