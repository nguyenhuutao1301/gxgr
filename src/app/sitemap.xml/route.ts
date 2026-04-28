import { NextResponse } from "next/server";

export async function GET() {
  const host = "https://goixegiare.pro.vn";

  // Trang tĩnh
  const staticPages = [
    `${host}/`,
    `${host}/faq`,
    `${host}/about`,
    `${host}/privacy-policy`, // danh sách tổng
  ];

  const staticXml = staticPages
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("");

  // Gọi API backend lấy bài viết
  let dynamicXml = "";
  try {
    const res = await fetch(`${host}/api/posts/sitemap`, { cache: "no-store" });
    const data = await res.json();
    const escapeXml = (unsafe: string) =>
      unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    dynamicXml = data
      .map(
        (post: {
          loc: string;
          lastmod: string;
          images?: { loc: string; title: string; caption: string };
        }) => `
    <url>
      <loc>${post.loc}</loc>
      <lastmod>${post.lastmod}</lastmod>
      ${
        post.images
          ? `<image:image>
              <image:loc>${escapeXml(post.images.loc)}</image:loc>
              <image:title>${escapeXml(post.images.title)}</image:title>
              <image:caption>${escapeXml(post.images.caption)}</image:caption>
            </image:image>`
          : ""
      }
    </url>`
      )
      .join("");
  } catch (err) {
    console.error("Lỗi lấy bài viết sitemap:", err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  >
    ${staticXml}
    ${dynamicXml}
  </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
