// components/ActionBtn.tsx
import { siteConfig } from "@/config/site.config";
import React from "react";

interface ButtonProps {
  phone?: string;
}

interface ActionBtnProps {
  slug: string;
  Button: React.ComponentType<ButtonProps>;
  defaultPhone?: string;
}

const phoneMap: Record<string, string> = {
  "grab-hai-phong": "0876347453",
  "grab-thanh-hoa": "0876347453",
  "grab-ha-noi": "0876347453",
  "grab-dak-lak": "0876347453",
  "bac-lieu/grab-bac-lieu": "0344977977",
};

export const ActionBtn: React.FC<ActionBtnProps> = ({ slug, Button, defaultPhone = siteConfig.contactInfo.phone }) => {
  const phone = phoneMap[slug] ?? defaultPhone;

  return <Button phone={phone} />;
};
