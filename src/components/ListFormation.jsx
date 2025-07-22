import Link from 'next/link'
import React from 'react'

const formations = [
    {
        name: "Anglais",
        link: "/cours/anglais",
    },
    {
        name: "Japonais",
        link: "/cours/japonais",
    },
    {
        name: "Espagnol",
        link: "/cours/espagnol",
    },
    {
        name: "Infographie",
        link: "/cours/infographie",
    },
    {
        name: "Gestion de Projet",
        link: "/cours/gestionprojet",
    },
    {
        name: "Sécrétariat informatique",
        link: "/cours/secretariat",
    },
    {
        name: "Comptabilité",
        link: "/comptabilite",
    },
]

const ListFormation = () => {
  return (
    <div className='pt-10 min-h-[65px]'>
        <div className="">
            <p className="text-lg md:text-4xl font-semibold pb-10 text-happySecond underline-offset-6 underline ">Listes des formations:</p>
        </div>
        <div className="overflow-x-auto  whitespace-nowrap custom-scroll">
            <div className="flex space-x-6 pb-6">
                {
                    formations.map((item, index) => (
                        <Link key={index} href={item.link}  className='px-10 md:px-20 py-2 md:py-4 text-center border-2 md:border-4 !border-happy rounded-2xl bg-white hover:bg-happy hover:text-white transition'>
                            <span className="text-base md:text-2xl" >
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {/* <div className="custom-scroll w-full h-4"></div> */}
        </div>
    </div>
  )
}

export default ListFormation
