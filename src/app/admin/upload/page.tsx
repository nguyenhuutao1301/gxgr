"use client";
import React, { useState, ChangeEvent } from "react";
import { Avatar, Box, Button, Container } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useUser } from "@/context/UserContext";
import createImage from "@/api/image/createImage";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ImageUpload: React.FC = () => {
  //user from context
  const { user } = useUser();
  const role = user?.role || "user";
  const BaseApi: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  //state to manage the image file, visibility of the preview, and upload messages
  const [image, setImage] = useState<File | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [uploadMessage, setUploadMessage] = useState<[string, string | null]>([
    "",
    null,
  ]);
  // state to manage snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  //close snackbar function
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  //handle image change function
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setShow(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!image) return;
    const response = await createImage(image);
    if (response && response?.success) {
      setUploadMessage([
        `Lưu ảnh thành công xem ảnh ngay`,
        `${BaseApi}${response.path}`,
      ]);
      setSnackbar({
        open: true,
        message: "Lưu ảnh thành công",
        severity: "success",
      });
      setShow(false);
    } else {
      setSnackbar({
        open: true,
        message: response?.error || "Lưu ảnh thất bại",
        severity: "warning",
      });
    }
  };
  if (!user) {
    return (
      <Container sx={{ mt: 20, mb: 20 }}>
        <MuiAlert severity="warning">
          Bạn cần đăng nhập để truy cập nội dung này.
        </MuiAlert>
      </Container>
    );
  }
  if (role !== "admin") {
    return (
      <Container sx={{ mt: 20, mb: 20 }}>
        <MuiAlert severity="warning">
          Chỉ Admin Mới Có Quyền Truy Cập Trang Này !
        </MuiAlert>
      </Container>
    );
  }
  return (
    <>
      <ClientMeta title="Uploads Ảnh" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Box
          sx={{
            width: "400px",
            height: "400px",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {!show && (
            <Button variant="outlined" component="label">
              <DriveFolderUploadIcon /> Chọn ảnh từ thiết bị
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          )}
          {show && (
            <Avatar
              src={preview}
              alt="Uploaded Image"
              sx={{
                width: 300,
                height: 300,
                borderRadius: "5px",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            margin: "10px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {uploadMessage[0] && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {uploadMessage[0]}
              {uploadMessage[1] && (
                <Box sx={{ marginLeft: "10px", color: "blue" }}>
                  <Link href={uploadMessage[1]}>Tại đây</Link>
                </Box>
              )}
            </Box>
          )}
          <Button variant="contained" onClick={handleUpload}>
            Lưu Ảnh
          </Button>
        </Box>
      </Box>
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

export default ImageUpload;
