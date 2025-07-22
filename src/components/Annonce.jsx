'use client'
import React, { useEffect, useState } from 'react'
import {api, formatDate} from '@/app/lib/api'
import { Loader2 } from 'lucide-react'

const Annonce = () => {

  const [date, setDate] = useState(null)
  const [isDateLoading, setIsDateLoading] = useState(true)

  useEffect(() =>{
    const fetchDate = async () => {
      setIsDateLoading(true)
       try {
        const response = await api("/demarrage-dates")
        
        if(response && response.data && response.data.length > 0) {
          setDate(response.data[0])
          console.log("data:", response.data[0])
        } else {
          console.log("Error de report de la date reportée")
          setDate(null)
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la date:", error)
        setDate(null)
      } finally {
        setIsDateLoading(false)
      }
    }
    
    fetchDate()
  },[])

  if (isDateLoading) {
    return (
      <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement de la date...</p>
        </div>
      </div>
    );
  }


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
            {date ? (
              // <p className='text-base md:text-3xl lg:text-5xl'>29 Juillet 2025 {date.demarrage}</p>
              <p className='text-base md:text-3xl lg:text-5xl'>{formatDate(date.demarrage)}</p>
            ) : (
              <p className='text-base md:text-3xl lg:text-5xl italic'>Aucune date pour l'instant</p>
            )}
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
