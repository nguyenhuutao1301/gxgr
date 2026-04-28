import { getUser } from "@/api/user/apiGetUser";
import PageNotFound from "@/components/PageNotFound";
import ProfileClient from "./ProfileClient";

interface ProfilePageProps {
  params: { id: string };
}
import { Metadata } from "next";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// Generate SEO metadata
export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  if (!params) {
    return {
      title: "404 - Page Not Found | GrapViet",
      description:
        "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
      alternates: {
        canonical: `${BaseUrl}/404`,
      },
      openGraph: {
        title: "404 - Page Not Found | GrapViet",
        description:
          "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
        type: "website",
        siteName: "GrapViet",
      },
    };
  }
  const res = await getUser(params.id);
  if (!res?.success || !res?.data) {
    console.error(`Failed to fetch post with params: ${params.id}`);
    return {
      title: "người dùng không tồn tại",
      description:
        "người dùng chưa được đăng kí hoặc không còn tồn tại vui lòng thử lại hoặc liên hệ tổng đài",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const user = res.data;
  const canonicalUrl = `${BaseUrl}/profile/${params.id}`;
  const title = user.fullname
    ? `Trang Cá Nhân ${user.fullname} Grap Việt`
    : `Trang Cá Nhân | Grab Việt`;
  return {
    title: title,
    description: user.description ?? "trang cá nhân",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const res = await getUser(params.id);

  if (!res?.success) {
    return <PageNotFound />;
  }

  return <ProfileClient user={res.data} />;
}
