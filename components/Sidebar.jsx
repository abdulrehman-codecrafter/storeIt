"use client"
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="sidebar">
            <Link href="/">
                <Image
                    src="/assets/icons/logo-full-brand.svg"
                    alt="Logo"
                    width={160}
                    height={50}
                    className="hidden h-auto lg:block"
                />
                <Image
                    src="/assets/icons/logo-brand.svg"
                    alt="Logo"
                    width={52}
                    height={52}
                    className="lg:hidden"
                />


            </Link>

            <nav className="sidebar-nav">
                <ul className="flex flex-1 flex-col gap-6">
                    {
                        navItems.map((item)=>{
                            const isActive = item.url === pathname;
                            return (
                                <Link href={item.url} key={item.url} className="lg:w-full">
                                    <li className={cn("sidebar-nav-item", isActive && "shad-active")}>
                                        <Image
                                        src={item.icon}
                                        width={24}
                                        height={24}
                                        alt={item.name}
                                        className={cn("nav-icon", isActive && "nav-icon-active")}
                                        />
                                        <p className="hidden lg:block">{item.name}</p>

                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </nav>

            <Image
            src="/assets/images/files-2.png"
            alt="Files"
            width={506}
            height={418}
            className="w-full hidden lg:block"
            />

            <div className="sidebar-user-info">
                <Image 
                src="/assets/images/avatar.png"
                alt="Avatar"
                width={44}
                height={44}
                className="sidebar-user-avatar"
                />
                <div className="hidden lg:block">
                    {/* <p className="subtitle-2 capitalize">{fullName}</p> */}
                    {/* <p className="caption">{email}</p> */}
                </div>
            </div>
        </aside>
    );
}
