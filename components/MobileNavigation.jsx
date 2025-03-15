"use client";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { UserButton } from "@clerk/nextjs";
// import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="mobile-header">
            <Image
                src="/assets/icons/logo-full-brand.svg"
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
            />
            <div className="flex gap-3">
                <UserButton />

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger>
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="Search"
                            width={30}
                            height={30}
                            className="cursor-pointer"
                        />
                    </SheetTrigger>
                    <SheetContent className="shad-sheet h-screen px-3 bg-white">
                        <SheetTitle>
                            <div className="header-user"></div>
                            <Separator className="mb-4 bg-light-200/20" />
                        </SheetTitle>

                        <nav className="mobile-nav">
                            <ul className="mobile-nav-list">
                                <Image
                                    src="/assets/icons/logo-full-brand.svg"
                                    alt="logo"
                                    width={120}
                                    height={52}
                                    className="h-auto mt-[-25px] mb-[20px]"
                                />
                                {navItems.map(({ url, name, icon }) => (
                                    <Link
                                        key={name}
                                        href={url}
                                        className="lg:w-full"
                                    >
                                        <li
                                            className={cn(
                                                "mobile-nav-item",
                                                pathname === url &&
                                                    "shad-active"
                                            )}
                                        >
                                            <Image
                                                src={icon}
                                                alt={name}
                                                width={24}
                                                height={24}
                                                className={cn(
                                                    "nav-icon",
                                                    pathname === url &&
                                                        "nav-icon-active"
                                                )}
                                            />
                                            <p>{name}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </nav>

                        <Separator className="my-5 bg-light-200/20" />
                        <div className="flex justify-center w-full mb-14">
                            <FileUploader />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default MobileNavigation;
