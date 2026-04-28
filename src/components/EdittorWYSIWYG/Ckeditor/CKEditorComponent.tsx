"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Ckeditor.css";

//api
import { getImage } from "../../../api/image/getImage";
import type { Image } from "../../../types/api/image";

interface Props {
  content: string;
  onChange: (data: string) => void;
  placeholder?: string;
  imagesFromDB?: Image[];
}

const BASE_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const CKEditorComponent: React.FC<Props> = ({
  onChange,
  content,
  placeholder = "Nhập nội dung bài viết...",
}) => {
  const editorRef = useRef<any>(null);

  const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [imagesFromDB, setImagesFromDB] = React.useState<Image[]>([]);
  const [loadingImages, setLoadingImages] = React.useState(false);

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [altText, setAltText] = React.useState<string>("");
  const [showAltModal, setShowAltModal] = React.useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  async function getImageDB() {
    try {
      const res = await getImage();
      if (res.success) {
        setImagesFromDB(res.images ?? []);
      }
    } catch (error) {
      console.error("Lỗi tải ảnh từ DB:", error);
      return [];
    } finally {
      setLoadingImages(false);
    }
  }

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) return undefined;
    return {
      placeholder,
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "imageUpload",
        "undo",
        "redo",
      ],
      image: {
        toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Đoạn văn",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Tiêu đề 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Tiêu đề 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Tiêu đề 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Tiêu đề 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Tiêu đề 6",
            class: "ck-heading_heading6",
          },
        ],
      },
    };
  }, [isLayoutReady, placeholder]);

  const insertImageFromDB = (editor: any, src: string, alt = "") => {
    editor.model.change((writer: any) => {
      const imageElement = writer.createElement("imageBlock", { src, alt });
      editor.model.insertContent(imageElement, editor.model.document.selection);
    });
  };

  return (
    <div className="relative w-full border border-gray-300 rounded">
      <div className="flex justify-start">
        <button
          onClick={() => {
            setShowImageModal(true);
            getImageDB();
          }}
          className="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Chèn ảnh
        </button>
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={editorConfig as any}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(_, editor) => onChange((editor as any).getData())}
      />

      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-3">Chọn ảnh từ Database</h3>

            {loadingImages ? (
              <p>Đang tải ảnh...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-auto">
                {imagesFromDB.map((img) => (
                  <img
                    key={img._id}
                    src={`${BASE_API}${img.filePath}`}
                    className="w-full h-24 object-cover rounded cursor-pointer border"
                    onClick={() => {
                      setSelectedImage(`${BASE_API}${img.filePath}`);
                      setShowImageModal(false);
                      setShowAltModal(true);
                    }}
                  />
                ))}
              </div>
            )}

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowImageModal(false)}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showAltModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Nhập mô tả ảnh (alt)</h3>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
              placeholder="Mô tả ảnh"
            />
            <div className="text-right">
              <button
                onClick={() => {
                  if (selectedImage && editorRef.current) {
                    insertImageFromDB(
                      editorRef.current,
                      selectedImage,
                      altText
                    );
                  }
                  setShowAltModal(false);
                  setAltText("");
                  setSelectedImage(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Chèn ảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CKEditorComponent;
