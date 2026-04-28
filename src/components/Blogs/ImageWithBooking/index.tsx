"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormBooking from "@/components/FormBooking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

interface ImageWithBookingProps {
  image: string;
  title: string;
}

export default function ImageWithBooking({
  image,
  title,
}: ImageWithBookingProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group w-full aspect-video">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded-lg"
        priority
      />

      {/* Lớp overlay mờ khi hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Nút Đặt xe luôn hiển thị */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
        >
          <DirectionsCarIcon />
          <span>Đặt xe ngay</span>
        </button>
      </div>

      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle className="text-center">Đặt Xe Online</DialogTitle>
        <DialogContent>
          <FormBooking onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
