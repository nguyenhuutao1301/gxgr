import axiosInstance from "../../untils/axios";
import type { DeletePostResult } from "@/types/api/post";
// Hàm xóa bài viết theo id
export default async function deletePost(
  id: string
): Promise<DeletePostResult> {
  try {
    await axiosInstance.delete(`/api/posts/${id}`);
    return { success: true, error: "" };
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message: string } };
      message: string;
    };
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}
