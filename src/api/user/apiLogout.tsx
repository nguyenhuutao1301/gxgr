import axiosInstance from "../../untils/axios";

// Hàm gọi API logout và xóa accessToken trong session (cookie)
export async function logoutUser() {
  try {
    await axiosInstance.post("/api/logout");
    // Xóa accessToken khỏi cookie phía client
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
