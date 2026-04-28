import { Breadcrumb } from "@/types/Post";
import React from "react";
import Link from "next/link";

const BreadcrumbsComponent: React.FC<{
  breadcrumbs: Breadcrumb[];
  currentTitle?: string;
}> = ({ breadcrumbs, currentTitle }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-700">
        {/* Home icon (luôn đứng đầu nếu có /) */}
        <li>
          <Link
            href="/"
            className="block transition-colors hover:text-gray-900"
            aria-label="Trang chủ"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        {/* Render các phần breadcrumb sau "/" */}
        {breadcrumbs
          .filter((b) => b.url !== "/" && b.url.trim() !== "")
          .map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <Link
                  href={breadcrumb.url}
                  className="block transition-colors hover:text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
              </li>
            </React.Fragment>
          ))}

        {currentTitle && (
          <>
            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{currentTitle}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default BreadcrumbsComponent;
