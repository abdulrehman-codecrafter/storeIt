"use client";
import React from "react";
import Card from "@/components/Card";
import { useFilesContext } from "@/contexts/filesContext";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Others() {
    
    const {categorizedFiles}=useFilesContext()

    if (categorizedFiles?.others.length === 0) {
        return (
            <div className="text-black">
                Nothing to show up
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 px-7">
            {categorizedFiles.others.map((file) => (
                <BlurFade key={file._id} delay={0.25 + index * 0.05} inView>
                <Card  file={file} /> 
            </BlurFade>
            ))}
        </div>
    );
}