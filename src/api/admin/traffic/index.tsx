import axiosInstance from "../../../untils/axios";
import { getTrafficDataByIdResult } from "../../../types/api/admin";
async function getTrafficData() {
  try {
    const response = await axiosInstance.get("/api/traffic");
    return {
      success: true,
      data: response.data.result,
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response &&
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
    ) {
      errorMessage =
        (error.response as { data: { message?: string } }).data.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}
async function getTrafficDataById(
  id: string
): Promise<getTrafficDataByIdResult> {
  try {
    const res = await axiosInstance(`/api/traffic/by-id?id=${id}`);
    if (!res || !res.data.success) {
      console.log("getTrafficDataById: notfound");
      return {
        success: false,
        message: "not found",
      };
    }
    return {
      success: res.data.success ?? true,
      message: res.data.message ?? "",
      result: res.data.result ?? {},
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "catch err",
    };
  }
}
export { getTrafficData, getTrafficDataById };
