"use client";

import React, { useState } from "react";
import UploadDrawer from "@/components/UploadDrawer";
import { FilePlus2 } from "lucide-react";

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
        <FilePlus2 size={18} />
        <span className="text-xs leading-[1rem] font-bold">UPLOAD</span>
      </div>
    </>
  );
}

