export default function getArticleSectionFromHTML(
  htmlContent: string
): string[] {
  if (!htmlContent) return [];

  // Tìm thẻ h2
  let matches = Array.from(htmlContent.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));

  // Nếu không có h2, fallback sang h3
  if (matches.length === 0) {
    matches = Array.from(htmlContent.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi));
  }

  const titles = matches.map((match) => {
    const raw = match[1] || "";
    return raw.replace(/<[^>]+>/g, "").trim(); // Xoá các thẻ HTML con nếu có
  });

  return titles.filter((t) => t.length > 0);
}
