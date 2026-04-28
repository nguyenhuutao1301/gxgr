"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "@/app/globals.css";
function SlickSlider({ children, customSettings = {} }) {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear",
  };
  const settings = { ...defaultSettings, ...customSettings };
  return (
    <Box sx={{ padding: "10px 0" }}>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
}
export default SlickSlider;
