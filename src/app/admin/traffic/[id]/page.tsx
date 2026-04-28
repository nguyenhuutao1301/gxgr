"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TrafficItem } from "@/types/traffic";
import { getTrafficDataById } from "@/api/admin/traffic";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

export default function TrafficDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<TrafficItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const result = await getTrafficDataById(id);
        setData(result.result ?? null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu traffic:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">⏳ Đang tải dữ liệu...</div>;
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">
        ❌ Không tìm thấy dữ liệu
      </div>
    );
  }

  return (
    <>
      <ClientMeta title={`Chi Tiết Truy Cập | ${data.Ip}`} />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Chi tiết truy cập</h1>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4">
          <div>
            <span className="font-semibold">🆔 Visitor ID:</span>{" "}
            {data.visitorId}
          </div>
          <div>
            <span className="font-semibold">🌐 IP hiện tại:</span> {data.Ip}
          </div>
          <div>
            <span className="font-semibold">📱 Thiết bị:</span> {data.device}
          </div>
          <div>
            <span className="font-semibold">🌍 Trình duyệt:</span>{" "}
            {data.browser}
          </div>
          <div>
            <span className="font-semibold">🔗 Ref:</span> {data.ref}
          </div>
          <div>
            <span className="font-semibold">🧠 Là Bot?:</span>{" "}
            {data.isBot ? "✅ Có" : "❌ Không"}
          </div>
          <div>
            <span className="font-semibold">📢 Là Ads?:</span>{" "}
            {data.isAds ? "✅ Có" : "❌ Không"}
          </div>
          <div>
            <span className="font-semibold">📈 Số lần truy cập:</span>{" "}
            {data.times}
          </div>

          {/* Lịch sử */}
          <div>
            <span className="font-semibold block mb-2">
              🕓 Lịch sử truy cập:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">🌐 IP</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {data.historyIp?.map((ip, index) => (
                    <li key={index}>{ip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">📅 Thời gian</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {data.historyTimestamps?.map((t, index) => (
                    <li key={index}>{new Date(t).toLocaleString("vi-VN")}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">🔗 Ref / Vị trí</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {data.historyRef?.map((ref, index) => (
                    <li key={index}>
                      <div className="truncate max-w-[220px]">{ref}</div>
                      {data.historyLocation?.[index] && (
                        <div className="text-xs text-gray-500 italic">
                          {data.historyLocation[index]}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold">🕗 Cập nhật lúc:</span>{" "}
            {data.updatedAt
              ? new Date(data.updatedAt).toLocaleString("vi-VN")
              : "N/A"}
          </div>
          <div>
            <span className="font-semibold">📅 Tạo lúc:</span>{" "}
            {data.createdAt
              ? new Date(data.createdAt).toLocaleString("vi-VN")
              : "N/A"}
          </div>
        </div>
      </div>
    </>
  );
}
