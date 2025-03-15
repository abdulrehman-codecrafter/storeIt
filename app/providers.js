"use client"
import FilesContextProvider from "../contexts/filesContext";
import UploadToast from "@/components/UploadToast"
import { Toaster } from 'sonner'

export function Providers({ children }) {
    return (
        <FilesContextProvider>
            <Toaster richColors />

            <UploadToast />
            {children}
        </FilesContextProvider>
    );
}