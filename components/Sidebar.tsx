"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaRegCircleUser } from "react-icons/fa6";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";


const Sidebar = () => {
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
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-mob.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-mob.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg-w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/miku_recipe_logo.png"
        alt="logo"
        width={506}
        height={428}
        className="w-full"
      />
      <div className="flex items-center p-4 space-x-4 rounded-lg shadow-md mt-6">
        <FaRegCircleUser size={44}/>
        <p className="text-lgtext-gray-800">{userName}</p>
      </div>
      
    </aside>
  );
};

export default Sidebar;
