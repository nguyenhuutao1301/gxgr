import axiosInstance from "../../untils/axios";
import type { CreatePostResult } from "@/types/api/post";

// Hàm cập nhật bài viết
export async function updatePost(
  id: string,
  postData: Partial<CreatePostResult>
) {
  try {
    const response = await axiosInstance.put(`/api/posts/${id}`, postData);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return {
      success: false,
      error: err.response?.data?.message || err.message || "An error occurred",
    };
  }
}
