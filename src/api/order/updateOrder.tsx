import axiosInstance from "../../untils/axios";
import type { Order } from "@/types/orther";
import type { UpdateOrderResult } from "@/types/api/order";
async function updateOrderChange(
  id: string,
  order: Partial<Order>
): Promise<UpdateOrderResult> {
  try {
    const { data } = await axiosInstance.put(
      `/api/booking/update?id=${id}`,
      order
    );
    if (!data.success) {
      return {
        success: false,
        message: "error",
      };
    }
    return {
      success: data.success ?? true,
      message: data.message ?? "success",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      message: "error",
      success: false,
    };
  }
}
export { updateOrderChange };
