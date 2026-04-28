import axiosInstance from "../../untils/axios";
import type { ImageResult } from "@/types/api/image";
const getImage = async (): Promise<ImageResult> => {
  try {
    const { data } = await axiosInstance.get("/api/images");
    if (!data?.images) {
      return {
        success: false,
        message: "not found",
        images: [],
      };
    }
    return {
      message: "success",
      success: true,
      images: data?.images || [],
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { message: "error", success: false, images: [] };
  }
};
export { getImage };
