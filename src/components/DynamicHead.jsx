"use client"
import { usePathname } from 'next/navigation';
import Head from "@/components/Head";
import Inscription from "@/components/Inscription";
import React from 'react'

const DynamicHead = () => {
    // function getHeader(pathname) {
//   if (pathname === '/inscription') {
//     return <Inscription />;
//   } else if (pathname === '/about') {
//     return <HeaderAbout />;
//   } else {
//     return null;
//   }
    // }

 const pathname = usePathname();

  const getHeader = () => {
    if (pathname === '/inscription') {
    return <Inscription />;
  } else if (pathname === "/cours") {
    return null
  } else {
    return <Head/>;
    }
  };

  return<>{getHeader()}</>;
}

export default DynamicHead
