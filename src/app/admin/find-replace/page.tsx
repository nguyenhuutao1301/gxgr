"use client";

import { useState } from "react";
import axiosInstance from "@/untils/axios";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

const AVAILABLE_FIELDS = [
  { id: "title", label: "Tiêu đề" },
  { id: "description", label: "Mô tả" },
  { id: "content", label: "Nội dung" },
  { id: "authorName", label: "Tên tác giả" },
];

export default function FindAndReplace() {
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((f) => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axiosInstance.put("/api/replace/post/all", {
        find,
        replace,
        fields: selectedFields,
      });

      setResult(response.data);
      setPreview(response.data.preview || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ClientMeta title="Tìm và Thay Thế | Admin" isIndex={false} />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Tìm và Thay Thế Nội Dung</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tìm kiếm</label>
              <input
                type="text"
                value={find}
                onChange={(e) => setFind(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Thay thế bằng
              </label>
              <input
                type="text"
                value={replace}
                onChange={(e) => setReplace(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Field checkboxes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Chọn trường cần thay thế
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_FIELDS.map((field) => (
                <label key={field.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field.id)}
                    onChange={() => handleFieldToggle(field.id)}
                    className="rounded"
                  />
                  <span>{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !find || !replace || !selectedFields.length}
            className={`w-full py-2 px-4 rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium`}
          >
            {loading ? "Đang xử lý..." : "Thay thế"}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              Đã cập nhật {result.modifiedCount} bài viết
            </div>

            {/* Preview changes */}
            {preview.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-3">
                  Xem trước thay đổi:
                </h2>
                <div className="space-y-4">
                  {preview.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded-md">
                      {Object.entries(item.changes).map(
                        ([field, values]: [string, any]) => (
                          <div key={field} className="mb-2">
                            <p className="font-medium">
                              {
                                AVAILABLE_FIELDS.find((f) => f.id === field)
                                  ?.label
                              }
                              :
                            </p>
                            <div className="text-sm">
                              <p className="text-red-600">- {values.before}</p>
                              <p className="text-green-600">+ {values.after}</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
