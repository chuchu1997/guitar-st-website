/** @format */

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Billboard } from "@/types/ProjectInterface";
import { useState, useEffect } from "react";
import Link from "next/link";
interface Props {
  images: Billboard[];
  autoplayInterval?: number;
  minHeight: "500px" | "700px" | "850px";
}
const getResponsiveHeight = (minHeight: Props["minHeight"]) => {
  switch (minHeight) {
    case "850px":
      return {
        sm: "300px",
        md: "500px",
        xl: "850px",
      };
    case "700px":
      return {
        sm: "250px",
        md: "400px",
        xl: "700px",
      };
    case "500px":
    default:
      return {
        sm: "200px",
        md: "300px",
        xl: "500px",
      };
  }
};
const Banner = ({ images, autoplayInterval = 5000, minHeight }: Props) => {
  const { sm, md, xl } = getResponsiveHeight(minHeight);
  const heightClass = `
  min-h-[${sm}] h-[${sm}]
  md:min-h-[${md}] md:h-[${md}]
  xl:min-h-[${xl}] xl:h-[${xl}]
`;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoplayInterval, isMounted]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const previousSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full">
      {/* Banner Container */}
      <div
        className={`relative w-full ${heightClass} rounded-lg overflow-hidden`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}>
            <Image
              src={image.imageUrl}
              alt={image.label}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />

            {/* Text & CTA Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-2xl md:text-4xl font-bold italic leading-snug tracking-wide drop-shadow-md">
                {image.label || "Nội dung quảng cáo"}
              </h2>

              {image.linkHref && (
                <Link
                  href={image.linkHref}
                  className="cursor-pointer mt-[20px] bg-white text-black rounded-full py-2 px-6 font-semibold text-sm md:text-base hover:bg-gray-200 transition-colors">
                  Xem thêm
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={previousSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Next slide">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
