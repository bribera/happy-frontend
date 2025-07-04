"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
   {
      id: 1,
      name: "Grace Doe",
      role: "Entrepreneur",
      image: "/femme.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisl velit minima."
    },
    {
      id: 2,
      name: "Beatrice Doe",
      role: "Entrepreneur", 
      image: "/apropos.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisl velit minima."
    },
    {
      id: 3,
      name: "Jean Doe",
      role: "Entrepreneur",
      image: "/femme.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisl velit minima."
    },
    {
      id: 5,
      name: "Sandra Doe",
      role: "Entrepreneur",
      image: "/jaune.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisl velit minima."
    },
    {
      id: 6,
      name: "Romeo Doe",
      role: "Entrepreneur",
      image: "/vert.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisl velit minima."
    }
];

export default function SlideTemoignage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentGroup = () => {
    const group = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      group.push(testimonials[index]);
    }
    return group;
  };

  const currentTestimonials = getCurrentGroup();

  return (
    <section className="min-h-[60vh] bg-amber-50 flex items-center justify-center p-4 my-18">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm">Que disent nos clients et étudiants de nous ?</p>
          <h2 className="text-2xl font-semibold">Témoignages</h2>
        </div>

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
                className={`bg-white rounded-xl p-6 w-80 shadow-lg text-center transition-all duration-700
                  ${
                    i === 1
                      ? "scale-100 opacity-100 z-10"
                      : "scale-90 opacity-50 blur-sm"
                  }`}
              >
                <p className="text-4xl text-gray-300 mb-4 leading-none">“</p>
                <p className="text-gray-600 text-sm mb-6">{t.text}</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
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
    </section>
  );
}
