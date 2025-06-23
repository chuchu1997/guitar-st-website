/** @format */

"use client";

import { cn } from "@/lib/utils";
import { ProductInterface } from "@/types/product";
import { ImageLoader } from "../image-loader";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Badge } from "../badge";
import { Star } from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { BadgeFreeship } from "../Badge/freeship";
import { DiscountComponent } from "../Discount/discount";
import { BadgeFlashSale } from "../Badge/flashsale";
import { PromotionInterface } from "@/types/promotion";

export const RenderGiftItems = ({
  gift,
  className,
}: {
  gift: ProductInterface;
  className?: string;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Ngăn click lan ra ngoài
        window.location.href = `/san-pham/${gift.slug}`;
      }}
      className={cn(
        "relative h-[35px] cursor-pointer flex items-center rounded-lg  transition-transform duration-200 hover:scale-[1.03] hover:bg-gray-100",
        className
      )}>
      <ImageLoader
        alt={gift.name}
        src={gift.images[0].url}
        fill
        className="rounded-md"
      />
    </div>
  );
};

interface ProductCardProps {
  product: ProductInterface;
  promotion?: PromotionInterface;
}
export const ProductCard = ({ product, promotion }: ProductCardProps) => {
  const promotionProduct = product.promotionProducts;
  return (
    <div>
      <Link href={`/san-pham/${product.slug}`}>
        <Card
          key={product.id}
          className="relative overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group flex flex-col">
          {/* Gradient overlay for modern effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-black/5 pointer-events-none" />

          <CardHeader className="p-0 mt-[-30px] sm:mt-[-20px] md:mt-[-25px] relative mb-0">
            <div className="relative overflow-hidden">
              <div className="relative h-[150px]  md:h-[200px]  lg:h-[250px] xl:h-[300px]">
                <ImageLoader
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="rounded-md"
                />
                <DiscountComponent
                  discount={-10}
                  className="absolute bottom-0 left-0"
                />
              </div>

              {/* Premium gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Premium corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] sm:border-l-[40px] md:border-l-[50px] border-l-transparent border-t-[30px] sm:border-t-[40px] md:border-t-[50px] border-t-[#f1ebee]" />
            </div>
          </CardHeader>

          <CardContent className="mt-[-20px] space-y-2 p-2 sm:p-1 md:p-2 lg:p-4 relative z-10 flex-1 flex flex-col ">
            <CardTitle className="line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-yellow-600 transition-colors duration-300 ">
              {product.name}
            </CardTitle>

            <div className="hidden sm:block">
              <CardDescription className=" line-clamp-2   mb-2 text-xs sm:text-sm text-gray-600 overflow-hidden">
                {product.shortDescription}
              </CardDescription>
            </div>

            {/* Rating section with better styling */}

            <div className="hidden sm:block">
              <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  {/* ({product.ratingCount} reviews) */}
                </span>
              </div>
            </div>
            {/* {Freeship} */}

            <div className="badge flex items-center gap-x-1">
              <BadgeFreeship />
              {promotionProduct.length > 0 && promotion && (
                <BadgeFlashSale promotion={promotion} />
              )}
            </div>

            <div className="">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold  text-price text-transparent">
                {FormatUtils.formatPriceVND(product.price)}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400  opacity-80 line-through font-medium">
                {product.originalPrice &&
                  product.originalPrice > product.price &&
                  FormatUtils.formatPriceVND(product.originalPrice)}
              </p>
            </div>

            {/* Gift products section with improved styling */}

            {/* Gift products section with improved styling */}
            <div className="hidden sm:block">
              {product.giftProducts && product.giftProducts.length > 0 && (
                <div className="bg-[#f8eaf1]  rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <Badge className="bg-[#f3d1e3] text-price font-bold text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                      Quà tặng
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                    {product.giftProducts.map((giftContainer: any) => {
                      const gift: ProductInterface = giftContainer.gift;
                      return (
                        <div
                          key={gift.id}
                          className="bg-white rounded-md sm:rounded-lg p-1.5 sm:p-2 shadow-sm border border-yellow-100">
                          <RenderGiftItems
                            gift={gift}
                            className="bg-transparent"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          {/* 
            <CardFooter className="p-2  pt-0 relative z-10 mt-auto hidden md:block">
              <Button className="w-full bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 hover:from-yellow-800 hover:via-amber-900 hover:to-yellow-800 text-amber-100 font-semibold py-2 sm:py-2.5 md:py-3 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02] text-xs sm:text-sm md:text-base">
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Thêm vào giỏ hàng</span>
                <span className="sm:hidden">Thêm</span>
              </Button>
            </CardFooter> */}

          {/* Subtle bottom accent */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" /> */}
        </Card>
      </Link>
    </div>
  );
};
