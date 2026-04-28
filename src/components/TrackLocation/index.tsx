"use client";

import { useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/untils/axios";
import { TrackingData } from "@/types/traffic";
import { checkRef } from "@/helpers/checkRef.helppers";

const generateVisitorId = () => `visitor_${crypto.randomUUID()}`;

export default function TrackUserLocation() {
  const { user } = useUser();

  const sendTrackingData = useCallback(async (lat?: number, lon?: number) => {
    try {
      // ✅ Lấy URL trực tiếp trong hàm (đảm bảo chạy client)
      const url = window?.location?.href || "";
      const slugFromUrl = url?.split("/").filter(Boolean) || [];
      const lastSlug =
        slugFromUrl.length > 1
          ? slugFromUrl[slugFromUrl.length - 1]
          : slugFromUrl[0] || null;

      const source = checkRef(url);

      await axiosInstance.post<TrackingData>("/api/traffic/create/tracking", {
        lat,
        lon,
        referrer: source,
        userAgent: navigator.userAgent,
        visitorId: localStorage.getItem("visitor_id"),
        slug: lastSlug,
      });
    } catch (error) {
      console.error("Error sending tracking data:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ tránh lỗi SSR
    if (user?.role === "admin" || user?.role === "supperAdmin") return;

    // ✅ Khởi tạo visitor ID chỉ 1 lần
    if (!localStorage.getItem("visitor_id")) {
      localStorage.setItem("visitor_id", generateVisitorId());
    }

    // ✅ Lấy location và gửi dữ liệu tracking
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => sendTrackingData(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Location access denied:", err);
          sendTrackingData();
        }
      );
    } else {
      sendTrackingData();
    }
  }, [user?.role, sendTrackingData]);

  return null;
}
