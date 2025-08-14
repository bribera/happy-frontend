"use client"
import { usePathname } from 'next/navigation';
import Head from "@/components/Head";
import React from 'react'
import InscriptionForm from './inscription/FormInscription';

const DynamicHead = () => {

 const pathname = usePathname();

  const getHeader = () => {
    if (pathname === '/inscription') {
    return <InscriptionForm />;
  } else if (pathname === "/cours") {
    return null
  } else {
    return <Head/>;
    }
  };

  return<>{getHeader()}</>;
}

export default DynamicHead
