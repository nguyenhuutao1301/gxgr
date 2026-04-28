import axiosInstance from "@/untils/axios";
import { AxiosError } from "axios";

export type DeleteSettingResponse = {
  success: boolean;
  message: string;
};

async function deleteSetting(id: string): Promise<DeleteSettingResponse> {
  try {
    const { data } = await axiosInstance.delete<DeleteSettingResponse>(
      `/api/setting/delete/by-id?id=${encodeURIComponent(id)}`
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Lỗi khi xóa setting:", error.response?.data || error);

    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export default deleteSetting;
