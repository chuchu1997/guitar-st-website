/** @format */

"use client";

import { DiscountComponent } from "@/components/ui/Discount/discount";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductWidgets } from "@/components/ui/product/product";
import { SectionHeader } from "@/components/ui/section/section-header";
import { ProductInterface, ProductQuickView } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import { Clock, Guitar, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export const FlashSaleComponentView = () => {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  const flashSaleProducts: ProductQuickView[] = [
    {
      id: 5,
      badge: "Flash Sale",
      name: "Yamaha FG830 Acoustic",
      price: 299,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 324,
    },
    {
      id: 6,
      name: "Epiphone Les Paul Studio",
      price: 449,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 278,
    },
    {
      id: 7,
      name: "Ibanez RG421",
      price: 329,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 145,
    },
    {
      id: 8,
      name: "Seagull S6 Original",
      price: 399,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 198,
    },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    // return `${hours.toString().padStart(2, "0")}:${minutes
    //   .toString()
    //   .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };

  // Flash sale countdown timer
  useEffect(() => {
    console.log("LOG");
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const FlashSaleCountDown = () => {
    const timeObject = formatTime(timeLeft);
    return (
      <div className=" text-sm flex items-center gap-x-1 ">
        <span className="bg-black text-white px-1 rounded-sm">
          {timeObject.hours}
        </span>
        <span className="bg-black text-white px-1 rounded-sm">
          {timeObject.minutes}
        </span>
        <span className="bg-black text-white px-1 rounded-sm">
          {timeObject.secs}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={
            <div className="flex items-center gap-x-2  ">
              <div className="relative h-[30px] w-[110px] sm:w-[130px]">
                <ImageLoader
                  src={"/images/flashsale/flashsale.png"}
                  alt={"flash-sale"}
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                />
              </div>
              <FlashSaleCountDown />
              {/* <div className="text-lg">{formatTime(timeLeft)}</div> */}
            </div>
          }
        />

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {flashSaleProducts.map((product) => (
            <ProductWidgets.renderCardFlashSale {...product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
