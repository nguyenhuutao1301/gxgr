import Link from "next/link";
import NewPostFooter from "@/components/Footer/NewPostFooter";
import { siteConfig } from "@/config/site.config";
type Props = {
  slug?: string;
};

export default function Footer({ slug }: Props) {
  return (
    <footer className="bg-blue-600 text-white py-8 z-40 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Cột 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Bài Viết Mới
            </h2>
            <NewPostFooter slug={slug} />
          </div>

          {/* Cột 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Hỗ Trợ & Thông Tin
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="no-underline hover:underline">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="no-underline hover:underline"
                >
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/about" className="no-underline hover:underline">
                  Giới Thiệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Liên Kết Nhanh
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/dat-xe" className="no-underline hover:underline">
                  Đặt Xe Online
                </Link>
              </li>
              <li>
                <Link href="/profile" className="no-underline hover:underline">
                  Thông Tin Tài Khoản
                </Link>
              </li>
              <li>
                <Link href="/post" className="no-underline hover:underline">
                  Tất Cả Bài Viết
                </Link>
              </li>

              <li>
                <Link
                  href="/promotion"
                  className="no-underline hover:underline"
                >
                  Khuyến Mãi
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              {siteConfig.title}
            </h2>

            <p className="text-sm mb-2 text-white">Hotline : 0336488240</p>
            <p className="text-sm mb-2 text-white">
              Website: {siteConfig.domain}
            </p>
            <p className="text-sm mb-2 text-white">
              Address: {siteConfig.contactInfo.address}
            </p>
          </div>
        </div>

        {/* Chân */}
        <div className="text-center mt-8 text-sm border-t border-white/20 pt-4">
          © 2025 coppyright by {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
