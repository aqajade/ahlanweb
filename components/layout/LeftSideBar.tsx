"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { link } from "fs";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
function LeftSideBar() {
  const pathname = usePathname();

  return (
    // left-0 biar kekiri, flex biar komponen dalamny flexbox flex-col biar elemen" ny tersusun column
    // bg-blue-2 itu elemen tailwind buatan sendiri di tailwind.config.ts
    // max-lg:hidded selain lg screen size dia udh g sidebar lg
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : ""}`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p> 
      </div>

    </div>
  );
}

export default LeftSideBar;
