import { ReactNode } from "react";
import "./blog.css";

function AppWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
