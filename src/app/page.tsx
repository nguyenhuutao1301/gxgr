// app/blogs/[slug]/Home.tsx
import { Metadata } from "next";
import Image from "next/image";
//mui
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
//components
import TrackUserLocation from "@/components/TrackLocation";
import Footer from "@/components/Footer";
import ServiceList from "@/components/ServicesList";
import GetReviewBlogsWithTags from "@/components/Blogs/GetBlogs/GetReviewWithTag";
import Header from "@/components/Header/Header";
import SlickSlider from "@/components/SlickSlider";
import CallPrompt from "@/components/CallPrompt";

import {
  imageMainContent,
  featureData,
  howToBook,
  services,
  driver,
} from "@/app/data"; // Import data

import { ImageData, Feature, Service, Driver, HowToBook } from "@/types/Home"; // Import types
import Link from "next/link";
import ActionButton from "@/components/ActionButton";
import LabelBottomNavigation from "@/components/BottomNavigation";
import { siteConfig } from "@/config/site.config";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.split(","),
    alternates: {
      canonical: siteConfig.domain,
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.domain}/grab.jpg`],
      url: siteConfig.domain,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.domain}/grab.jpg`],
    },
  };
}
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TaxiService",
            name: siteConfig.title,
            image: `${siteConfig.domain}/grab.jpg`,
            telephone: siteConfig.contactInfo.phone,
            areaServed: "Miền Nam, Việt Nam",
            url: siteConfig.domain,
            description: siteConfig.description,
          }),
        }}
      />
      <Header />
      <main>
        <Container sx={{ padding: { xs: "0 8px" } }}>
          <ServiceList />
        </Container>

        <Container>
          <SlickSlider>
            {imageMainContent.map((img: ImageData, index: number) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 300, md: 550, xl: 700 }, // responsive height
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(max-width: 600px) 100vw, 1200px"
                  priority={index === 0}
                />
              </Box>
            ))}
          </SlickSlider>
        </Container>

        {/* Introduction Section */}
        <Container
          sx={{
            paddingTop: { xs: "5px", md: "10px" },
            paddingBottom: "20px",
            marginTop: { xs: "5px", md: "10px" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" color="error" gutterBottom>
                Tổng đài Đặt Xe Uy Tín #1 Việt Nam
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
                gutterBottom
              >
                Grab Miền Nam
              </Typography>
              <Typography variant="body1" gutterBottom>
                Là một trong những đơn vị cung cấp dịch vụ Đặt Xe chất lượng, uy
                tín và giá rẻ nhất tại Miền Nam. Chúng tôi tự tin mang đến cho
                bạn chuyến đi an toàn và thoải mái nhất!
              </Typography>
              <Typography variant="body1">
                Ngoài ra, chúng tôi còn cung cấp đa dạng các dịch vụ thuê xe.
                Nhằm đáp ứng tối đa nhu cầu di chuyển của quý khách hàng tại
                khắp Các Tỉnh Thành. Dịch vụ đặt xe đi tỉnh, đặt xe hẹn giờ, bao
                xe trọn gói,đi chợ,giao hàng,theo dõi,đặt xe 2 chiều,du lịch....
              </Typography>
            </Grid>

            {/* Logo and Hotline Section */}
            <Grid
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
              item
              xs={12}
              md={4}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 2,
                  height: "100%",
                }}
              >
                <Image
                  src={`${siteConfig.domain}/grab.jpg`}
                  alt="Số điện thoại đặt xe grab"
                  width={200}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: "#32CD32" }}
                >
                  HOTLINE: 0336 488 240
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Feature Section */}
        <Container
          sx={{
            paddingTop: { xs: "5px", md: "10px" },
            paddingBottom: "20px",
            marginTop: { xs: "5px", md: "10px" },
          }}
        >
          <Grid container spacing={2}>
            {featureData.map((feature: Feature, index: number) => (
              <Grid key={index} sx={{ flex: "1 0 auto" }} item xs={12} md={3}>
                <Box
                  sx={{
                    background: "#5a5afb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "5px 10px 0",
                    color: "#fff",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: "10px" }}
                      gutterBottom
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* How to Book Section */}
        <Container
          sx={{
            paddingTop: { xs: "5px", md: "10px" },
            paddingBottom: "20px",
            marginTop: { xs: "5px", md: "10px" },
          }}
        >
          <Grid container spacing={2}>
            <Grid
              sx={{ position: "relative", height: "450px" }}
              item
              xs={12}
              md={6}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "yellow",
                      width: "300px",
                      height: "300px",
                      borderRadius: "999px",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "250px",
                      height: "450px",
                      borderRadius: "20px",
                      zIndex: "1",
                      border: "4px solid #ededed",
                      overflow: "auto",
                    }}
                  >
                    <Image
                      src={`${siteConfig.domain}/phone2.jpg`}
                      alt="đặt xe grab qua điện thoại"
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: "2.2rem",
                  fontWeight: "500",
                  paddingBottom: "30px",
                }}
                variant="h2"
              >
                Đặt Xe Trực Tuyến Như Thế Nào?
              </Typography>
              <SlickSlider>
                {howToBook.map((data: HowToBook, index: number) => (
                  <Box key={index}>
                    <Typography
                      variant="h3"
                      sx={{ fontSize: "2rem", fontWeight: "400" }}
                      gutterBottom
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ paddingBottom: "20px" }}
                      gutterBottom
                    >
                      {data.desc}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {data.GreetingMessage}
                    </Typography>
                  </Box>
                ))}
              </SlickSlider>
            </Grid>
          </Grid>
        </Container>

        {/* Services Section */}
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              gutterBottom
            >
              Dịch Vụ Đặt Xe Grab
            </Typography>
          </Box>

          {/* Main Content */}
          <Box>
            <Grid container spacing={1}>
              {services.map((service: Service, index: number) => (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 180, sm: 200, md: 200 },
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Button variant="contained">{service.title}</Button>
                    <Typography
                      sx={{ fontSize: "1.8rem" }}
                      variant="body1"
                      gutterBottom
                    >
                      {service.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* Statistics Section */}
        <Box
          sx={{
            background: "#1976d2",
            padding: "20px 0",
            margin: "20px 0",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={6} md={4} lg={3}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "2rem" }}
                  component="span"
                >
                  10+
                </Typography>
                <Typography variant="body1">NĂM KINH NGHIỆM</Typography>
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "2rem" }}
                  component="span"
                >
                  110,509 +
                </Typography>
                <Typography variant="body1">KM DI CHUYỂN</Typography>
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "2rem" }}
                  component="span"
                >
                  879 +
                </Typography>
                <Typography variant="body1">KHÁCH HÀNG</Typography>
              </Grid>
              <Grid item xs={6} md={12} lg={3}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "2rem" }}
                  component="span"
                >
                  98 %
                </Typography>
                <Typography variant="body1">KHÁCH HÀNG HÀI LÒNG</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Featured Drivers Section */}
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant={"h3"}
              sx={{
                fontWeight: "bold",
                backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              gutterBottom
            >
              Vinh Danh Bác Tài Đạt Chuẩn 5 ★
            </Typography>
          </Box>

          <Box sx={{ paddingTop: "10px", paddingBottom: "20px" }}>
            <Grid container spacing={1}>
              {driver.map((data: Driver, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid #ededed",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "999px",
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                        mx: "auto",
                        background: "#fff",
                      }}
                    >
                      <Image
                        src={data.img}
                        alt={data.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Typography
                      sx={{ fontSize: "1.8rem", borderTop: "none" }}
                      variant="h3"
                      gutterBottom
                    >
                      {data.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {`${data.desc} đánh giá 5★`}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              gutterBottom
            >
              Bài Viết Gần Nhất
            </Typography>
            <Link href={"/post"}>
              <ReadMoreIcon />
            </Link>
          </Box>
          <GetReviewBlogsWithTags
            tags={siteConfig.keywords.split(",")}
            limit={12}
          />
        </Container>
        <LabelBottomNavigation />
        <ActionButton />
        <TrackUserLocation />
      </main>
      <CallPrompt />
      <Footer />
    </>
  );
}
