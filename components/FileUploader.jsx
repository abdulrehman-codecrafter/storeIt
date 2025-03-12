"use client";

import React, { useState } from "react";
import UploadDrawer from "@/components/UploadDrawer";

export default function FileUploader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {isDrawerOpen && (
        <UploadDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      )}
      <div
        onClick={() => setIsDrawerOpen(true)}
        className="flex py-3 px-6 mr-6 bg-[#fa7275] text-white text-center cursor-pointer uppercase items-center rounded-xl select-none gap-3 shadow-[0_4px_6px_-1px_rgba(250,114,117,0.31),_0_2px_4px_-1px_rgba(250,114,117,0.17)] transition-all duration-600 ease border-0"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeWidth="2"
            stroke="currentColor"
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
          ></path>
        </svg>
        <span className="text-xs leading-[1rem] font-bold">UPLOAD</span>
      </div>
    </>
  );
}

