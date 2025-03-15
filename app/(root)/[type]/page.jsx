"use client";
import React, { use, useEffect, useState } from "react";
import Card from "@/components/Card";
import { useFilesContext } from "@/contexts/filesContext";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Documents({ params }) {
    const unwrappedParams = use(params); 
    const type = unwrappedParams.type; 
        
    const { categorizedFiles } = useFilesContext();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const filteredFile = categorizedFiles[type];
        setFiles(filteredFile);
    }, [type, categorizedFiles]);

    return (
        <>
            {files ? (
                <div className="flex flex-wrap gap-4 px-7">
                    {files.map((file, index) => (
                        <BlurFade
                            key={file._id}
                            delay={0.25 + index * 0.05}
                            inView
                        >
                            <Card file={file} />
                        </BlurFade>
                    ))}
                </div>): <p>No Files Found</p>
            }
        </>
    );
}
