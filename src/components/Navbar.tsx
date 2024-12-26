// 'use client';
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
    weight: "400",
    style: ["normal", "italic"],
    subsets: ["latin"]
})

import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

export default function Navbar(props:any) {
  const navItems = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "EARN",
      link: "/earn",
    },
    {
      name: "INVESTMENTS",
      link: "/investments",
    },
    {
      name: "TAXES",
      link: "/taxes",
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} className={`${roboto.className} tracking-widest text-xl`}/>
    </div>
  );
}

