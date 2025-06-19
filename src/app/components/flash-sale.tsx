/** @format */

"use client";

import { PromotionAPI } from "@/api/promotion/promotion.api";
import { DiscountComponent } from "@/components/ui/Discount/discount";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header";
import {
  discountTypeEnum,
  ProductPromotion,
  PromotionInterface,
  PromotionTypeEnum,
} from "@/types/promotion";
import { FormatUtils } from "@/utils/format";
import { useEffect, useState } from "react";

export const FlashSaleComponentView = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [flashSale, setFlashSale] = useState<PromotionInterface>();
  const [promotionProducts, setPromotionProducts] = useState<
    ProductPromotion[]
  >([]);

  // Fetch flash sale
  const fetchFlashSale = async () => {
    const res = await PromotionAPI.getAllPromotionsFromStore({
      limit: 1,
      promotionType: PromotionTypeEnum.FLASHSALE,
    });

    if (res.status === 200 && res.data.length > 0) {
      const promotion = res.data[0] as PromotionInterface;

      setFlashSale(promotion);
      setPromotionProducts(promotion.promotionProducts);

      // Tính số giây còn lại dựa trên endDate
      const now = new Date().getTime();
      const end = new Date(promotion.endDate).getTime();
      const secondsLeft = Math.floor((end - now) / 1000);
      setTimeLeft(secondsLeft > 0 ? secondsLeft : 0);
    }
  };

  useEffect(() => {
    fetchFlashSale();
  }, []);

  // Đếm ngược mỗi giây
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Định dạng thời gian countdown
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };

  const FlashSaleCountDown = () => {
    const timeObject = formatTime(timeLeft);
    return (
      <div className="text-sm flex items-center gap-x-1">
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
    <section className="py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={
            <div className="flex items-center gap-x-2">
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
              {timeLeft > 0 && <FlashSaleCountDown />}
            </div>
          }
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {promotionProducts.map((productPromotion) => (
            <ProductCard
              key={productPromotion.productId}
              product={productPromotion.product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
