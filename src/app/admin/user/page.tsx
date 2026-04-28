"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getAllUsers } from "@/api/user/apiGetUser"; // Giả sử bạn có sẵn API này
import { deleteUserById } from "@/api/user/deletedUser";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

export default function AdminUserPage() {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
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
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await getAllUsers();
      if (res?.success) {
        setUsers(res.users);
      } else {
        setSnackbar({
          open: true,
          message: res?.err || "Lỗi tải danh sách người dùng",
          severity: "error",
        });
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (user?.role !== "admin") {
      return setSnackbar({
        open: true,
        message: "Bạn không có quyền xoá",
        severity: "error",
      });
    }
    if (!window.confirm("Bạn có chắc chắn muốn xoá người dùng này?")) return;
    const res = await deleteUserById(id);
    if (res?.success) {
      setSnackbar({
        open: true,
        message: "Xoá thành công",
        severity: "success",
      });
      setUsers(users.filter((u) => u._id !== id));
    } else {
      setSnackbar({
        open: true,
        message: res?.err || "Không thể xoá người dùng",
        severity: "error",
      });
    }
  };

  return (
    <>
      <ClientMeta title="Quản Lí Người dùng" />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tên đăng nhập
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Vai trò
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {u.username}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {u.email}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {u.phone}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {u.role}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-gray-500 text-sm"
                    >
                      Không có người dùng nào.
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
