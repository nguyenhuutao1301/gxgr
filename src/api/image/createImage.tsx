import axiosIntance from "../../untils/axios";
import type { CreateImageResult } from "@/types/api/image";
async function createImage(file: File): Promise<CreateImageResult> {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const { data } = await axiosIntance.post("/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!data?.success) {
      return {
        success: false,
        message: "not found",
        error: "Upload failed",
        path: "",
      };
    }
    return {
      success: true,
      message: "success",
      error: "",
      path: data.path,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Upload failed";
    return {
      success: false,
      message: "catch error",
      error: errorMessage,
      path: "",
    };
  }
}

export default createImage;
