import axiosInstance from "@/untils/axios";
import { AxiosError } from "axios";

// Kiểu dữ liệu gửi đi khi tạo mới
type CreateSettingPayload = {
  slug: string;
  numberphone: string;
  notificationDiscord: boolean;
};

// Kiểu dữ liệu trả về từ API
type CreateSettingResponse = {
  success: boolean;
  message: string;
};

async function createSettingApi(payload: CreateSettingPayload): Promise<CreateSettingResponse> {
  try {
    const { data } = await axiosInstance.post<CreateSettingResponse>("/api/setting/create", payload);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "",
      };
    }

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export default createSettingApi;
