import axiosInstance from "@/untils/axios";
import { AxiosError } from "axios";

type UpdateSettingResponse = {
  success: boolean;
  message: string;
};

type UpdateSettingPayload = {
  slug?: string;
  numberphone?: string;
  notificationDiscord?: boolean;
};

async function updateSetting(id: string, payload: Partial<UpdateSettingPayload>): Promise<UpdateSettingResponse> {
  try {
    const { data } = await axiosInstance.put<UpdateSettingResponse>(
      `/api/setting/update/by-id?id=${encodeURIComponent(id)}`,
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Lỗi khi cập nhật setting:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export default updateSetting;
