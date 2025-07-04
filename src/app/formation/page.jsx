import FormationCards from '@/components/formations/FormationCards'
import HeaderFormation from '@/components/formations/HeaderFormation'
import React from 'react'

const page = () => {
  return (
    <div className='bg'>
      <div className="relative z-10 pt-40 px-6 bg-blue-950/80 h-full">
        <HeaderFormation />
        <FormationCards />
      </div>
    </div>
  )
}

export default page
