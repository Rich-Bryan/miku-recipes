"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";

import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { UserSignOut } from "@/lib/firebase/auth";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.email || "User"); // Use "User" as a fallback if displayName is not set
      } else {
        setUserName(null); // Handle user logout
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-mob.png"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <FaRegCircleUser size={44} />
              <div className="sm:hidden lg:block">
                <p>{userName}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg-w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname == url && "nav-icon-active"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />
            <Button type="submit" className="sign-out-button" onClick={async () => await UserSignOut()}>
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
                 
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
