// utils/axios.txs
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.goixegiare.pro.vn",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Thêm accessToken vào header nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy accessToken từ cookie
    const match = document.cookie.match(/accessToken=([^;]+)/);
    const accessToken = match ? match[1] : null;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Nếu lỗi 401 và chưa thử refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token (cookie refreshToken sẽ tự động gửi lên nhờ withCredentials)
        const res = await axiosInstance.post("/api/refresh");
        const { accessToken } = res.data;
        if (accessToken) {
          // Lưu accessToken mới vào cookie
          document.cookie = `accessToken=${accessToken}; path=/;`;
          // Gắn accessToken mới vào header và gửi lại request cũ
          originalRequest.headers.Authorization = accessToken;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh cũng lỗi, logout hoặc redirect login
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
