// components/Guards/AuthGuard.tsx
"use client";
import { useAppSelector } from "../../../redux/reduxHook";
import { UserState } from "../../../types/User";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: string; // optional: để kiểm tra quyền cụ thể
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { currentUser }: UserState = useAppSelector(
    (state) => state.auth.login
  );

  const isLoggedIn = !!currentUser;
  const userRole = currentUser?.orther?.role || "user"; // Điều chỉnh tùy cấu trúc user

  if (!isLoggedIn) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Bạn cần đăng nhập để truy cập nội dung này.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/login"
          sx={{ mt: 2 }}
        >
          Đăng nhập
        </Button>
      </Box>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Bạn không có quyền truy cập trang này.
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
