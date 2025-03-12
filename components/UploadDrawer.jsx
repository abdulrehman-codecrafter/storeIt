"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { FileInput } from "@/components/ui/file-input";
import { useState } from "react";
import { useFilesContext } from "@/contexts/filesContext";

export default function UploadDrawer({ isOpen, setIsOpen,showToast }) {
    const [files, setFiles] = useState([]);
    const { dispatch } = useFilesContext();

    const handleFileUpload = (files) => {
        setFiles(files);
    };

    const uploadToCloudinary = async () => {
        if (!files.length) return;

        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            setIsOpen(false)
            dispatch({ type: "SHOW_TOAST" });
            const response = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            dispatch({ type: "ADD_FILE", payload: data.savedFile });
            console.log(data);
        } catch (err) {
            console.log("error ", err);
        } finally {
            
            dispatch({ type: "HIDE_TOAST" });
        }
    };

    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
                <DrawerContent className="bg-white">
                    <DrawerHeader>
                        <DrawerTitle>
                            <div className="font-bold text-3xl leading-9  text-center">
                                Upload Files
                            </div>
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileInput onChange={handleFileUpload} />
                    </div>
                    <DrawerFooter className="flex flex-col items-center  justify-center   ">
                        <Button
                            disabled={files.length === 0 }
                            onClick={uploadToCloudinary}
                            className="bg-brand  text-white px-21 w-[218px]  cursor-pointer  rounded-xl hover:text-brand hover:bg-white transition-all duration-300 hover:border"
                        >
                            Submit
                        </Button>
                        <DrawerClose>
                            <div
                                variant="outline"
                                className="border px-20 py-1 cursor-pointer  rounded-xl w-fit hover:bg-[#ff000025] hover:text-red-600 transition-all duration-300 "
                            >
                                Cancel
                            </div>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            
        </>
    );
}
