"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { api, getStrapiMedia } from "@/app/lib/api";


export default function SlideTemoignage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonial] = useState([])
  const [isTestimonialLoading, setIsTestimonialLoading] = useState(true)

    useEffect(() => {
      const fetchTestimonials = async () => {
        setIsTestimonialLoading(true)
        try {        
          const response = await api("/temoignages?populate=*");
          if (response && response.data) {
            setTestimonial(response.data)
          }
        } catch (error) {
          console.log(error)
        }finally{
          setIsTestimonialLoading(false)
        }
      }
  
      fetchTestimonials()
    },[])

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  

  const getCurrentGroup = () => {
    const group = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      group.push(testimonials[index]);
    }
    return group;
  };

  const currentTestimonials = testimonials.length > 0 ? getCurrentGroup() : [];

  return (
    <section className="min-h-[60vh] bg-amber-50 flex items-center justify-center p-4 my-18">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm">Que disent nos clients et étudiants de nous ?</p>
          <h2 className="text-2xl font-semibold">Témoignages</h2>
        </div>

        {
          isTestimonialLoading ? (
            <div className="h-[40vh] pt-10 flex items-center justify-center bg-gray-50">
              <div className="text-center text-lg font-semibold">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Chargement des témoignages..</p>
              </div>
            </div>
          ) : (
            <div className="">
              {/* Carousel */}
              <div className="relative flex items-center justify-center">
                {/* Prev button */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 -translate-x-4 -translate-y-1/2 top-1/2 z-10
                    bg-amber-400 text-white w-9 h-9 rounded-full
                    flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Slide group */}
                <div className="flex gap-4 overflow-hidden px-4">
                  {currentTestimonials.map((t, i) => (
                    <article
                      key={t.id}
                      className={`bg-white rounded-xl p-6 w-full shadow-lg text-center transition-all duration-700
                        ${
                          i === 1
                            ? "scale-100 opacity-100 z-10"
                            : "scale-90 opacity-50 blur-sm"
                        }`}
                    >
                      <p className="text-4xl text-gray-300 mb-4 leading-none">“</p>
                      <BlocksRenderer
                        content={t?.text}
                        blocks={{                            
                            paragraph: ({ children }) => {
                            return (
                                <p className="text-gray-600 text-sm mb-6">
                                {children}
                                </p>
                            );
                            },
                        }}
                      />
                      <div className="flex items-center justify-center gap-3 mt-4 rounded-full">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={getStrapiMedia(t.image.url)}
                            alt={t.name}
                            width={50}
                            height={50}
                            className="w-full h-full rounded-full object-cover rounded-full border-2 border-amber-400"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-bold text-amber-600">{t.name}</h3>
                          <p className="text-xs text-gray-400">{t.role}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={nextSlide}
                  className="absolute right-0 translate-x-4 -translate-y-1/2 top-1/2 z-10
                    bg-amber-400 text-white w-9 h-9 rounded-full
                    flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentIndex ? "bg-amber-500" : "bg-amber-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )
        }

      </div>
    </section>
  );
}
