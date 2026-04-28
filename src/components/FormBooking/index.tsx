"use client";

import React, { useState } from "react";
import { setOrder } from "@/api/order/setOrder";
import { useUser } from "@/context/UserContext";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface FormData {
  addressFrom: string;
  addressTo: string;
  phoneNumber: string;
  serviceType:
    | "Grap Bike"
    | "Grap Express"
    | "Grap 4 Chỗ"
    | "Grap 7 Chỗ"
    | undefined;
  additionalInfo: string;
}

const serviceOptions = [
  { value: "Grap Bike", label: "Grab Xe Máy", icon: "🛵" },
  { value: "Grap Express", label: "Grab Giao Hàng", icon: "📦" },
  { value: "Grap 4 Chỗ", label: "Taxi Grab 4 chỗ", icon: "🚗" },
  { value: "Grap 7 Chỗ", label: "Taxi Grab 7 chỗ", icon: "🚐" },
];

const fieldLabels: Record<keyof FormData, string> = {
  addressFrom: "địa chỉ đón",
  addressTo: "địa chỉ đến",
  phoneNumber: "số điện thoại",
  serviceType: "loại dịch vụ",
  additionalInfo: "thông tin thêm",
};

const FormBooking: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    addressFrom: "",
    addressTo: "",
    phoneNumber: "",
    serviceType: "" as FormData["serviceType"],
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  const { user } = useUser();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const requiredFields: (keyof FormData)[] = [
      "addressFrom",
      "addressTo",
      "phoneNumber",
      "serviceType",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setAlert({
          show: true,
          message: `Vui lòng nhập ${fieldLabels[field]}`,
          type: "error",
        });
        setLoading(false);
        return;
      }
    }

    // Add phone number format validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setAlert({
        show: true,
        message: "Số điện thoại không hợp lệ",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const orderData = user?._id
        ? { ...formData, userId: user._id }
        : formData;

      const res = await setOrder(orderData);

      if (res?.success) {
        setAlert({
          show: true,
          message: "Đặt xe thành công!",
          type: "success",
        });
        setTimeout(onClose, 2000);
      } else {
        throw new Error(res?.error || "Đặt xe thất bại");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setAlert({
        show: true,
        message: "Vui lòng thử lại hoặc gọi tổng đài hỗ trợ",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* From Address */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="addressFrom"
            value={formData.addressFrom}
            onChange={handleChange}
            placeholder="Địa chỉ đón"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-150"
          />
        </div>

        {/* To Address */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="addressTo"
            value={formData.addressTo}
            onChange={handleChange}
            placeholder="Địa chỉ đến"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Service Type */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {serviceOptions.map((service) => (
            <label
              key={service.value}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                formData.serviceType === service.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                name="serviceType"
                value={service.value}
                onChange={handleChange}
                className="hidden"
              />
              <span className="text-2xl mb-2">{service.icon}</span>
              <span className="text-sm text-center font-medium">
                {service.label}
              </span>
            </label>
          ))}
        </div>

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Thông tin thêm (tùy chọn)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 min-h-[100px]"
        />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-150 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đặt xe ngay"
            )}
          </button>
        </div>
      </form>

      {/* Alert */}
      {alert.show && (
        <div
          className={`fixed top-4 right-4 left-4 md:max-w-sm md:left-auto p-4 rounded-lg shadow-lg ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          role="alert"
        >
          <p className="flex items-center gap-2">
            {alert.type === "success" ? "✓" : "⚠"} {alert.message}
          </p>
        </div>
      )}
    </div>
  );
};
export default FormBooking;
