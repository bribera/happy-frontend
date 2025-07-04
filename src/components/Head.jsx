import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import ButtonAction from './ButtonAction'
import Link from 'next/link'

const Head = ({className="", navbarVariant = "default"}) => {
  return (
    <div className="relative w-full h-full">
        <div className={`bg-white ${className} h-fit px-10 py-4 shadow-md fixed w-full flex justify-between items-center z-[99]`}>
            {/* logo */}
            <div className="">
                <Image src="/logo.jpg" alt='Centre de culture japonaise' width={50} height={50} className='' />
            </div>
            {/* navbar */}
            <div className="">
                <Navbar variant = {navbarVariant}/>
            </div>
            {/* button */}
            <div className="hidden lg:flex cursor-pointer">
                <Link href="/inscription">
                    <ButtonAction>S'inscrire</ButtonAction>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Head
