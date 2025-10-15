"use client";

import { TriangleAlert } from "lucide-react";

export default function NoDataFound({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon */}
      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <TriangleAlert className="w-10 h-10 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
        {description}
      </p>

      {/* Optional action button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
      >
        পৃষ্ঠা রিফ্রেশ করুন
      </button>
    </div>
  );
}
