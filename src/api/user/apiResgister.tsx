import axiosInstance from "../../untils/axios";
import { AxiosError } from "axios";

export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
  otp: string;
}) {
  try {
    const response = await axiosInstance.post("/api/register", userData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message ?? "",
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (typeof error === "object" && error !== null) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (
        axiosError.response?.data?.message &&
        typeof axiosError.response.data.message === "string"
      ) {
        errorMessage = axiosError.response.data.message;
      } else if (
        "message" in error &&
        typeof (error as Error).message === "string"
      ) {
        errorMessage = (error as Error).message;
      }
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
