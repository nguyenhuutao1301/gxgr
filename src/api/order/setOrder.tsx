import axiosInstance from "../../untils/axios";
import { AxiosError } from "axios";
import { BookingInfo } from "../../types/User";
import type { setOrderResult } from "@/types/api/order";

async function setOrder(info: BookingInfo): Promise<setOrderResult> {
  try {
    const response = await axiosInstance.post(
      "/api/booking/discord/create",
      info
    );
    return {
      success: true,
      result: response.data,
      message: "success",
      error: "",
    };
  } catch (error: unknown) {
    return {
      message: "error",
      success: false,
      error:
        ((error as AxiosError).response?.data as { message: string })
          ?.message || (error as AxiosError).message,
    };
  }
}
export { setOrder };
