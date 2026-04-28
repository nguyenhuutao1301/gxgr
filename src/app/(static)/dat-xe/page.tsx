"use client";

import React, { useState } from "react";
import { setOrder } from "@/api/order/setOrder";
import { useUser } from "@/context/UserContext";
import SuccessAlert3 from "@/components/Alerts/SuccessAlert3";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

export default function DatXePage() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceType, setServiceType] = useState<
    | "Grap Bike"
    | "Grap Express"
    | "Grap 4 Chỗ"
    | "Grap 7 Chỗ"
    | "Grap 16 Chỗ"
    | "Grap 29 Chỗ"
    | ""
  >("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const { user } = useUser();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập địa chỉ đón.",
        severity: "error",
      });
      return;
    } else if (!destination) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập địa chỉ đến.",
        severity: "error",
      });
      return;
    } else if (!phoneNumber) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập số điện thoại.",
        severity: "error",
      });
      return;
    } else if (!serviceType) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn loại dịch vụ.",
        severity: "error",
      });
      return;
    } else if (!pickupTime) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn thời gian đón.",
        severity: "error",
      });
      return;
    }

    try {
      const bookingData = {
        addressFrom: pickupLocation,
        addressTo: destination,
        phoneNumber,
        serviceType,
        additionalInfo: notes,
        pickupTime: new Date(pickupTime).toISOString(), // Convert to ISO string for consistency
      };

      const userId = user?._id ?? "";
      const info = user ? { ...bookingData, userId } : bookingData;

      const res = await setOrder(info);

      if (res && res.success) {
        setSnackbar({
          open: true,
          message: "Đặt xe thành công!",
          severity: "success",
        });
        // Optionally clear form or redirect
      } else {
        setSnackbar({
          open: true,
          message: res.error || "Đặt xe thất bại. Vui lòng thử lại.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setSnackbar({
        open: true,
        message: "Vui lòng thử lại. Hoặc Gọi Tổng Đài Hỗ Trợ ",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <ClientMeta
        title="Trang Đặt Grab Online Nhanh Chóng"
        description="đặt xe grab xe máy taxi giao hàng nhanh chóng an toàn đặt xe đón ngay"
        isIndex={true}
        slug="dat-xe"
      />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Đặt Xe Ngay
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pickupLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Điểm đón
              </label>
              <input
                type="text"
                id="pickupLocation"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                Điểm đến
              </label>
              <input
                type="text"
                id="destination"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="serviceType"
                className="block text-sm font-medium text-gray-700"
              >
                Loại Dịch Vụ
              </label>
              <select
                id="serviceType"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={serviceType}
                onChange={(e) =>
                  setServiceType(
                    e.target.value as
                      | "Grap Bike"
                      | "Grap Express"
                      | "Grap 4 Chỗ"
                      | "Grap 7 Chỗ"
                      | "Grap 16 Chỗ"
                      | "Grap 29 Chỗ"
                      | ""
                  )
                }
              >
                <option value="">Chọn dịch vụ</option>
                <option value="Grap Bike">Grab Xe Máy</option>
                <option value="Grap Express">Grab Giao Hàng</option>
                <option value="Grap 4 Chỗ">Taxi Grab 4 chỗ</option>
                <option value="Grap 7 Chỗ">Taxi Grab 7 chỗ</option>
                <option value="Grap 16 Chỗ">Taxi Grab 16 Chỗ</option>
                <option value="Grap 29 Chỗ">Taxi Grab 29 Chỗ</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="pickupTime"
                className="block text-sm font-medium text-gray-700"
              >
                Thời gian đón
              </label>
              <input
                type="datetime-local"
                id="pickupTime"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Ghi chú (tùy chọn)
              </label>
              <textarea
                id="notes"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Xác nhận đặt xe
            </button>
          </form>
        </div>
        {snackbar.open && snackbar.severity === "success" && (
          <SuccessAlert3
            message={snackbar.message}
            onClose={handleCloseSnackbar}
          />
        )}
        {snackbar.open && snackbar.severity === "error" && (
          <div className="fixed top-4 right-4 p-4 rounded-md bg-red-100 text-red-700 shadow-md">
            <p className="flex items-center text-sm font-medium">
              <span className="pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {snackbar.message}
              <button
                onClick={handleCloseSnackbar}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
