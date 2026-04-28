import axiosInstance from "../../untils/axios";
import { AxiosError } from "axios";
async function deleteUserById(_id: string) {
  try {
    const { data } = await axiosInstance.delete(`/api/user?_id=${_id}`);
    if (!data.success) {
      return {
        success: false,
        message: "error",
      };
    }
    return {
      success: data.success ?? true,
      message: data.message ?? "success",
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
      users: [],
      err: errorMessage,
    };
  }
}
export { deleteUserById };
