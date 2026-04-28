import axiosInstance from "../../untils/axios";
import { AxiosError } from "axios";
import type { CreatePostResult } from "@/types/api/post";

export async function createPost(postData: CreatePostResult) {
  try {
    const response = await axiosInstance.post("/api/posts", postData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        ((error as AxiosError).response?.data as { message: string })
          ?.message || (error as AxiosError).message,
    };
  }
}
