"use client";

import { useEffect } from "react";
interface Props {
  title: string;
  isIndex?: boolean;
  description?: string;
  slug?: string;
}
export default function ClientMeta({
  title,
  isIndex = false,
  description,
  slug,
}: Props) {
  useEffect(() => {
    document.title = title || "Taxi Liên Tỉnh 4 Chỗ & 7 Chỗ";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = isIndex ? "index, follow" : "noindex, nofollow";
    document.head.appendChild(meta);

    let canonicalLink: HTMLLinkElement | null = null;
    if (slug) {
      const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
      const existingCanonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      );
      if (existingCanonical) {
        existingCanonical.href = canonicalUrl;
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        canonicalLink.href = canonicalUrl;
        document.head.appendChild(canonicalLink);
      }
    }

    return () => {
      document.head.removeChild(meta);
      if (canonicalLink) {
        document.head.removeChild(canonicalLink);
      }
    };
  }, [title, isIndex, description, slug]);

  return null;
}
