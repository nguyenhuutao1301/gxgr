import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import type { UserState } from "../../../types/User";
import axiosInstance from "../../../untils/axios";
import { Button, TextField } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface PasswordChangeProps {
  open: boolean;
  onClose: () => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ open, onClose }) => {
  const { currentUser }: UserState = useSelector(
    (state: any) => state.auth.login
  );
  const { accessToken, orther } = currentUser || {};
  const { _id } = orther || {};

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePassword = async () => {
    if (newPassword === oldPassword) {
      setSnackbar({
        open: true,
        message: "Mật khẩu mới không được trùng với mật khẩu cũ!",
        severity: "error",
      });
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập đầy đủ thông tin!",
        severity: "error",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Mật khẩu mới không khớp!",
        severity: "error",
      });
      return;
    }
    if (!accessToken) {
      setSnackbar({
        open: true,
        message: "Bạn cần đăng nhập để đổi mật khẩu!",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const token = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
      await axiosInstance.patch(
        `/api/user/change-password/${_id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: token } }
      );
      setSnackbar({
        open: true,
        message: "Đổi mật khẩu thành công!",
        severity: "success",
      });
      onClose();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Đổi mật khẩu thất bại! Kiểm tra lại mật khẩu cũ.",
        severity: "error",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <TextField
            label="Mật khẩu cũ"
            type="password"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Nhập lại mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Đang đổi..." : "Đổi mật khẩu"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PasswordChange;
