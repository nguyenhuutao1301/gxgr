"use client";

import { useUser } from "@/context/UserContext";
import { getHistoryUserBooking } from "@/api/order/getOrder";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BookingInfo } from "@/types/User";

const statusStyle = (status: string) => {
  switch (status) {
    case "hoàn thành":
      return "bg-green-500 text-white";
    case "đã hủy":
      return "bg-red-500 text-white";
    case "đang xử lí":
      return "bg-blue-500 text-white";
    case "đã đặt":
      return "bg-indigo-500 text-white";
    default:
      return "bg-yellow-500 text-white";
  }
};

export default function HistoryPage() {
  const [bookings, setBookings] = useState<BookingInfo[]>([]);
  const { user } = useUser();
  const id = user?._id || "";

  useEffect(() => {
    document.title = "Lịch Sử Đặt Xe | Grap Việt";

    async function fetchHistory() {
      if (!id) return;
      const res = await getHistoryUserBooking(id);
      if (res.success) {
        setBookings(res.result ?? []);
      } else {
        setBookings([]);
      }
    }

    fetchHistory();
  }, [id]);

  if (!user || !user._id) {
    return (
      <div className="container mx-auto py-32 text-center">
        <p className="text-yellow-700 bg-yellow-100 border border-yellow-300 p-4 rounded">
          Bạn cần đăng nhập để truy cập nội dung này.
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-600 text-lg">Bạn chưa có lịch sử đặt xe nào.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt xe</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow border rounded p-4 space-y-2"
          >
            <p>
              <strong>Địa chỉ đón:</strong> {booking.addressFrom}
            </p>
            <p>
              <strong>Địa chỉ đến:</strong> {booking.addressTo}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Thời gian:</strong>{" "}
              {booking.createdAt
                ? format(new Date(booking.createdAt), "HH:mm dd/MM/yyyy")
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Dịch vụ:</strong> {booking.serviceType}
            </p>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                  booking.status || ""
                )}`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10"></div>
    </div>
  );
}
