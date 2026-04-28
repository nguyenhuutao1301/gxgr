import axiosInstance from "../../untils/axios";
import { AxiosError } from "axios";
import { ortherUser } from "../../types/User";
interface UpdateUser {
  user: ortherUser;
  _id: string;
}
export async function updateUser({ user, _id }: UpdateUser) {
  try {
    const response = await axiosInstance.put(`/api/user/update/${_id}`, user);
    return { success: true, data: response.data };
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
      error: errorMessage,
    };
  }
}
