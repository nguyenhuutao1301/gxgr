import axiosIntance from "../../untils/axios";
import type { UpdateLikesResult } from "../../types/api/post";
async function updateLikes({
  postId,
  username,
}: {
  postId: string;
  username: string;
}): Promise<UpdateLikesResult> {
  try {
    const { data } = await axiosIntance.patch(
      `/api/posts/patch/update-like?postId=${postId}`,
      { username }
    );
    if (!data.success) {
      return {
        success: false,
        message: data.message ?? "error",
      };
    }
    return {
      message: data.message ?? "",
      success: data.success ?? true,
      result: data.likes ?? [],
    };
  } catch (error) {
    console.log("err fetch:", error);
    return {
      success: false,
      message: "error",
    };
  }
}
export { updateLikes };
