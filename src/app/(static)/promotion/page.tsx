// app/promotion/page.tsx
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khuyến Mãi Đặt Xe | Giảm Giá Taxi Liên Tỉnh",
  description:
    "Nhận ngay ưu đãi 10% cho chuyến đi liên tỉnh, 15% cho chuyến xe 2 chiều trong ngày. Áp dụng cho taxi 4 chỗ & 7 chỗ. Đặt ngay!",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/promotion`,
  },
};

const PromotionPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          🎉 Ưu Đãi Đặc Biệt Khi Đặt Xe Liên Tỉnh!
        </h1>

        <div className="space-y-6">
          <section className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              🚖 Giảm 10% cho chuyến đi liên tỉnh
            </h2>
            <p className="text-gray-700">
              Áp dụng cho mọi khách hàng đặt chuyến xe{" "}
              <strong>liên tỉnh</strong> bằng{" "}
              <span className="font-medium">taxi 4 chỗ hoặc 7 chỗ</span>. Giá
              được giảm trực tiếp khi bạn đặt trước.
            </p>
          </section>

          <section className="bg-green-50 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              🔄 Giảm 15% cho chuyến xe 2 chiều trong ngày
            </h2>
            <p className="text-gray-700">
              Đặt xe 2 chiều trong ngày cho tuyến <strong>liên tỉnh</strong> sẽ
              nhận ngay ưu đãi 15%. Chuyến đi tiết kiệm hơn, thuận tiện hơn.
            </p>
          </section>

          <section className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
              📅 Thời gian áp dụng
            </h2>
            <p className="text-gray-700">
              Từ <strong>19/07/2025</strong> đến khi có thông báo mới. Ưu đãi có
              thể kết thúc sớm nên hãy đặt ngay hôm nay!
            </p>
          </section>

          <div className="text-center mt-8">
            <a
              href="/dat-xe"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-xl transition duration-300"
            >
              🚗 Đặt Xe Ngay
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PromotionPage;
