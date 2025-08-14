"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

const menu = [
  {
    name: "Accueil",
    path: "/",
  },
  {
    name: "Nos Formations",
    path: "/formation",
  },
  {
    name: "A propos",
    path: "/apropos",
  },
  {
    name: "Contact",
    path: "/contact",
  },
]

const Navbar = ({variant}) => {

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   const mobileNav = document.getElementById('mobile-nav');

  //   if (isMenuOpen) {
  //     mobileNav.style.transform = "translateX(0)";
  //   } else {
  //     mobileNav.style.transform = "translateX(-100%)";
  //   }
  // }, [isMenuOpen]);


  return (
    <div className='w-full h-full'>
        <nav className='w-full h-full'>
          <ul className="items-center w-full gap-x-16 hidden lg:flex">
            {variant === "default" && (
              menu.map((item, index) => (
                <li key={index} 
                className='inline-block text-center relative ml-[40px] hover:text-happySecond hover:after:w-full
                after:absolute after:content-[""] after:bg-orange after:h-[3px] after:w-0 after:left-0 after:bottom-[-10px] after:transition
                after:duration-500 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                >
                  <Link href={item.path} className={`${item.path=== pathname ?"text-happy font-medium" : ""} cursor-pointer`}>
                    <span className="text-lg font-light">{item.name}</span>
                  </Link>
                </li>
              ))
            )}
            {variant === "alternative" && (
              menu.map((item, index) => (
                <li key={index} 
                className='inline-block text-center text-white relative ml-[40px] hover:text-happySecond hover:after:w-full
                after:absolute after:content-[""] after:bg-orange after:h-[3px] after:w-0 after:left-0 after:bottom-[-10px] after:transition
                after:duration-500 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                >
                  <Link href={item.path} className={`${item.path=== pathname ?"text-happy font-medium" : ""} cursor-pointer`}>
                    <span className="text-lg font-light">{item.name}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
              {/* <a href="" className="text-lg poppins-light">Nos Formations</a>
              <a href="" className="text-lg poppins-light">A propos</a>
              <a href="" className="text-lg poppins-light">Communauté</a> */}
              {/* <a href="" className="btn-action text-lg rounded poppins-light signup" id="signup1">S'inscrire</a> */}
        </nav>

        {/* <!-- Mobile nav --> */}
        <div className={`lg:hidden flex flex-col h-screen shadow-lg fixed top-0 left-0 bg-white w-5/6 p-5 z-20 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        >
            <div className='flex justify-between items-center'>
              <Link href="/">
                <Image src="/logo.jpg" alt="Centre de Culture Japonaise Logo" width={50} height={50} className="w-auto h-[65px]" />
              </Link>
              <div className="" onClick={toggleMenu}>
                <IoCloseOutline className="text-4xl cursor-pointer text-happy" />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-10">
              {menu.slice(1).map((item, index) => (
                <Link 
                  key={index}
                  href={item.path} 
                  className="text-lg border-b-2 border-gray-600 poppins-light hover:bg-slate-200 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/inscription" 
                className="btn-action text-lg "
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              {/* <Link href="/formation" className="text-lg border-b-2 border-gray-600  poppins-light hover:bg-slate-200 p-3 rounded-lg">Nos Formations</Link>
              <Link href="/apropos" className="text-lg border-b-2 border-gray-600  poppins-light hover:bg-slate-200 p-3 rounded-lg">A propos</Link>
              <Link href="/contact" className="text-lg border-b-2 border-gray-600  poppins-light hover:bg-slate-200 p-3 rounded-lg">Contact</Link>
              <Link href="/inscription" className="btn-action text-lg poppins-light signup">S'inscrire</Link> */}
            </div>
        </div>
        {/* {variant === "default" && (
          <div className="lg:hidden" id="menu-bar" onClick={toggleMenu}>
            <IoMenuOutline className={`text-4xl cursor-pointer text-happy`}/>
          </div>
        )}
        {variant === "alternative" && (
          <div className="lg:hidden" id="menu-bar" onClick={toggleMenu}>
            <IoMenuOutline className={`text-4xl cursor-pointer text-white`}/>
          </div>
        )} */}
        <div className="lg:hidden" id="menu-bar" onClick={toggleMenu}>
          {variant === "default" && (
            <IoMenuOutline className="text-4xl cursor-pointer text-happy" />
          )}
          {variant === "alternative" && (
            <IoMenuOutline className="text-4xl cursor-pointer text-white" />
          )}
        </div>
    </div>
  )
}

export default Navbar
