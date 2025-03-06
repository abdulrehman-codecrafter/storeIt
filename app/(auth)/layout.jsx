import Image from "next/image";
import React from "react";

export default function Layout({children}) {
    return (
        <div className="flex min-h-screen">
            <section className="bg-brand hidden w-1/2  justify-center lg:flex xl:w-2/5">
                <div className="max-h-[800px] max-w-[430px] flex flex-col justify-evenly">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto"
                    />
                    <div className="space-y-5 text-white" >
                        <h1 className="h1">Manage your files the best way</h1>
                        <p className="body-1">Awesome, we've created the perfect place for you to store all your documents.</p>
                    </div>

                    <Image 
                    src="/assets/images/files.png"
                    alt="Illustration"
                    width={342}
                    height={342}
                    className="transition-all hover:rotate-2 hover:scale-105 duration-300"
                    />

                </div>
            </section>

            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-16 lg:hidden">
                    <Image 
                    src="/assets/icons/logo-full-brand.svg"
                    alt="logo"
                    width={224}
                    height={82}
                    className="h-auto w-[200px] lg:w-[250px]"
                    />
                </div>
            {children}
            </section>
        </div>
    );
}
