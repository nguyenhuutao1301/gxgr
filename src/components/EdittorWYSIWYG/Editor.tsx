// components/TextEditor.tsx
"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectImage from "@/components/SelectImage/SelectImage"; // Import SelectImage component

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ImageSettings {
  alt: string;
  width: string;
  height: string;
  style: string;
}
interface TextEditorProps {
  content: string;
  setContent: (content: string | ((prevContent: string) => string)) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, setContent }) => {
  const BaseApi = process.env.NEXT_PUBLIC_API_URL as string;
  const [isClient, setIsClient] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageSettings, setImageSettings] = useState<ImageSettings>({
    alt: "Image",
    width: "100%",
    height: "auto",
    style: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
    "video",
    "align",
  ];
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowCustomizationModal(true); // Open customization modal after selecting an image
  };

  const insertCustomizedImage = () => {
    const { alt, width, height, style } = imageSettings;
    setContent(
      (prevContent) =>
        `${prevContent}<img src="${BaseApi}${selectedImage}" alt="${alt}" width="${width}" height="${height}" style="${style}" />`
    );
    setShowCustomizationModal(false);
  };

  if (!isClient) return null;

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <ReactQuill
          value={content}
          formats={formats}
          modules={modules}
          onChange={(value) => setContent(value)}
          theme="snow"
        />
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <SelectImage data={handleImageSelect} title="Chèn ảnh" />
        </Box>
      </Box>

      {/* Image Customization Modal */}
      <Modal
        open={showCustomizationModal}
        onClose={() => setShowCustomizationModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setShowCustomizationModal(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
            Tùy chỉnh ảnh
          </Typography>
          <TextField
            label="Alt text"
            value={imageSettings.alt}
            onChange={(e) =>
              setImageSettings({ ...imageSettings, alt: e.target.value })
            }
          />
          <TextField
            label="Width"
            value={imageSettings.width}
            onChange={(e) =>
              setImageSettings({ ...imageSettings, width: e.target.value })
            }
          />
          <TextField
            label="Height"
            value={imageSettings.height}
            onChange={(e) =>
              setImageSettings({ ...imageSettings, height: e.target.value })
            }
          />
          <TextField
            label="Style"
            value={imageSettings.style}
            onChange={(e) =>
              setImageSettings({ ...imageSettings, style: e.target.value })
            }
            placeholder="e.g., border: 1px solid red; margin: 10px;"
          />
          <Button variant="contained" onClick={insertCustomizedImage}>
            Chèn ảnh với tùy chỉnh
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TextEditor;
