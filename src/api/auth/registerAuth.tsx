import axiosIntance from "../../untils/axios";
import type { SendOtpRegisterUserResult } from "../../types/api/auth";
async function sendOtpRegisterUser({
  email,
}: {
  email: string;
}): Promise<SendOtpRegisterUserResult> {
  try {
    const { data } = await axiosIntance.post("/api/user/register/send-otp", {
      email,
    });

    return {
      success: data.success ?? true,
      otp: data.otp,
    };
  } catch (error) {
    console.warn("error", error);
    return {
      success: false,
      otp: "",
    };
  }
}
export { sendOtpRegisterUser };
