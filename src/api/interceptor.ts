/** @format */

import axios from "axios";
import toast from "react-hot-toast";
import { getBaseApiUrl } from "@/utils/getBaseApiURL";
console.log("BASE URL PROCESS", getBaseApiUrl());
const api = axios.create({
  baseURL: getBaseApiUrl(),
  timeout: 20000, // Thời gian timeout là 10 giây
});

// Gắn request interceptor
api.interceptors.request.use(
  (config) => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (access_token && config.headers) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    // GẮN TOKEN VÀO HEADER CỦA TẤT CẢ CÁC REQUEST
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Đã có lỗi xảy ra";

    switch (status) {
      case 400:
        toast.error("⛔ Bad Request - Dữ liệu gửi lên không hợp lệ");
        console.error("🚫 Bad Request:", message);

        // Ví dụ: hiển thị toast
        // toast.error("Dữ liệu gửi lên không hợp lệ");
        break;

      case 401:
        toast.error("⛔ Lỗi xác thực - Vui lòng đăng nhập lại");
        console.error("🚫 401 Error:", message);

        localStorage.removeItem("token");
        window.location.href = "/login";
        break;

      case 403:
        toast.error("🚫 Forbidden - Không có quyền truy cập");
        console.error("🚫 403 Error:", message);

        // toast.error("Bạn không có quyền truy cập");
        break;

      case 500:
        console.error("💥 500 Server Error :", message);
        // toast.error("Lỗi hệ thống, vui lòng thử lại sau");
        break;

      default:
        console.error("🌐 Unknown Error:", message);
        // toast.error(message);
        break;
    }
    return Promise.reject(error);
  }
);

export default api;
