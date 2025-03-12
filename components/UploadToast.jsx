"use client";
import { useFilesContext } from "@/contexts/filesContext";
import { FileUp } from "lucide-react";

export default function UploadToast({ fileName = "Your file" }) {
    const { toastVisible } = useFilesContext();

    if (!toastVisible) return null;

    return (
        <div className="fixed bottom-5 right-5 upload-toast w-[270px]">
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border dark:border-emerald-900/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                    <FileUp size={18} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                        {fileName} is uploading{" "}
                    </p>
                    <div className="relative h-[6.5px] w-40 overflow-hidden rounded-full bg-gray-100/80 dark:bg-gray-800/50">
                        <div className="modern-progress-bar absolute inset-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
