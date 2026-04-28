import axiosInstance from "../../untils/axios";
import axios, { AxiosError } from "axios";
const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL // Chạy ở server
    : "https://api.goixegiare.pro.vn"; // Chạy ở browser thì dùng relative
async function getUser(id: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user?id=${id}`);
    if (!data.success) {
      return {
        success: false,
        data: [],
      };
    }
    return {
      success: true,
      data: data.result,
      err: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
    };
  }
}
async function getAllUsers() {
  try {
    const { data } = await axiosInstance(`/api/user/get-all`);
    if (!data.success) {
      return {
        success: data.success ?? false,
        users: data.users ?? [],
        err: data.message ?? "",
      };
    }
    return {
      success: data.success ?? true,
      users: data.users ?? [],
      err: data.message ?? "",
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (typeof error === "object" && error !== null) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.data?.message && typeof axiosError.response.data.message === "string") {
        errorMessage = axiosError.response.data.message;
      } else if ("message" in error && typeof (error as Error).message === "string") {
        errorMessage = (error as Error).message;
      }
    }
    return {
      success: false,
      users: [],
      err: errorMessage,
    };
  }
}

export { getUser, getAllUsers };
