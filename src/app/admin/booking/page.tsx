"use client";

import { useEffect, useState } from "react";
import { getAllOrder } from "@/api/order/getOrder";
import { updateOrderChange } from "@/api/order/updateOrder";
import Modal from "@/components/Modals/TaiwindCustomModals";
import { deleteOrderById } from "@/api/order/deleteOrder";
import type { Order } from "@/types/orther";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

const serviceTypes = ["Grap Bike", "Grap Express", "Grap 4 Chỗ", "Grap 7 Chỗ", "Grap 16 Chỗ", "Grap 29 Chỗ"];

const statuses = ["đang xử lí", "đã đặt", "hoàn thành", "đã hủy"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    type?: "success" | "error";
  }>({
    show: false,
    title: "",
    message: "",
    type: "success",
  });
  const showModal = (type: "success" | "error", title: string, message: string) => {
    setModal({
      show: true,
      title,
      message,
      type,
    });
  };

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getAllOrder();
      if (!res.success) {
        console.log("error fetch Orther", res.message);
      }
      setOrders(res.result);
      setLoading(false);
    };

    fetchOrders();
  }, []);
  // Xóa đơn hàng
  const deleteOrder = async (id: string) => {
    try {
      const res = await deleteOrderById(id);
      if (res?.success) {
        showModal("success", "Cập nhật thành công", "Thông tin đơn hàng đã được cập nhật.");
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        showModal("error", "Lỗi", "Cập nhật thất bại.");
      }
    } catch (err) {
      console.error("Update error:", err);
      showModal("error", "Lỗi", "Đã có lỗi xảy ra khi cập nhật.");
    }
  };

  // Cập nhật đơn hàng
  const updateOrder = async (id: string, order: Order) => {
    try {
      const res = await updateOrderChange(id, order);
      if (res?.success) {
        showModal("success", "Cập nhật thành công", "Thông tin đơn hàng đã được cập nhật.");
      } else {
        showModal("error", "Lỗi", "Cập nhật thất bại.");
      }
    } catch (err) {
      console.error("Update error:", err);
      showModal("error", "Lỗi", "Đã có lỗi xảy ra khi cập nhật.");
    }
  };

  return (
    <>
      <ClientMeta title="Quản Lí Đơn Hàng" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Từ</th>
                  <th className="p-2 text-left">Đến</th>
                  <th className="p-2">Loại dịch vụ</th>
                  <th className="p-2">Giá</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Người dùng</th>
                  <th className="p-2">Ngày tạo</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{order.addressFrom}</td>
                    <td className="p-2">{order.addressTo}</td>
                    <td className="p-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={order.serviceType}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) => (o._id === order._id ? { ...o, serviceType: e.target.value } : o)),
                          )
                        }
                      >
                        {serviceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-24"
                        value={order.price}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) => (o._id === order._id ? { ...o, price: parseInt(e.target.value) } : o)),
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={order.status}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) => (o._id === order._id ? { ...o, status: e.target.value } : o)),
                          )
                        }
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 text-sm text-gray-600">{order.userId?.username ?? "N/A"}</td>
                    <td className="p-2 text-sm text-gray-500">{new Date(order.createAt).toLocaleString()}</td>
                    <td className="p-2 space-x-2 flex gap-1">
                      <button
                        onClick={() => updateOrder(order._id, order)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center p-4 text-gray-500">
                      Không có đơn hàng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}
