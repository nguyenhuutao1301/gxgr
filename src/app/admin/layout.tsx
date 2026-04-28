"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import { AdminSidebar } from "@/components/User/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] min-h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-col w-full overflow-hidden">
        {/* AppBar */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <div></div> {/* Để cân phải nếu muốn thêm avatar sau */}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <div className="max-w-screen-xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
