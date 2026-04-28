"use client";

import {
  HomeIcon,
  DocumentTextIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  ArrowUpTrayIcon,
  BriefcaseIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { text: "Dashboard", icon: HomeIcon, route: "/admin" },
  { text: "Viết Bài", icon: PencilIcon, route: "/admin/post/create" },
  { text: "Tải ảnh lên", icon: ArrowUpTrayIcon, route: "/admin/upload" },
  { text: "Truy Cập", icon: UserPlusIcon, route: "/admin/traffic" },
  {
    text: "Quản Lí Bài viết",
    icon: DocumentTextIcon,
    route: "/admin/post/view",
  },
  { text: "Người dùng", icon: UsersIcon, route: "/admin/user" },
  {
    text: "tìm kiếm và thay thế",
    icon: WrenchScrewdriverIcon,
    route: "/admin/find-replace",
  },
  { text: "Đơn hàng", icon: BriefcaseIcon, route: "/admin/booking" },
  { text: "Cài đặt", icon: Cog6ToothIcon, route: "/admin/settings" },
];

export function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile & tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed max-h-screen z-40 top-0 left-0 h-full w-64 bg-white border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-bold">ADMIN</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {sidebarItems.map(({ text, icon: Icon, route }) => {
              const isActive = pathname === route;
              return (
                <button
                  key={text}
                  onClick={() => {
                    router.push(route);
                    onClose();
                  }}
                  className={`flex items-center w-full gap-3 rounded-lg px-4 py-2 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {text}
                </button>
              );
            })}
          </nav>

          <div className="border-t px-4 py-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
