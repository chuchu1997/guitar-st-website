/** @format */

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import GallerySlider, { GalleryProps } from "./gallery/galler-slider";

const Banner = ({
  images,
  autoplayInterval = 5000,
  minHeight = "lg",
}: GalleryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <GallerySlider
      images={images}
      autoplayInterval={autoplayInterval}
      minHeight={minHeight}
    />
  );
};

export default Banner;
