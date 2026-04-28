// components/FAQSchema.tsx
"use client";
import { FC, useEffect } from "react";

type FAQSchemaProps = {
  content: string;
};

// Hàm dùng regex để trích xuất các câu hỏi FAQ từ tiêu đề h2 chứa dấu "?"
const extractFAQFromContent = (content: string) => {
  const faqData = [];

  // Regex để tìm các tiêu đề h2 có dấu "?" và lấy phần tử kế tiếp làm câu trả lời
  let match;
  // Optimize regex to handle multiple heading levels and whitespace
  const questionRegex =
    /<h[1-6][^>]*>([^<]*\?)\s*<\/h[1-6]>(?:\s*<p[^>]*>([^<]*)<\/p>|\s*<div[^>]*>([^<]*)<\/div>)/g;
  while ((match = questionRegex.exec(content)) !== null) {
    const questionText = match[1].trim();
    const answerText = match[2].trim();

    faqData.push({
      "@type": "Question",
      name: questionText,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerText,
      },
    });
  }
  return faqData;
};

const FAQSchema: FC<FAQSchemaProps> = ({ content }) => {
  const faqData = extractFAQFromContent(content);

  useEffect(() => {
    if (faqData.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData,
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [faqData]);

  return null;
};

export default FAQSchema;
