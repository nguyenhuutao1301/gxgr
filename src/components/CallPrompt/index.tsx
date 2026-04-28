"use client";

import { siteConfig } from "@/config/site.config";
import { useEffect, useRef, useState } from "react";
interface Prop {
  phone?: string;
}
export default function CallPrompt({ phone }: Prop) {
  const [show, setShow] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const defaultPhone = siteConfig.contactInfo.phone;
  const phoneNumber = phone || defaultPhone;
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div
        ref={boxRef}
        className="bg-white rounded-xl shadow-lg p-4 w-max animate-fade-in"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Bạn cần đặt xe?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Chúng tôi sẵn sàng phục vụ bạn 24/7 – Gọi ngay để đặt chuyến xe nhanh
          chóng!
        </p>
        <div className="flex items-center justify-end gap-3 lg:gap-6">
          <a
            href={`tel:${phoneNumber}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            📞 Gọi ngay
          </a>
          <button
            onClick={() => setShow(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  );
}
