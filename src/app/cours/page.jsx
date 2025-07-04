import Link from 'next/link'
import React from 'react'
import { GrFormNext } from "react-icons/gr";

    const cours = [
        {
            name : "Anglais",
            path: "/cours/anglais",
        },
        {
            name : "Espagnol",
            path: "/cours/espagnol",
        },
        {
            name : "Japonais",
            path: "/cours/japonais",
        },
        {
            name : "Infographie",
            path: "/cours/anglais",
        },
        {
            name : "Secretariat informatique",
            path: "/cours/anglais",
        },
        {
            name : "Comptabilité",
            path: "/cours/anglais",
        },
        {
            name : "Gestion de projet",
            path: "/cours/anglais",
        },
    ]

const page = () => {
  return (
    <div className='h-full'>
      <nav className='px-4 py-6 h-full'>
        <ul className='w-full h-full flex flex-col px-8  py-4 justify-between bg-sky-600'>
            {
                cours.map((item, id) => (
                    <div className=" bg-amber-100 px-2 py-4 border border-b-5 shadow-md hover:shadow-cyan-950 hover:transition-colors border-b-gray-100 cursor-pointer rounded-2xl" key={id}>
                        <Link href={item.path} className='flex items-center hover:text-happy space-x-1'>
                            <li className=''>{item.name}</li>
                            <span className='text-xl '><GrFormNext /></span>
                        </Link>
                    </div>
                ))
            }
        </ul>
      </nav>
    </div>
  )
}

export default page
