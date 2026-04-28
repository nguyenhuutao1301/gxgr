const TRACKING_SOURCES = {
  GOOGLE_ADS: "google ads",
  FACEBOOK: "facebook",
  ZALO: "zalo",
  SEO: "[SEO]",
  SEO_HOME: "[SEO] home",
  COCCOC: "coccoc",
};

/**
 * Phân tích URL để xác định nguồn truy cập (tracking source).
 *
 * Hàm sẽ thực hiện:
 * - Kiểm tra URL có chứa tham số quảng cáo (gclid, gbraid, fbclid, ...) để xác định nguồn Ads.
 * - Nếu không phải Ads, phân tách slug từ URL để trả về tên trang (SEO).
 *
 * @param {string} url - Full URL cần phân tích (ví dụ: "https://example.com/abc/xyz?gclid=123")
 * @returns {string} - Tên nguồn tracking:
 *   - GOOGLE_ADS nếu URL chứa gclid hoặc gbraid
 *   - FACEBOOK nếu URL chứa fbclid
 *   - ZALO nếu URL chứa "zalo"
 *   - COCCOC nếu URL chứa "coccoc"
 *   - SEO_HOME nếu là trang chủ (không có slug)
 *   - SEO <slug> nếu là trang nội dung (slug được làm sạch: bỏ -, _, trim)
 *
 * @example
 * checkRef("https://mysite.com/?gclid=abc123")
 * // Trả về: "GOOGLE_ADS"
 *
 * @example
 * checkRef("https://mysite.com/tin-tuc/khuyen-mai-dac-biet")
 * // Trả về: "SEO khuyen mai dac biet"
 *
 * @example
 * checkRef("https://mysite.com/")
 * // Trả về: "SEO_HOME"
 */

export const checkRef = (url: string): string => {
  try {
    if (!url || typeof url !== "string") {
      return TRACKING_SOURCES.SEO; // fallback nếu không có URL
    }

    const lowerUrl = url.toLowerCase();

    // ✅ Check nguồn Ads trước
    if (lowerUrl.includes("gclid") || lowerUrl.includes("gbraid")) {
      return TRACKING_SOURCES.GOOGLE_ADS;
    }
    if (lowerUrl.includes("fbclid")) {
      return TRACKING_SOURCES.FACEBOOK;
    }
    if (lowerUrl.includes("zalo")) {
      return TRACKING_SOURCES.ZALO;
    }
    if (lowerUrl.includes("coccoc")) {
      return TRACKING_SOURCES.COCCOC;
    }

    // ✅ Xử lý slug (nếu không phải ads)
    const parsedUrl = new URL(url); // dùng URL constructor để an toàn
    const pathSegments = parsedUrl.pathname
      .split("/")
      .filter((seg) => seg && seg.trim().length > 0);

    // Nếu không có slug → coi như home page
    if (pathSegments.length === 0) {
      return TRACKING_SOURCES.SEO_HOME;
    }

    // Lấy segment cuối cùng làm slug
    const lastSegment = pathSegments[pathSegments.length - 1];
    const cleanedText = lastSegment
      .replace(/[-_]+/g, " ") // thay "-" hoặc "_" bằng space
      .replace(/\s+/g, " ")
      .trim();

    return `${TRACKING_SOURCES.SEO} ${cleanedText}`;
  } catch (error) {
    console.warn("Error processing URL:", error);
    return TRACKING_SOURCES.SEO;
  }
};
