import React from 'react'

const Annonce = () => {
  return (
    <div className='w-full h-full pt-10 flex space-x-2 items-center '>
      <div className="flex items-center space-x-1 md:space-x-2">
            <div className='w-5 h-0.5 bg-orange mb-2'></div>
            <div className='w-3 h-3 rounded-full bg-orange mb-2'></div>
            <div className='w-5 h-0.5 bg-orange mb-2'></div>
      </div>
      <div className="flex items-center space-x-4">
          <div className="">
              <p className="text-happy text-base md:text-3xl lg:text-5xl font-semibold">Prochaine rentrée : </p>
          </div>
          <div className="">
              <p className='text-base md:text-3xl lg:text-5xl'>29 Juillet 2025</p>
          </div>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2">

          <div className='w-5 h-0.5 bg-orange mb-2'></div>
          <div className='w-3 h-3 rounded-full bg-orange mb-2'></div>
          <div className='w-5 h-0.5 bg-orange mb-2'></div>
    </div>
    </div>
  )
}

export default Annonce
