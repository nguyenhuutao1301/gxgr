import axiosInstance from "@/untils/axios";
import { AxiosError } from "axios";
import type { Post } from "@/types/Post";
import { siteConfig } from "@/config/site.config";
type GetPostslicePage = {
  success: boolean;
  message: "success" | "error" | "not found" | "unauthorized";
  totalPages?: number;
  post: Post[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
const apibase = process.env.NEXT_PUBLIC_API_URL ?? "https://api.goixegiare.pro.vn";
export async function getPost(slug: string) {
  try {
    const url = `${apibase}/api/posts/${slug}`;

    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 * 30 * 12 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }

    const data = await response.json(); // 👈 lấy body JSON

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    console.error("Lỗi API:", error);
    const err = error as { message?: string };
    return {
      success: false,
      error: err.message || "Đã xảy ra lỗi",
    };
  }
}
//get post by id params
async function getPostById(_id: string) {
  try {
    const response = await axiosInstance(`/api/posts/by-id/${_id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Lỗi API:", error);
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return {
      success: false,
      error: err.response?.data?.message || err.message || "Đã xảy ra lỗi",
    };
  }
}
// Hàm lấy tất cả bài viết, có thể giới hạn số lượng bằng limit
async function getAllPosts(limit?: number) {
  try {
    const url = limit ? `${apibase}/api/posts/get-all?limit=${limit}` : `${apibase}/api/posts/get-all`;
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 * 30 * 12 },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }
    const data = await response.json(); // 👈 lấy body JSON
    return { success: true, data };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
async function getFilterTagsPosts(tags: string[], limit?: number) {
  try {
    const url = limit ? `${apibase}/api/posts/filter/tags?limit=${limit}` : `${apibase}/api/posts/filter/tags`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
      // ✅ ISR: cache và revalidate sau 60 giây
      next: { revalidate: 2592000 },
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Request failed with status ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return {
      success: false,
      error: err.message || "An error occurred",
    };
  }
}

const getPostslicePage = async (currentPage?: number, limit?: number): Promise<GetPostslicePage> => {
  try {
    if (!currentPage || !limit) {
      throw new Error("Page and limit parameters are required");
    }

    const sanitizedPage = Math.max(1, currentPage);
    const sanitizedLimit = Math.min(100, Math.max(1, limit));
    const url = `/api/posts/get-all/page/?page=${sanitizedPage}&limit=${sanitizedLimit}`;
    const { data } = await axiosInstance.get(url);
    if (data && Array.isArray(data.data.posts)) {
      return {
        success: data?.data?.success || true,
        message: "success",
        post: data?.data?.posts as Post[],
        totalPages: data?.data?.pagination?.totalPages || 1,
        hasNextPage: data?.data?.pagination?.hasNextPage || false,
        hasPrevPage: data?.data?.pagination?.hasPrevPage || false,
      };
    } else {
      return {
        success: data?.data?.success || false,
        message: "not found",
        post: [],
        hasNextPage: data?.data?.pagination?.hasNextPage || false,
        hasPrevPage: data?.data?.pagination?.hasPrevPage || false,
      };
    }
  } catch (error) {
    console.error("Error fetching posts slice page:", error);
    return {
      message: "error",
      post: [],
      success: false,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
};
async function searchPosts(input: string) {
  try {
    const response = await axiosInstance(`/api/posts/find/query?q=${encodeURIComponent(input)}&limit=10`);
    return {
      success: true,
      data: response?.data?.data || [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: ((error as AxiosError).response?.data as { message: string })?.message || (error as AxiosError).message,
    };
  }
}

export { getPostslicePage, getAllPosts, getFilterTagsPosts, getPostById, searchPosts };
