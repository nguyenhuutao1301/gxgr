"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Container, TextField, Button, Box, Autocomplete } from "@mui/material";

import dynamic from "next/dynamic";
//type
import { CategoryPostType, Post } from "@/types/Post";
//mui
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
//components
import Loader from "@/components/Loading";
import SelecImage from "@/components/SelectImage/SelectImage";
import TagInput from "@/components/Blogs/TagInput/TagInput";
import CustomMeta from "@/components/Client/ClientMetadata/ClientMetadata";

//context import
import { usePosts } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
//api
import { getAllPosts } from "@/api/post/apiGetPosts";
import { createPost } from "@/api/post/apiCreate";
//hook
import { useBreadcrumbs } from "@/hooks/useBreacrumb";
//helpper
import { generateRandomUsernames } from "@/helpers/generateUsernameRandom";
import generateSlug from "@/helpers/generateSlug";
// Import necessary types

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Editor = dynamic(
  () => import("@/components/EdittorWYSIWYG/Ckeditor/CKEditorComponent")
);
// Define types for the component's state and props
const NewPost: React.FC = () => {
  //user from context
  const { user } = useUser();
  const _id = user?._id;
  // Lấy tên người dùng từ thông tin người dùng hiện tại
  const username = user?.fullname || user?.username || "Admin Nguyễn Xuân Tiến";
  const authorLink = user?._id
    ? `/profile/${_id}`
    : `/profile/${user?.username}`;
  const { refreshPosts } = usePosts();
  // state to manage snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    updateBreadcrumb,
    removeBreadcrumb,
  } = useBreadcrumbs([
    { name: "Trang Chủ", url: "/" },
    { name: "Bài Viết", url: "/post" },
  ]);
  const [data, setData] = useState<Post[]>([]); // Sử dụng cho Autocomplete
  const [isLoad, setIsLoad] = useState<boolean>(false);
  // Define state types
  const [title, setTitle] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>(username);
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string>("");
  const [image, setImage] = useState<{ url: string; alt: string }>({
    url: "",
    alt: "",
  });
  const [likesCount, setLikesCount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [authorUrl, setAuthorUrl] = useState<string>(authorLink);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<{ name: string; url: string }>({
    name: "Trang Chủ",
    url: "/",
  });
  const isMounted = React.useRef(true);
  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const res = await getAllPosts();
        // Kiểm tra component còn mounted không trước khi setState
        if (isMounted.current) {
          if (res.success) {
            setData(res.data);
          } else {
            setSnackbar({
              open: true,
              message: res?.error || "Lỗi khi tải danh sách bài viết!",
              severity: "error",
            });
            setData([]);
          }
        }
      } catch (error) {
        if (isMounted.current) {
          setSnackbar({
            open: true,
            message: `Lỗi khi tải dữ liệu: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            severity: "error",
          });
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // fetch data api

  const extractCategories = (posts: Post[]): CategoryPostType[] => {
    const map = new Map<string, CategoryPostType>();
    posts.forEach((post) => {
      if (post.title && post.slug) {
        map.set(post.slug, {
          label: post.title,
          url: post.slug,
        });
      } else {
        map.set("Trang Chủ", {
          label: "Trang Chủ",
          url: "/",
        });
      }
    });
    return Array.from(map.values());
  };

  const categoryOptions = extractCategories(data);

  const BaseURL = process.env.NEXT_PUBLIC_API_URL as string;
  // Handler for image selection
  const handleImage = (data: string): void => {
    setUrlImage(data);
    setImage({
      url: data,
      alt: title,
    });
  };

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
    setSnackbar({
      open: false,
      message: "",
      severity: "success",
    });
  };
  // Submit handler
  const handleSubmit = async (): Promise<void> => {
    if (!image.url) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn ảnh chính cho bài viết",
        severity: "error",
      });
      return;
    }
    if (!category.name.trim() || !category.url.trim()) {
      setCategory({ name: "Trang Chủ", url: "/" });
      return;
    }
    if (breadcrumbs.length === 0) {
      setBreadcrumbs([{ name: "Trang Chủ", url: "/" }]);
      return;
    }
    if (!title.trim() || !content.trim()) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập đầy đủ tiêu đề và nội dung",
        severity: "error",
      });
      return;
    }
    if (!authorName.trim() || !authorUrl.trim()) {
      setAuthorName(username);
      setAuthorUrl(authorLink);
      return;
    }
    const autoLikes = likesCount > 0 ? generateRandomUsernames(likesCount) : [];
    const clean = (text: string) => text.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanTitle = clean(title);
    const cleanDescription = clean(description);
    const cleanAuthorName = clean(authorName);
    const blog = {
      title: cleanTitle,
      description: cleanDescription,
      tags,
      authorName: cleanAuthorName,
      authorUrl,
      slug,
      content,
      image,
      category,
      breadcrumbs,
      likes: autoLikes,
    };
    const res = await createPost(blog);
    setIsLoad(true);

    if (res && res.success) {
      await refreshPosts();
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: "Đăng bài thành công!",
        severity: "success",
      });
      // Reset form
      setTitle("");
      setDescription("");
      setSlug("");
      setContent("");
      setImage({ url: "", alt: "" });
      setUrlImage("");
      setAuthorName(username);
      setAuthorUrl(authorLink);
      setTags([]);
      setCategory({ name: "Trang Chủ", url: "/" });
      setBreadcrumbs([
        { name: "Trang Chủ", url: "/" },
        { name: "Bài Viết", url: "/post" },
      ]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: res?.error || "Đăng bài thất bại!",
        severity: "error",
      });
    }
  };
  if (!user) {
    return (
      <Container sx={{ mt: 20, mb: 20 }}>
        <MuiAlert severity="warning">
          Bạn cần đăng nhập để truy cập trang này.
        </MuiAlert>
      </Container>
    );
  }
  if (!user?.role || user?.role !== "admin") {
    return (
      <Container sx={{ mt: 20, mb: 20 }}>
        <MuiAlert severity="warning">
          Bạn cần có quyền quản trị để truy cập trang này.
        </MuiAlert>
      </Container>
    );
  }
  return (
    <>
      <CustomMeta title={`Tạo bài viết mới: ${title}`} />
      {/* Meta tags for SEO */}
      {isLoad && <Loader />}
      <Container
        sx={{
          padding: "20px 0",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Tiêu đề"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
          fullWidth
        />
        <TextField
          label="Mô tả ngắn"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth
        />
        <Editor content={content} onChange={(val) => setContent(val)} />
        <TextField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          fullWidth
          style={{ margin: "20px 0" }}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <TextField
              label="Tác giả"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full md:w-1/2">
            <TextField
              type="text"
              label="Số lượng likes"
              value={likesCount}
              onChange={(e) => setLikesCount(parseInt(e.target.value) || 0)}
              fullWidth
            />
          </div>
        </div>

        <TagInput tags={tags} setTags={setTags} />
        <SelecImage data={handleImage} title={"Chọn ảnh chính cho bài viết"} />
        {urlImage && (
          <Box>
            <img
              src={`${BaseURL}${urlImage}`}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
              alt={title}
            />
          </Box>
        )}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <Autocomplete
              fullWidth
              disablePortal
              options={extractCategories(data)}
              value={{ label: category.name, url: category.url }}
              onChange={(e, newValue) => {
                if (newValue) {
                  setCategory({
                    name: newValue.label,
                    url: newValue.url || "",
                  });
                } else {
                  setCategory({ name: "", url: "" });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Danh mục" />
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
            <TextField
              label="URL Danh mục"
              value={category.url}
              onChange={(e) =>
                setCategory({ ...category, url: e.target.value })
              }
              fullWidth
            />
          </div>
        </div>
        {breadcrumbs.map((breadcrumb, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <TextField
              label={`Breadcrumb ${index + 1} Tên`}
              value={breadcrumb.name}
              onChange={(e) => updateBreadcrumb(index, "name", e.target.value)}
              fullWidth
            />
            <TextField
              label={`Breadcrumb ${index + 1} URL`}
              value={breadcrumb.url}
              onChange={(e) => updateBreadcrumb(index, "url", e.target.value)}
              fullWidth
            />
            <Button
              color="error"
              variant="outlined"
              onClick={() => removeBreadcrumb(index)}
              sx={{ minWidth: 40, height: 40 }}
            >
              Xóa
            </Button>
          </Box>
        ))}
        <Button onClick={addBreadcrumb} variant="outlined">
          Thêm Breadcrumb
        </Button>
        <Button
          disableRipple
          sx={{ display: "block", marginLeft: "auto", marginTop: 2 }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoad}
        >
          {isLoad ? "Đang đăng..." : "Đăng bài"}
        </Button>
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

export default NewPost;
