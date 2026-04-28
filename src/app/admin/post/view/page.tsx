"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getAllPosts } from "@/api/post/apiGetPosts";
import deletePost from "@/api/post/apiDelete";
import Link from "next/link";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function ViewAllPost() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();
  useEffect(() => {
    document.title = "Quản Lí Bài Viết | Grap Việt";
    const fetchPosts = async () => {
      setLoading(true);
      const res = await getAllPosts();
      if (res?.success) {
        setPosts(res.data);
      } else {
        console.error("Failed to fetch posts:", res?.error);
        setPosts([]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (user?.role !== "admin") {
      return setSnackbar({
        open: true,
        message: "Bạn không có quyền",
        severity: "error",
      });
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    const res = await deletePost(id);
    if (res?.success) {
      setSnackbar({
        open: true,
        message: "Xóa thành công!",
        severity: "success",
      });
      setPosts(posts.filter((p) => p._id !== id));
    } else {
      setSnackbar({
        open: true,
        message: res?.error || "Lỗi xảy ra",
        severity: "error",
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/post/edit/${id}`);
  };

  return (
    <>
      <ClientMeta title="Quản Lí Bài Viết" />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Danh sách bài viết</h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tiêu đề
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Slug
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {post.title}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        <Link href={`/post/${post.slug}`}>
                          <p className="text-blue-600 hover:underline">
                            {post.slug}
                          </p>
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {new Date(post.createdAt).toLocaleString("vi-VN")}
                      </td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(post._id)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-4 text-gray-500 text-sm"
                    >
                      Không có bài viết nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {snackbar.open && (
          <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-sm text-white z-50 ${
              snackbar.severity === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {snackbar.message}
          </div>
        )}
      </div>
    </>
  );
}
