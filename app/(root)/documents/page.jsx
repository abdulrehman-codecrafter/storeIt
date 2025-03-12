"use client";
import React from "react";
import Card from "@/components/Card";
import { useFilesContext } from "@/contexts/filesContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Documents() {
    
    const {categorizedFiles}=useFilesContext()

    if (!categorizedFiles) {
        return (
            <div className="flex flex-wrap gap-4 px-7">
                {/* Example skeleton layout */}
                {Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="w-64 h-40" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 px-7">
            {categorizedFiles.documents.map((file) => (
                <Card key={file._id} file={file} /> // Pass file data to Card
            ))}
        </div>
    );
}