// components/LogoutButton.tsx
"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useUser } from "../../../context/UserContext";
import { logoutUser } from "../../../api/user/apiLogout";
import { useRouter } from "next/navigation";

export const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const handleLogout = async () => {
    if (user) {
      const res = await logoutUser();
      setUser(null);
      if (res && res?.success) {
        router.push("/");
      }
      return;
    }
    setUser(null);
    return;
  };

  return <Button onClick={handleLogout}>Đăng xuất</Button>;
};
