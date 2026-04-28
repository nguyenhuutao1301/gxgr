"use client";

import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ZaloIcon from "../IconCustom/zalo";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormBooking from "../FormBooking";
import { siteConfig } from "@/config/site.config";

interface Props {
  phone?: string;
}

const ActionButton = ({ phone = siteConfig.contactInfo.phone }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = () => {
    window.location.href = `https://zalo.me/${phone}`; // Gửi tin nhắn
  };
  return (
    <div className="fixed bottom-[70px] md:bottom-10 right-4 flex flex-col gap-6 z-50">
      {/* Nút gọi điện */}
      <div className="group flex items-center justify-end gap-3 transition-transform duration-300 hover:-translate-x-2">
        <div className="relative">
          <span className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible -left-[200px] bg-green-500/90 text-white px-4 py-2 rounded-full transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap">
            Gọi ngay {phone}
          </span>
        </div>
        <a href={`tel:${phone}`}>
          <button className="w-14 h-14 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
            <PhoneIcon />
          </button>
        </a>
      </div>

      {/* Nút Zalo */}
      <div className="group flex items-center justify-end gap-3 transition-transform duration-300 hover:-translate-x-2">
        <div className="relative">
          <span className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible -left-[120px] bg-blue-500/90 text-white px-4 py-2 rounded-full transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap">
            Chat Zalo
          </span>
        </div>
        <button
          onClick={handleMessage}
          className="w-14 h-14 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <ZaloIcon />
        </button>
      </div>

      {/* Nút đặt xe */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleOpen}
          className="relative flex items-center gap-3 bg-orange-500/90 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-orange-600"
        >
          <span className="text-base font-medium whitespace-nowrap">
            Đặt xe ngay
          </span>
          <div className="animate-spin-slow">
            <AssignmentIcon className="text-white w-5 h-5" />
          </div>
        </button>
      </div>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle className="text-center">Đặt Xe Online</DialogTitle>
        <DialogContent>
          <FormBooking onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButton;
