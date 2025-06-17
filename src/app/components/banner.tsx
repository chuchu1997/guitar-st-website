/** @format */

"use client";

import { useState, useEffect } from "react";

import { ImageLoader } from "@/components/ui/image-loader";

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      title: "Premium Guitars Collection",
      subtitle: "Discover Your Perfect Sound",
      image:
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=400&fit=crop",
      cta: "Shop Now",
    },
    {
      title: "Professional Drum Sets",
      subtitle: "Beat the Rhythm of Excellence",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      cta: "Explore",
    },
    {
      title: "Complete Music Setup",
      subtitle: "Everything You Need to Create",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      cta: "Get Started",
    },
  ];
  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative h-96 sm:h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
      {bannerSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000  ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}>
          <ImageLoader
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0 ? true : false}
            quality={80}
          />
          {/* <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          /> */}
        </div>
      ))}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {bannerSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {bannerSlides[currentSlide].subtitle}
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
              {bannerSlides[currentSlide].cta}
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-400 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
