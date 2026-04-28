"use client";
import React from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "@/context/UserContext";
import { updateUser } from "@/api/user/apiUpdateUser";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ortherUser } from "../../types/User";
//import Loader from "@/components/Loader"; // Giả sử bạn có một component Loader
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  // state user
  const [fullName, setFullName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  // state edit mode
  const [editMode, setEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //state for Snackbar
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  React.useEffect(() => {
    if (fullName) {
      document.title = `Trang cá nhân ${fullName} | Tổng Đài Xe Grab Liên Tỉnh Giá Rẻ`;
      // Nếu muốn cập nhật meta description:
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `Trang cá nhân của ${fullName} trên Grab Miền Nam`
        );
      }
    }
  }, [fullName]);
  React.useEffect(() => {
    setFullName(user?.fullname || "");
    setFullName(user?.fullname || "");
    setPhone(user?.phone?.toString() || "");
    setAvatarUrl(user?.avatar || "");
    setAddress(user?.address || "");
    setBio(user?.bio || "");
    setEmail(user?.email || "");
  }, [user]);
  if (!user) {
    return (
      <Container sx={{ mt: 20, mb: 20 }}>
        <MuiAlert severity="warning">
          Bạn cần đăng nhập để truy cập nội dung này.
        </MuiAlert>
      </Container>
    );
  }
  const { role, createdAt, updatedAt, _id }: ortherUser = user;
  // Handler for closing snackbar
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
    // Reset success state after closing snackbar
  };

  const handleUpdate = async () => {
    const { ...userData } = {
      fullname: fullName,
      phone,
      avatar: avatarUrl,
      address,
      bio,
      email,
      _id,
      role,
    };
    setLoading(true);
    const res = await updateUser({ user: userData, _id });
    if (res && res.success) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Cập Nhật Thông Tin Thành Công",
        severity: "success",
      });
      setUser(res?.data?.user);
      setEditMode(false);
    } else {
      setLoading(false);
      setSnackbar({
        open: true,
        message: res?.error || "Cập Nhật Thông Tin Fail",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
          >
            <Avatar
              src={avatarUrl || "/grab.jpg"}
              alt={fullName || "User"}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            {!editMode && (
              <IconButton
                aria-label="edit"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => setEditMode(true)}
              >
                <EditIcon />
              </IconButton>
            )}
            {editMode ? (
              <>
                <TextField
                  label="Họ tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h5">
                  {fullName || "Chưa cập nhật tên"}
                </Typography>
                <Typography color="text.secondary">
                  {email || "Chưa cập nhật email"}
                </Typography>
              </>
            )}
          </Box>

          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vai Trò:
                </Typography>
                <Typography variant="body1">
                  {role === "user" ? "Khách Hàng" : "Quản Trị Viên"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Số điện thoại:
                </Typography>
                {editMode ? (
                  <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="body1">
                    {phone || "Chưa cập nhật số điện thoại"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Địa chỉ:
                </Typography>
                {editMode ? (
                  <TextField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="body1">
                    {address || "Chưa cập nhật địa chỉ"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Giới thiệu:
                </Typography>
                {editMode ? (
                  <TextField
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="body1">
                    {bio || "Chưa có thông tin giới thiệu"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Ngày Tạo Tài Khoản:
                </Typography>
                <Typography variant="body1">
                  {createdAt || "Chưa có thông tin"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Ngày Update Thay Đổi Gần Nhất:
                </Typography>
                <Typography variant="body1">
                  {updatedAt || "Chưa có thông tin"}
                </Typography>
              </Grid>
            </Grid>
            {editMode && (
              <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                >
                  Hủy
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
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

export default ProfilePage;
