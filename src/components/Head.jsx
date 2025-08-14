import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import ButtonAction from './ButtonAction'
import Link from 'next/link'
import Agree from './Agree'

const Head = ({className="", navbarVariant = "default"}) => {
  return (
    <div className="fixed z-20 w-full">
        {/* en tete */}
        <div className="w-full bg-white  ">
            <Agree />
        </div>
        <div className=" w-full ">
            <div className={`bg-white ${className} h-fit px-10 py-2 shadow-md w-full flex justify-between items-center`}>
                {/* logo */}
                <div className="">
                    <Link href="/" className='cursor-pointer'>
                        <Image src="/logo.jpg" alt='Centre de culture japonaise' width={50} height={50} className='w-auto h-auto' priority/>
                    </Link>
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
    </div>
  )
}

export default Head
