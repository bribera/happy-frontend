"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiLogoTiktok, BiLogoTwitter } from 'react-icons/bi'
import { TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti'
import { TbArrowNarrowRight } from "react-icons/tb";
import ButtonAction from './ButtonAction'

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
  {
    name: "Actualités",
    path: "/actualites",
  },
  // {
  //   name: "Cours",
  //   path: "/cours",
  // },
  // {
  //   name: "Agenda",
  //   path: "/agenda",
  // },
  // {
  //   name: "Calendrier académique",
  //   path: "/calendrier",
  // },
]

const Footer = () => {

  const pathname = usePathname()

  return (
    <div className="flex flex-col relative z-10">
      <div className='w-full h-full py-18 px-8 bg-blue-900 text-white'>
        <div className="lg:grid lg:grid-cols-4 flex flex-wrap gap-4 lg:gap-8 justify-between">
          {/* first */}
          <div className="flex flex-col gap-y-5">
            {/* logo */}
            <div className="">
              <Image src='/logo.jpg' alt='logo sans fond' width={50} height={50} className='w-auto h-auto' priority/>
            </div>
            {/* informations */}
            <div className=" flex flex-col space-y-5 ">
              {/* description */}
              <div className="text-[16px]">
                <p className="roboto-light  leading-[27px] tracking-wide">Abomey-Calavi,Carrefour Bidossesi <br /> imeuble avant le supermarché AZIMA, Benin</p>
              </div>
              {/* button a propos */}
              <Link href='/apropos'>
                <ButtonAction className=' !text-[16px]'>
                  A propos de nous
                </ButtonAction>
              </Link>
            </div>
          </div>
          {/* second */}
          <div className="flex flex-col items-start space-y-5">
            <div className="">
            <h5 className='text-2xl text-white/90'>Liens rapides</h5>
            <div className="w-20 h-0.5 bg-orange mt-2"></div>
            </div>
            <ul className="items-start w-full gap-y-4 flex flex-col text-[16px]">
              {
                menu.map((item, index) => (
                  <li key={index} 
                  className='inline-block text-center relative hover:text-blue-200 hover:after:w-full
                  after:absolute after:content-[""] after:bg-orange after:h-[3px] after:w-0 after:left-0 after:bottom-[-10px] after:transition
                  after:duration-500 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                  >
                    <Link href={item.path} className={`${item.path=== pathname ?"text-happyThird font-medium" : ""} cursor-pointer flex items-center`}>
                      <span className='mr-1'><TbArrowNarrowRight /></span><span className="text-[16px] font-light">{item.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          {/* third */}
          <div className="flex flex-col items-start space-y-5">
            <div className="">
              <h5 className='text-2xl text-white/90'>Suivez-nous</h5>
              <div className="w-20 h-0.5 bg-orange mt-2"></div>
            </div>
            <div className="text-[16px] font-light flex flex-col gap-y-4 ">
              <span className='flex items-center'><TiSocialFacebook className='text-happyThird mr-2 text-[22px]'/>Facebook</span>
              <span className='flex items-center'><TiSocialInstagram className='text-purple-500 mr-2 text-[22px]'/>Instagram</span>
              <span className='flex items-center'><BiLogoTiktok  className='mr-2 text-[22px]'/>Tiktok</span>
              <span className='flex items-center'><BiLogoTwitter className='text-happyThird mr-2 text-[22px]' />Twitter</span>
            </div>
          </div>
          {/* four */}
          <div className="flex flex-col items-start space-y-5">
            <div className="">
              <h5 className='text-2xl text-white/90'>Contactez-nous</h5>
              <div className="w-20 h-0.5 bg-orange mt-2"></div>
            </div>
            {/* informations */}
            <div className=" flex flex-col space-y-1 ">
              {/* contact */}
              <div className="text-[16px]">
                <span className='text-blue-100'> 📞 Phone : </span>
                <span className='roboto-light leading-[27px] tracking-wide'>+229 01 97 65 29 99</span>
              </div>
              {/* email */}
              <div className="text-[16px]">
                <span className='text-blue-100'>✉️  Email : </span>
                <span className='roboto-light leading-[27px] tracking-wide'>ccjbenin@gmail.com</span>
              </div>
              {/* localisation */}
              <div className="text-[16px] flex items-center">
               <span>📍</span> <p className="roboto-light  leading-[27px] tracking-wide">Abomey-Calavi,Carrefour Bidossesi <br /> imeuble avant le supermarché AZIMA, Benin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* copyrigt */}
        <div className="bg-blue-950 py-2 w-full text-center text-white ">
          <p className=" leading-[30px] tracking-[3px] blinker-light opacity-50">Copyright2025, Happy Science. All rights reserved by the center</p>
        </div>
    </div>
  )
}

export default Footer