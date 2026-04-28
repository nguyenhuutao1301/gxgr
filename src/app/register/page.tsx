"use client";

import { useState, useEffect } from "react";
import { registerUser } from "@/api/user/apiResgister";
import { sendOtpRegisterUser } from "@/api/auth/registerAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Đăng ký tài khoản";
  }, []);

  const handleSendOtp = async () => {
    if (!username || !email || !password) {
      setStatus("error");
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    const result = await sendOtpRegisterUser({ email });
    if (result.success) {
      setStep("otp");
      setStatus("success");
      setMessage("OTP đã được gửi đến email của bạn.");
    } else {
      setStatus("error");
      setMessage("Gửi OTP thất bại.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setStatus("error");
      setMessage("Vui lòng nhập mã OTP.");
      return;
    }

    setLoading(true);
    const result = await registerUser({ email, otp, username, password });
    if (result.success) {
      setStatus("success");
      setMessage("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setStatus("error");
      setMessage(result.message || "Mã OTP không hợp lệ.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === "form" ? "Đăng ký tài khoản" : "Xác minh OTP"}
        </h2>

        {status && (
          <div
            className={`mb-4 px-4 py-2 text-sm rounded ${
              status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {step === "form" ? (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Đang gửi OTP..." : "Gửi OTP tới Email"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Đang xác minh..." : "Xác minh & Đăng ký"}
            </button>
            <p className="text-sm text-center">
              Không nhận được mã?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={handleSendOtp}
              >
                Gửi lại OTP
              </button>
            </p>
          </form>
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link href={"/login"} className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
