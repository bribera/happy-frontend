import React from 'react'

const SecondButton = ({children}) => {
  return (
    <div className=' text-happy  px-6 lg:px-8 py-3 lg:py-4 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg'>
      {children}
    </div>
  )
}

export default SecondButton
