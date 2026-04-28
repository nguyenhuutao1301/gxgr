import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ServiceCard from "../../../components/Orther/SeviceCard";
import { Metadata } from "next";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GRAPVIET Đặt Xe Ôm & Taxi Giá Rẻ | Thông Tin Thêm",
    description:
      "thông tin thêm về dịch vụ , tài xế , khuyến mãi của dịch vụ đặt xe liên tỉnh",
    alternates: {
      canonical: `${BaseUrl}/about`,
    },
    openGraph: {
      title: "GRAPVIET Đặt Xe Ôm & Taxi Giá Rẻ | Thông Tin Thêm",
      description:
        "thông tin thêm về dịch vụ , tài xế , khuyến mãi của dịch vụ đặt xe liên tỉnh",
      images: [`${BaseUrl}/grab.jpg`],
      url: `${BaseUrl}/about`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "GRAPVIET Đặt Xe Ôm & Taxi Giá Rẻ | Thông Tin Thêm",
      description:
        "thông tin thêm về dịch vụ , tài xế , khuyến mãi của dịch vụ đặt xe liên tỉnh",
      images: [`${BaseUrl}/grab.jpg`],
    },
  };
}

const services = [
  {
    title: "Đặt Xe Máy",
    description: "Dịch vụ đặt xe máy tiện lợi, nhanh chóng với chi phí hợp lý.",
    image: "/grab-xe-may.webp",
  },
  {
    title: "Đặt Taxi",
    description: "Gọi taxi 4 chỗ, 7 chỗ mọi lúc mọi nơi với giá cả minh bạch.",
    image: "/grab-taxi.jpg",
  },
  {
    title: "Giao Hàng",
    description: "Dịch vụ giao hàng nhanh chóng, an toàn và tiện lợi.",
    image: "/grab-giao-hang.jpg",
  },
  {
    title: "Đặt Xe Công Nghệ",
    description: "Xe công nghệ hiện đại, tiện lợi và nhiều lựa chọn.",
    image: "/grab.jpg",
  },
  {
    title: "Đặt Xe Hẹn Giờ",
    description: "Lên lịch đặt xe trước để di chuyển đúng giờ.",
    image: "/grab-7-cho.jpg",
  },
];

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Giới Thiệu Dịch Vụ Đặt Xe Online
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Chúng tôi cung cấp các dịch vụ đặt xe đa dạng, từ xe máy, taxi, giao
        hàng đến xe công nghệ và đặt xe hẹn giờ. Với nền tảng hiện đại, bạn có
        thể đặt xe nhanh chóng, giá cả minh bạch và tài xế chuyên nghiệp.
      </Typography>

      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutPage;
