"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchPosts } from "../../api/post/apiGetPosts";
import useDebounce from "../../hooks/useDebounce";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PostSearch {
  _id: string;
  title: string;
  slug: string;
}

interface SearchBarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function SearchBar({
  isMobile = false,
  onItemClick,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<PostSearch[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 300);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    async function search() {
      const res = await searchPosts(debouncedSearch);
      if (res?.success) {
        setSearchResults(res.data);
        setSearchOpen(true);
      }
    }
    search();
  }, [debouncedSearch]);

  return (
    <div className={`relative ${isMobile ? "w-full" : "w-64"}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => searchResults.length > 0 && setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          className="px-3 py-2 border rounded w-full focus:outline-none"
        />
        {searchValue ? (
          <XMarkIcon
            onClick={() => setSearchValue("")}
            className="w-5 h-5 absolute top-2 right-2 text-gray-400 cursor-pointer"
          />
        ) : (
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-2 right-2 text-gray-400" />
        )}
      </div>

      {searchOpen && (
        <div className="absolute bg-white shadow w-full max-h-60 overflow-y-auto z-50 rounded mt-1">
          {searchResults.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                router.push(`/post/${item.slug}`);
                setSearchOpen(false);
                setSearchValue("");
                onItemClick?.();
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
