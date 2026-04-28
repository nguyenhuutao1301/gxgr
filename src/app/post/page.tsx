"use client";
import React, { useEffect, useState, Suspense } from "react";
//next
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
//type
import { Post } from "@/types/Post";
//mui
import Pagination from "@mui/material/Pagination";
import Snackbar from "@mui/material/Snackbar";
import { Container } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
//api
import { getPostslicePage } from "@/api/post/apiGetPosts";
//components
import TrackUserLocation from "@/components/TrackLocation";
import Loading from "@/components/Loading/Loading";
import Header from "@/components/Header/Header";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
import CustomMetaData from "@/components/Client/ClientMetadata/ClientMetadata";
import Footer from "@/components/Footer";
import ActionButton from "@/components/ActionButton";
import LabelBottomNavigation from "@/components/BottomNavigation";

// Material-UI components for Snackbar and Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const BlogListContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //user from useUser context
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);
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

  const fetchPosts = async (currentPage: number) => {
    const limit = 20;
    const res = await getPostslicePage(currentPage, limit);
    if (res && res.success) {
      if (Array.isArray(res.post)) {
        setPosts(res.post);
        setTotalPages(res.totalPages || 1);
      } else {
        setPosts([]);
        setTotalPages(1);
        console.warn("Invalid post data received");
      }
    }
  };
  useEffect(() => {
    fetchPosts(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/post?${params.toString()}`);
  }, [page]);

  // Modify page change handler
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <CustomMetaData
        title={`Trang ${page} Số Điện Thoại Grab Taxi`}
        isIndex={true}
        description="Danh sách bài viết mới nhất về số điện thoại Grab Taxi, cập nhật thông tin liên hệ và hướng dẫn sử dụng dịch vụ."
        slug={`/post?page=${page}`}
      />
      <Header />
      <main className="bg-white px-1">
        <section className="mt-5 mx-auto px-4">
          <BreadcrumbsComponent
            breadcrumbs={[{ name: "Trang chủ", url: "/" }]}
            currentTitle={`Trang ${page} Blogs Grab`}
          />
        </section>
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">
            Danh sách bài viết mới nhất
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-48 sm:h-56 md:h-60">
                  <Image
                    src={
                      blog?.image?.url
                        ? `${backendUrl}${blog.image.url}`
                        : "/grab.jpg"
                    }
                    alt={blog.title ?? "Grab Đặt Xe Liên Tỉnh"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 flex-grow">
                    {blog.description.length > 100
                      ? blog.description.substring(0, 100) + "..."
                      : blog.description}
                  </p>
                  <div className="mt-4 text-right">
                    <Link href={`/post/${blog.slug}`}>
                      <span className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                        Đọc tiếp
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center space-x-2">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>

          {/* Snackbar MUI (hoặc thay bằng toast Tailwind nếu muốn) */}
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
        </div>
        <ActionButton />
        <LabelBottomNavigation />
      </main>
      <Footer />
    </>
  );
};
const BlogListPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Loading />
        </Container>
      }
    >
      <BlogListContent />
      <TrackUserLocation />
    </Suspense>
  );
};

export default BlogListPage;
