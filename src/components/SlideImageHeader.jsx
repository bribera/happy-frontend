"use client"
import React, { useState } from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import ButtonAction from './ButtonAction';


const SlideImageHeader = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const fadeProps = {
        duration: 5000,
        transitionDuration: 800,
        infinite: true,
        onChange: (_,newIndex) => setActiveIndex(newIndex),
        prevArrow: (
            <div onClick={() => {
                console.log('Précédent');
                window.scrollTo({top:0, behavior:'smooth'});
            }} className="ml-2 lg:ml-0 lg:!-left-10 p-2 bg-white/90 top-1/2 rounded-full shadow hover:bg-white text-happy cursor-pointer z-10">
                <GrFormPrevious size={20} />
            </div>
        ),
        nextArrow: (
            <div onClick={() => {
                console.log('Suivant');
                window.scrollTo({top:0, behavior:'smooth'});
            }} className="mr-2 lg:mr-0 lg:!-right-10 p-2 bg-white/90 top-1/2 rounded-full shadow hover:bg-white text-happy cursor-pointer z-10">
                <MdOutlineNavigateNext size={20}/>
            </div>
        ),
        indicators: (index) => (
            <div key={index} className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}>

            </div>
        )
    }

    const slideviews =[
        {
            title:"Developper votre linguistique",
            content: "Elargissez vos opportinutés en vous formant, développant votre champs lingustique dans différentes langues telles que l'Anglais, l'Espagnol, le Japonais, le Fon, le Yoruba à parts des courts, des jeux interactifs avec les certificats reconnues par l'Université d'Abomey-Calavi",
            action: "S'inscrire",
            image: "/anglais.jpg",
        },
        {
            title:"Apprenez à élagir vos domaines d'expertises",
            content: "Developpez vos connaissances en gestion de projets  au Centre de Culture Japonaise CCJ avec des experts et an ayant accès à la bibliothèque dans ce domaine",
            action: "S'inscrire",
            image: "/jaune.jpg",
        },
        {
            title:"La Tech, domaine de croissance",
            content: "Le Centre de Culture Japonaise CCJ vous aide à accequérir des notions de bases et avancées approndies dans votre domaine choix: Infographie, Développement web, Sécretariat informatique....",
            action: "S'inscrire",
            image: "/vert.jpg",
        },
    ]

  return (
    <div className='w-full max-w-7xl lg:max-w-[96vw] mx-auto px-4'>
        <Fade {...fadeProps} >
            {
                slideviews.map((slide, index) => (
                    <div key={index} className="h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 py-12 bg-gradient-to-r from-blue-50 to to-blue-100 rounded-xl shadow-xl">
                        {/* Texte */}
                        <div className=" w-full lg:w-[60%] flex flex-col items-center text-center lg:items-start lg:text-left space-x-4 md:space-y-8">
                            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-blue-800'>{slide.title}</h1>
                            <p className="text-[15px] md:text-lg lg:text-xl text-gray-600 leading-[30px] tracking-wide line-clamp-5">{slide.content}</p>
                            <ButtonAction className="mt-4">
                                {slide.action}
                            </ButtonAction>
                        </div>
                        {/* image */}
                        <div className="w-full flex justify-end">
                            <Image src={slide.image} alt={slide.title} width={600} height={400} className='rounded-xl object-cover shadow'/>
                        </div>
                    </div>
                ))
            }
        </Fade>
      
    </div>
  )
}

export default SlideImageHeader
