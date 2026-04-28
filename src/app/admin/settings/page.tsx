"use client";

import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

import readSettingApi from "../../../api/settings/readSetting";
import createSettingApi from "../../../api/settings/createSetting";
import updateSetting from "../../../api/settings/updateSetting";
import deleteSetting from "../../../api/settings/deleteSetting";
/* ================= TYPES ================= */

interface Setting {
  _id: string;
  slug: string;
  numberphone: string;
  notificationDiscord: boolean;
}

type ToastType = "success" | "error";

/* ================= TOGGLE ================= */

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-10 h-5 flex items-center rounded-full px-1 transition
      ${checked ? "bg-green-500" : "bg-gray-300"}`}
  >
    <span
      className={`bg-white w-4 h-4 rounded-full shadow transform transition
        ${checked ? "translate-x-5" : ""}`}
    />
  </button>
);

/* ================= PAGE ================= */

export default function SettingPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(false);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentId, setCurrentId] = useState<string | null>(null);

  // form
  const [slug, setSlug] = useState("");
  const [phone, setPhone] = useState("");
  const [allowDiscord, setAllowDiscord] = useState(true);

  // toast
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= LOAD ================= */

  const loadSettings = async () => {
    setLoading(true);
    const res = await readSettingApi();
    if (res.success) {
      setSettings(res.result);
    } else {
      showToast("error", res.message || "Không tải được dữ liệu");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  /* ================= MODAL ================= */

  const openAddModal = () => {
    setMode("add");
    setSlug("");
    setPhone("");

    setAllowDiscord(true);
    setCurrentId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Setting) => {
    setMode("edit");
    setSlug(s.slug);
    setPhone(s.numberphone);
    // 🔁 nghịch đảo logic cho UX
    setAllowDiscord(!s.notificationDiscord);
    setCurrentId(s._id);
    setIsModalOpen(true);
  };

  /* ================= SAVE ================= */

  const phoneRegex = /^0\d{9}$/;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const handleSave = async () => {
    if (!phoneRegex.test(phone)) {
      return showToast("error", "Số điện thoại không hợp lệ");
    }

    setLoading(true);

    const payload = {
      slug,
      numberphone: phone,
      notificationDiscord: !allowDiscord,
    };

    const res = mode === "add" ? await createSettingApi(payload) : await updateSetting(currentId!, payload);

    if (res.success) {
      showToast("success", mode === "add" ? "Đã thêm thành công" : "Cập nhật thành công");
      setIsModalOpen(false);
      loadSettings();
    } else {
      showToast("error", res.message || "Có lỗi xảy ra");
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xoá?")) return;
    const res = await deleteSetting(id);
    if (res.success) {
      showToast("success", "Đã xoá thành công");
      loadSettings();
    } else {
      showToast("error", res.message || "Xoá thất bại");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h1 className="text-xl font-bold mb-4">Cài đặt bài viết & thông báo</h1>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white
            ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {settings.map((s) => (
              <li key={s._id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-medium text-blue-600">{s.slug}</p>
                  <p className="text-sm text-gray-500">{s.numberphone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Toggle
                    checked={!s.notificationDiscord}
                    onChange={async () => {
                      const old = s.notificationDiscord;

                      setSettings((prev) =>
                        prev.map((i) => (i._id === s._id ? { ...i, notificationDiscord: !old } : i)),
                      );

                      const res = await updateSetting(s._id, {
                        notificationDiscord: !old,
                      });

                      if (!res.success) {
                        setSettings((prev) =>
                          prev.map((i) => (i._id === s._id ? { ...i, notificationDiscord: old } : i)),
                        );
                        showToast("error", "Cập nhật thất bại");
                      }
                    }}
                  />

                  <button onClick={() => openEditModal(s)} className="text-yellow-500 hover:text-yellow-600">
                    <PencilIcon className="w-4 h-4" />
                  </button>

                  <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-600">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add button */}
      <button
        onClick={openAddModal}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700
          text-white p-4 rounded-full shadow-lg"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="font-semibold mb-4">{mode === "add" ? "Thêm cài đặt" : "Sửa cài đặt"}</h2>

            <input
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <input
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={allowDiscord} onChange={(e) => setAllowDiscord(e.target.checked)} />
              <span className={`text-sm font-medium ${allowDiscord ? "text-green-600" : "text-red-500"}`}>
                {allowDiscord ? "🟢 Discord đang bật" : "🔴 Discord đang tắt"}
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Đóng
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded
                  disabled:opacity-50"
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
