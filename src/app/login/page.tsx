"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/auth/apiLogin";
import { useUser } from "@/context/UserContext";
import { usePreviousPage } from "@/context/PreviousPageContext";
import Link from "next/link";

export default function LoginPage() {
  const { setUser } = useUser();
  const { redirectToPreviousPage } = usePreviousPage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleLogin = async () => {
    const userInfo = { email, password };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage("Sai Định Dạng Email");
      setStatus("error");
      return;
    }
    if (!password) {
      setMessage("Chưa Nhập Mật Khẩu ");
      setStatus("error");
      return;
    }
    setLoading(true);
    const { data, success } = await loginUser(userInfo);
    if (!success) {
      setMessage("Email hoặc mật khẩu sai !!!");
      setStatus("error");
      setLoading(false);
      return;
    }
    setUser(data?.user);
    setLoading(false);
    redirectToPreviousPage();
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

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

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link href={"/register"} className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
