"use client";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Billboard } from '@/types/ProjectInterface';
import { useState, useEffect } from 'react';

interface Props {
  images: Billboard[];
  autoplayInterval?: number;
}

const Banner = ({ images, autoplayInterval = 5000 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoplayInterval]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const previousSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full">
      {/* Banner Container */}
      <div className="relative w-full min-h-[200px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={image.imageUrl}
              alt={image.label}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const URL = `${process.env.NEXT_PUBLIC_API}/billboards/65ef27af-3792-4dd6-9473-3a6a363919e7`;
  let images: Billboard[] = [];

  try {
    const response = await fetch(URL);
    images = await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
  }

  return {
    props: { images },
  };
}

export default Banner;
