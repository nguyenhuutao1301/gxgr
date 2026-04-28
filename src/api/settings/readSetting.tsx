import { siteConfig } from "../../config/site.config";

type ReadSetting = {
  _id: string;
  numberphone: string;
  slug: string;
  createdAt?: string;
  notificationDiscord: boolean;
};

type ApiResponse = {
  success: boolean;
  result: ReadSetting[];
  message: string;
};

export default async function readSettingApi(): Promise<ApiResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/setting/read/all`;

    const response = await fetch(url, {
      next: { revalidate: 86400, tags: ["settings"] }, // 24h
      headers: {
        "Content-Type": "application/json",
        // Chỉ cần nếu backend check Origin, nếu không thì bỏ đi cũng được
        Origin: siteConfig.domain ?? process.env.NEXT_PUBLIC_BASE_URL,
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }

    // Backend trả về { result, success, message }
    const res: ApiResponse = await response.json();
    return res;
  } catch (error: unknown) {
    console.error("Lỗi API:", error);
    const err = error as { message?: string };
    return {
      success: false,
      result: [],
      message: err.message || "Đã xảy ra lỗi",
    };
  }
}
