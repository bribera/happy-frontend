import Image from 'next/image'
import React from 'react'
import { MdOutlineNavigateNext } from 'react-icons/md'

const HeaderFormation = () => {
  return (
    <div className='relative w-full h-[60vh]'>
        <div className="absolute w-full h-full ">
            <Image src="/formation.png" alt='salle de formation' width={600} height={400} className='w-full h-full object-cover object-center' />
        </div>
        <div className="inset-0 absolute  bg-blue-950/70 w-full h-full"></div>
        <div className="absolute top-0 px-20 py-16 w-full h-full flex justify-start items-center">
           <div className="flex items-center">
                <div className="relative w-full">                   
                    <h2 className='text-[40px] text-white/55 left-6 -top-4 font-semibold absolute'>Nos Formations</h2>
                    <h2 className='text-[60px] text-white font-semibold'>Nos Formations</h2>
                    <div className="w-[46vw] h-3 bg-orange"></div>
                </div>
                <div className=" flex items-center space-x-0 relative">
                    <MdOutlineNavigateNext  className='text-[120px] text-white/55'/>
                    <MdOutlineNavigateNext className='absolute left-8 text-white text-[120px]'/>
                </div>
           </div>
        </div>
    </div>
  )
}

export default HeaderFormation