"use client"
import FilesContextProvider from "../contexts/filesContext";
import UploadToast from "@/components/UploadToast"
export function Providers({ children }) {

  return (
    <FilesContextProvider>
        <UploadToast />
        {children}
    </FilesContextProvider>
  );
}