"use client";
import React, { useState } from "react";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ZaloIcon from "@/components/IconCustom/zalo";
import { Box } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { siteConfig } from "@/config/site.config";
type Props = {
  phone?: string;
};
export default function LabelBottomNavigation({
  phone = siteConfig.contactInfo.phone,
}: Props) {
  const [value, setValue] = useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <BottomNavigation
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          href="/"
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component="a"
          href={`https://zalo.me/${phone}`}
          label="Zalo"
          value="zalo"
          icon={<ZaloIcon />}
          target="_blank" // Mở liên kết trong tab mới
          rel="noopener noreferrer"
        />
        <BottomNavigationAction
          component={(props) => <Link {...props} href="/history/order" />}
          label="history"
          value="history"
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          component={Link}
          href="/profile"
          label="Information"
          value="information"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
