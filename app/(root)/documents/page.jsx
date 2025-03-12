"use client";
import React from "react";
import Card from "@/components/Card";
import { useFilesContext } from "@/contexts/filesContext";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Documents() {
    const { categorizedFiles } = useFilesContext();

    if (categorizedFiles?.documents.length === 0) {
        return (
            <div className="flex flex-wrap gap-4 px-7">
                <div className="">Nothing to show up</div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 px-7">
            {categorizedFiles.documents.map((file, index) => (
                <BlurFade key={file._id} delay={0.25 + index * 0.05} inView>
                    <Card file={file} />
                </BlurFade>
            ))}
        </div>
    );
}
