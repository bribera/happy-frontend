import React from 'react'

const Agree = () => {
  return (
    <div className='py-1.5 text-[10px] md:text-base md:text-[12px] border border-b-2 border-amber-600 w-full flex flex-col md:flex-row justify-center  items-center mx-auto container'>
        <div className="flex gap-1 items-center flex-col lg:flex-row">
            <p className="font-bold">Enregistré sous le N°</p>
            <p className="text-happySecond">2017/161/DEP-ATL/SG/SAG-ASSOC du 30/08/2017</p>
        </div>
        <span className='px-2.5 font-bold text-md'>||</span>
        <div className="flex gap-1 items-center flex-col lg:flex-row">
            <p className="">Agrée par l'<span className='font-bold text-happyThird'>UAC</span> sous la decision <span className='font-bold'>rectorale</span> </p>
            <p className="">N°002-19/UAC/SG/VR-AA/SEOU du 16 Janvier 2017</p>
        </div>
    </div>
  )
}

export default Agree
