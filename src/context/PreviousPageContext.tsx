// context/PreviousPageContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface PreviousPageContextProps {
  previousPage: string | null;
  redirectToPreviousPage: () => void;
}

const PreviousPageContext = createContext<PreviousPageContextProps | undefined>(
  undefined
);

export const PreviousPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  // Tự động lưu path mỗi khi pathname thay đổi
  useEffect(() => {
    if (
      pathname !== "/login" && // không lưu khi ở trang login
      pathname !== "/register" && // có thể thêm những route bạn không muốn redirect lại
      typeof window !== "undefined"
    ) {
      localStorage.setItem("previousPage", pathname);
      setPreviousPage(pathname);
    }
  }, [pathname]);

  const redirectToPreviousPage = () => {
    const path = localStorage.getItem("previousPage") || "/";
    window.location.href = path;
    localStorage.removeItem("previousPage");
  };

  return (
    <PreviousPageContext.Provider
      value={{ previousPage, redirectToPreviousPage }}
    >
      {children}
    </PreviousPageContext.Provider>
  );
};

export const usePreviousPage = () => {
  const context = useContext(PreviousPageContext);
  if (!context) {
    throw new Error(
      "usePreviousPage must be used within a PreviousPageProvider"
    );
  }
  return context;
};
