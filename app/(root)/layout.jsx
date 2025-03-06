import React from "react";
import Header from "@/components/Header";
import MobileNavigatoin from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import FileUploader from "@/components/FileUploader";
export default async function Layout({children}) {
    // const currentUser=await getCurrentUser()
    // if(!currentUser) return redirect("/sign-in")

    return (
        <main className="flex h-screen">
            <div className="">
                <Sidebar />
            </div>
            <section className="flex h-full flex-1 flex-col">
                {/* <FileUploader /> */}
                <Header />
                <div className="main-content">{children}</div>
            </section>
        </main>
    );
}
