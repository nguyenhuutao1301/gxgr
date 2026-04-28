import PageNotFound from "@/components/PageNotFound";
import { Metadata } from "next";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Not Found | Trang 404 GRABVIET",
    description: "trang không còn tồn tại hoặc đã bị xóa khỏi trang web",
    alternates: {
      canonical: `${BaseUrl}/404`,
    },
    openGraph: {
      title: "Page Not Found | Trang 404 GRABVIET",
      description: "trang không còn tồn tại hoặc đã bị xóa khỏi trang web",
      images: [`${BaseUrl}/grab.jpg`],
      url: `${BaseUrl}/404`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Page Not Found | Trang 404 GRABVIET",
      description: "trang không còn tồn tại hoặc đã bị xóa khỏi trang web",
      images: [`${BaseUrl}/grab.jpg`],
    },
  };
}
const ErrorPage: React.FC = () => {
  return (
    <>
      <ClientMeta title={"Trang Không Tồn Tại"} />
      <PageNotFound />
    </>
  );
};

export default ErrorPage;
