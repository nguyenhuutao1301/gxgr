// components/Modal/TaiwindCustomModals/index.tsx
"use client";

import React from "react";

type ModalProps = {
  show: boolean;
  title: string;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Modal({
  show,
  title,
  message,
  type = "success",
  onClose,
}: ModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
        <h2
          className={`text-lg font-bold mb-2 ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
