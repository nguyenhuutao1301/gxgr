"use client";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";

export default function Admin() {
  useEffect(() => {
    document.title = "Trang Admin | Grap Việt";
  }, []);
  return (
    <Typography variant="h4" gutterBottom>
      Chào mừng đến trang quản trị!
    </Typography>
  );
}
