"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
//mui
import { Container, TextField, Button, Box, Autocomplete } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
//lib
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
//api
import { getAllPosts } from "@/api/post/apiGetPosts";
import { getPostById } from "@/api/post/apiGetPosts";
import { updatePost } from "@/api/post/apiUpdate";
//context
import { useUser } from "@/context/UserContext";
import { usePosts } from "@/context/PostContext";
import { useBreadcrumbs } from "@/hooks/useBreacrumb";
//help
import { generateRandomUsernames } from "@/helpers/generateUsernameRandom";
//components
import Loader from "@/components/Loading";
import SelecImage from "@/components/SelectImage/SelectImage";
import TagInput from "@/components/Blogs/TagInput/TagInput";
import CustomMeta from "@/components/Client/ClientMetadata/ClientMetadata";

//types
import { CategoryPostType, Post } from "@/types/Post";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Editor = dynamic(
  () => import("@/components/EdittorWYSIWYG/Ckeditor/CKEditorComponent")
);

const EditPost: React.FC = () => {
  const {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    updateBreadcrumb,
  } = useBreadcrumbs();
  //context use
  const { user } = useUser();
  const { refreshPosts } = usePosts();
  //state
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [likesCount, setLikesCount] = useState<number>(0);
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string>("");
  const [image, setImage] = useState<{ url: string; alt: string }>({
    url: "",
    alt: "",
  });
  const [description, setDescription] = useState<string>("");
  const [authorUrl, setAuthorUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<{ name: string; url: string }>({
    name: "Trang Chủ",
    url: "/",
  });

  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const _id = user?._id || "";
  // Lấy tên người dùng từ thông tin người dùng hiện tại
  const username = user?.fullname || user?.username || "Admin Nguyễn Xuân Tiến";
  const authorLink = user?._id
    ? `/profile/${_id}`
    : `/profile/${user?.username}`;

  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<Post[]>([]);

  // Fetch all posts for category autocomplete
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

  // Fetch blog data by ID and set form fields
  useEffect(() => {
    if (!id) {
      setSnackbar({
        open: true,
        message: "Không tìm thấy bài viết!",
        severity: "error",
      });
      return;
    }
    async function fetchBlogData() {
      const response = await getPostById(id);
      if (response && response.success) {
        const blog = response.data;

        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setSlug(blog.slug);
        setAuthorName(blog.authorName);
        setAuthorUrl(blog.authorUrl ?? "");
        setImage(
          blog.image
            ? { url: blog.image.url, alt: blog.image.alt ?? "" }
            : { url: "", alt: "" }
        );
        setUrlImage(blog.image?.url || "");
        setLikesCount(blog.likes.length ?? 50);
        setCategory({
          name: blog.category.name,
          url: blog.category.url,
        });
        setTags(blog.tags || []);
        setBreadcrumbs(blog.breadcrumbs || []);
      } else {
        setSnackbar({
          open: true,
          message: "Không tìm thấy bài viết!",
          severity: "error",
        });
      }
    }
    fetchBlogData();
  }, [id]);

  // Submit handler
  const handleSubmit = async (): Promise<void> => {
    if (!authorName.trim() || !authorUrl.trim()) {
      setAuthorName(username);
      setAuthorUrl(authorLink);
    }
    if (!image.alt) {
      image.alt = title.trim() || "Ảnh chính bài viết";
    }
    if (!image.url) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn ảnh chính cho bài viết",
        severity: "info",
      });
      return;
    }
    if (!category.name.trim() || !category.url.trim()) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn danh mục cho bài viết",
        severity: "info",
      });
      return;
    }
    if (breadcrumbs.length === 0) {
      setBreadcrumbs([{ name: "Home", url: "/" }]);
    }
    if (!title.trim() || !content.trim()) {
      setSnackbar({
        open: true,
        message: "Vui lòng tiêu đề và nội dung cho bài viết",
        severity: "info",
      });
      return;
    }

    const clean = (text: string) => text.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedDescription = clean(description);
    const cleanedTitle = clean(title);
    const cleanedAuthorName = clean(authorName);
    const count =
      Number.isInteger(likesCount) && likesCount > 0 ? likesCount : 0;
    const autoLikes = count ? generateRandomUsernames(count) : [];
    const blog = {
      title: cleanedTitle,
      description: cleanedDescription,
      tags,
      authorName: cleanedAuthorName,
      authorUrl,
      slug,
      content,
      image,
      category,
      breadcrumbs,
      likes: autoLikes,
    };

    // Gọi updateBlog qua redux
    const res = await updatePost(id, blog);
    setIsLoad(true);
    if (res?.success) {
      await refreshPosts();
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: "Cập nhật bài viết thành công!",
        severity: "success",
      });
    } else {
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: res?.error || "Lỗi Khi Cập Nhật Vui Lòng Thử Lại",
        severity: "error",
      });
    }
  };

  // Handler for closing the snackbar
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Function to transform category data for Autocomplete
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
  const BaseURL = process.env.NEXT_PUBLIC_API_URL as string;

  // Handler for image selection
  const handleImage = (data: string): void => {
    setUrlImage(data);
    setImage({
      url: data,
      alt: title,
    });
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
      <CustomMeta title={`Sửa bài viết: ${title}`} />
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
          }}
          fullWidth
        />
        <TextField
          label="Mô tả ngắn"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Editor content={content} onChange={(data) => setContent(data)} />
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

export default EditPost;
