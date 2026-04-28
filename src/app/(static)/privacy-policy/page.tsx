import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Metadata } from "next";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chính Sách Bảo Mật | Tổng Đài Xe Grab Liên Tỉnh Giá Rẻ",
    description: "Dịch vụ đặt xe Grab uy tín, giá rẻ, an toàn tại Miền Nam.",
    openGraph: {
      title: "Chính Sách Bảo Mật | Tổng Đài Xe Grab Liên Tỉnh Giá Rẻ",
      description: "Dịch vụ đặt xe Grab uy tín, giá rẻ, an toàn tại Miền Nam.",
      images: [`${BaseUrl}/grab.jpg`],
      url: `${BaseUrl}/privacy-policy`,
      type: "website",
    },
    alternates: {
      canonical: `${BaseUrl}/privacy-policy`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Chính Sách Bảo Mật | Tổng Đài Xe Grab Liên Tỉnh Giá Rẻ",
      description: "Dịch vụ đặt xe Grab uy tín, giá rẻ, an toàn tại Miền Nam.",
      images: [`${BaseUrl}/grab.jpg`],
    },
  };
}

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Chính Sách Bảo Mật
      </Typography>

      <Typography variant="body1" paragraph>
        Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn khi
        sử dụng dịch vụ của chúng tôi. Chính sách này giải thích cách chúng tôi
        thu thập, sử dụng và bảo vệ thông tin của bạn.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          1. Thông Tin Chúng Tôi Thu Thập
        </Typography>
        <Typography variant="body1" paragraph>
          Chúng tôi có thể thu thập các loại thông tin sau:
        </Typography>
        <ul>
          <li>Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ.</li>
          <li>Thông tin vị trí: Khi bạn sử dụng dịch vụ đặt xe.</li>
          <li>
            Thông tin thanh toán: Nếu bạn thực hiện giao dịch qua ứng dụng.
          </li>
          <li>Dữ liệu thiết bị: Loại thiết bị, hệ điều hành, địa chỉ IP.</li>
        </ul>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          2. Cách Chúng Tôi Sử Dụng Thông Tin
        </Typography>
        <Typography variant="body1" paragraph>
          Chúng tôi sử dụng thông tin của bạn để:
        </Typography>
        <ul>
          <li>Cung cấp dịch vụ đặt xe, giao hàng.</li>
          <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng.</li>
          <li>Gửi thông báo quan trọng hoặc ưu đãi.</li>
          <li>Bảo vệ quyền lợi và an toàn của người dùng.</li>
        </ul>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          3. Chia Sẻ Thông Tin
        </Typography>
        <Typography variant="body1" paragraph>
          Chúng tôi cam kết không bán, trao đổi thông tin cá nhân của bạn. Tuy
          nhiên, chúng tôi có thể chia sẻ dữ liệu trong các trường hợp:
        </Typography>
        <ul>
          <li>
            Với đối tác cung cấp dịch vụ (tài xế, nhà cung cấp thanh toán).
          </li>
          <li>Theo yêu cầu của cơ quan pháp luật.</li>
          <li>Trong trường hợp sáp nhập, mua bán doanh nghiệp.</li>
        </ul>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          4. Bảo Mật Thông Tin
        </Typography>
        <Typography variant="body1" paragraph>
          Chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt để bảo vệ thông
          tin cá nhân khỏi truy cập trái phép, mất mát hoặc lạm dụng.
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          5. Quyền Lợi Người Dùng
        </Typography>
        <Typography variant="body1" paragraph>
          Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân
          của mình. Nếu có bất kỳ thắc mắc nào, hãy liên hệ với chúng tôi.
        </Typography>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="body2" color="text.secondary">
          Chính sách bảo mật này có hiệu lực từ ngày [ngày/tháng/năm] và có thể
          được cập nhật theo thời gian.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
