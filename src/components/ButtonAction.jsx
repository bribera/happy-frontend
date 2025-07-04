import React from 'react'

const ButtonAction = ({children, className=""}) => {
  return (
    <div className={`btn-action cursor-pointer ${className} md:text-[22px]`}>
        {children}
    </div>
  )
}

export default ButtonAction