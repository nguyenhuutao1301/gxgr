// components/SelectImage.tsx
"use client";
import { useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import deletedImage from "@/api/image/deleteImage";
import createImage from "@/api/image/createImage";
import { getImage } from "@/api/image/getImage";

interface ImageData {
  _id: string;
  filePath: string;
}

interface SelectImageProps {
  data: (imageUrl: string) => void;
  title: string;
}

const SelectImage: React.FC<SelectImageProps> = ({ data, title }) => {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const [images, setImages] = useState<ImageData[]>([]);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await getImage();
      if (!res.images) {
        setMessage({ type: "error", text: "Không thể tải danh sách ảnh" });
        setImages([]);
      } else {
        const filtered: ImageData[] = res.images
          .filter((img: any) => img?._id && img?.filePath)
          .map((img: any) => ({ _id: img._id, filePath: img.filePath }));
        setImages(filtered);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Đã xảy ra lỗi khi tải ảnh" });
    } finally {
      setLoading(false);
      setShowImageModal(true);
    }
  };

  const handleImageClick = (imagePath: string) => {
    data(imagePath);
    setShowImageModal(false);
  };

  const handleDeleteImage = async (
    imageId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
      const res = await deletedImage(imageId);
      if (res.success) {
        setImages((prev) => prev.filter((img) => img._id !== imageId));
        setMessage({ type: "success", text: "Xóa ảnh thành công" });
      } else {
        setMessage({ type: "error", text: "Không thể xóa ảnh" });
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Vui lòng chọn file ảnh" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Kích thước file không được vượt quá 5MB",
      });
      return;
    }

    setUploading(true);
    const res = await createImage(file);
    setUploading(false);

    if (!res.success) {
      setMessage({ type: "error", text: "Không thể upload ảnh" });
      return;
    }

    setMessage({ type: "success", text: "Upload ảnh thành công" });
    loadImages();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box>
      <Button onClick={loadImages} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : title}
      </Button>

      <Modal open={showImageModal} onClose={() => setShowImageModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setShowImageModal(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Chọn ảnh
          </Typography>

          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              startIcon={
                uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
              }
              onClick={handleUploadClick}
              disabled={uploading}
            >
              {uploading ? "Đang upload..." : "Upload ảnh"}
            </Button>
          </Box>

          {message && (
            <Alert
              severity={message.type}
              onClose={() => setMessage(null)}
              sx={{ mb: 2, width: "100%" }}
            >
              {message.text}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
              maxHeight: 400,
              overflow: "auto",
              width: "100%",
            }}
          >
            {images.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Chưa có ảnh nào
              </Typography>
            ) : (
              images.map((img) => (
                <Box
                  key={img._id}
                  sx={{
                    position: "relative",
                    m: 1,
                    "&:hover .delete-button": { opacity: 1 },
                  }}
                >
                  <img
                    src={`${BASE_API}${img.filePath}`}
                    alt={`Image ${img._id}`}
                    onClick={() => handleImageClick(img.filePath)}
                    style={{
                      cursor: "pointer",
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                  <IconButton
                    className="delete-button"
                    onClick={(e) => handleDeleteImage(img._id, e)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      backgroundColor: "#000",
                      color: "error.main",
                      width: 24,
                      height: 24,
                      opacity: 0,
                      transition: "opacity 0.2s",
                      "&:hover": {
                        backgroundColor: "error.main",
                        color: "white",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SelectImage;
