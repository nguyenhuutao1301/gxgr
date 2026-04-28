import axiosInstance from "../../untils/axios";
import type { DeleteOrderByIdResult } from "../../types/api/order";
async function deleteOrderById(id: string): Promise<DeleteOrderByIdResult> {
  try {
    const { data } = await axiosInstance.delete(`/api/booking/delete?id=${id}`);
    if (!data.success) {
      return {
        success: false,
        message: "không có dữ liệu trả về",
        err: "not found",
      };
    }
    return {
      success: data.success ?? true,
      message: data.message ?? "xóa thành công",
    };
  } catch (error) {
    console.warn("error:", error);
    return {
      success: false,
      message: "lỗi khi lấy dữ liệu",
      err: "error fetch data",
    };
  }
}
export { deleteOrderById };
