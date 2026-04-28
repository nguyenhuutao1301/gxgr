import axiosIntance from "../../untils/axios";
import type { DeletedImageResult } from "@/types/api/image";
async function deletedImage(_id: string): Promise<DeletedImageResult> {
  try {
    const { data } = await axiosIntance.delete(`/api/images?_id=${_id}`);
    if (!data?.success) {
      return {
        success: false,
        message: "not found",
        error: "not found",
      };
    }
    return {
      success: true,
      message: "success",
      error: "",
    };
  } catch (error) {
    const mesErr = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: "catch err",
      error: mesErr,
    };
  }
}

export default deletedImage;
