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
import { Star, Gift, Truck, ShoppingBasket } from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { BadgeFreeship } from "../Badge/freeship";
import { DiscountComponent } from "../Discount/discount";
import { BadgeFlashSale } from "../Badge/flashsale";
import { discountTypeEnum, PromotionInterface } from "@/types/promotion";
import useCart from "@/hooks/use-cart";

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
        e.stopPropagation();
        window.location.href = `/san-pham/${gift.slug}`;
      }}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}>
      <div className="relative w-full h-full">
        <ImageLoader
          alt={gift.name}
          src={gift.images[0].url}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Gift tooltip */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <Gift className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductInterface;
  promotion?: PromotionInterface;
  isSingleColumn?: boolean;
}

export const ProductCard = ({
  product,
  promotion,
  isSingleColumn = false,
}: ProductCardProps) => {
  const cart = useCart();

  const promotionProduct = product.promotionProducts;
  const showLineThroughPrice = promotion
    ? product.price
    : product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : null;

  const getDiscountedPrice = () => {
    const promotionProductFlashSale = promotionProduct[0];
    if (!promotionProductFlashSale) return product.price;

    if (promotionProductFlashSale.discountType === discountTypeEnum.PERCENT) {
      return product.price * (1 - promotionProductFlashSale.discount / 100);
    }

    return product.price - promotionProductFlashSale.discount;
  };

  const hasPromotion = promotionProduct.length > 0 && promotion;
  const hasGifts = product.giftProducts && product.giftProducts.length > 0;
  const discountedPrice = getDiscountedPrice();

  // Single Column Layout (Mobile-like horizontal layout)
  if (isSingleColumn) {
    return (
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="flex flex-row relative bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-3 hover:border-gray-200">
          {/* Product Image */}
          <div className="relative aspect-square min-w-[160px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Main Product Image */}
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="rounded-sm object-cover"
            />

            <div className="absolute bottom-0 left-0">
              <div className="flex rounded-r-4xl overflow-hidden">
                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 text-white scale-60 -translate-x-5 translate-y-3">
                  <span className="text-xs font-bold italic">XTRA</span>
                  <Badge className="">Freeship*</Badge>
                </div>

                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white scale-60 -translate-x-7/12 translate-y-3 rounded-r-md">
                  <span className="text-xs font-bold italic">EXTRA</span>
                  <Badge className="bg-[#fb2150] py-0 rounded-sm">
                    lên đến 14%*
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="p-6 pt-4 space-y-1 flex flex-col justify-between w-full">
            <div className="top-info space-y-1">
              <div className="flex items-center">
                <span className="inline-flex transform scale-75 origin-left">
                  <Badge className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white">
                    HÀNG VIỆT
                  </Badge>
                </span>
                <h3 className="max-w-[150px] ml-[-12px] font-semibold text-sm text-gray-900 leading-tight overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
              <span className="inline-flex transform scale-90 origin-left">
                <Badge className="bg-[#def6f6] text-[#248f8d]">Freeship</Badge>
              </span>
              <div className="rating flex gap-x-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 text-yellow-400 fill-current`}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-gray-400 text-[11px]">
                    5 | Bán 19.3k trực tuyến
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom-info space-y-1">
              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold text-[#fb2150] tracking-tight">
                      {FormatUtils.formatPriceVND(discountedPrice)}
                    </span>
                    {showLineThroughPrice && (
                      <span className="text-sm text-gray-400 line-through font-semibold">
                        {FormatUtils.formatPriceVND(showLineThroughPrice)}
                      </span>
                    )}
                  </div>

                  <div className="rounded-sm overflow-hidden flex">
                    <button className="px-2 py-1 bg-[#fde6ee]">
                      <ShoppingBasket className="text-[#ec5073]" size={20} />
                    </button>
                    <div className="px-4 bg-[#fe2b54] text-white text-sm font-bold flex items-center">
                      <span>Mua</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {hasGifts && (
              <div className="font-semibold capitalize text-xs">
                🎁 Có Quà tặng
              </div>
            )}
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500 pointer-events-none"></div>
        </div>
      </Link>
    );
  }

  // Grid Layout (Original card design)
  return (
    <Link href={`/san-pham/${product.slug}`} className="block h-full">
      <Card className="group relative h-full overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
        {/* Premium background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Section */}
        <CardHeader className="p-0 relative">
          <div className="relative overflow-hidden rounded-t-lg">
            <div className="relative aspect-square bg-gray-100">
              <ImageLoader
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Flash sale badge */}
              {hasPromotion && (
                <div className="absolute top-0 right-3 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                    🔥 HOT
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-4 flex-1 flex flex-col space-y-3">
          {/* Product Title */}
          <CardTitle className="line-clamp-2 text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight min-h-[2.5rem]">
            {product.name}
          </CardTitle>

          {/* Description - Hidden on mobile */}
          <CardDescription className="hidden sm:block line-clamp-2 text-xs text-gray-600 min-h-[2rem]">
            {product.shortDescription}
          </CardDescription>

          {/* Rating Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
                (4.5)
              </span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full">
                <Truck className="w-3 h-3" />
                <span className="text-xs font-medium hidden sm:inline">
                  Free Ship
                </span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-end justify-between gap-2">
              <span className="text-lg sm:text-xl font-bold text-red-600">
                {FormatUtils.formatPriceVND(discountedPrice)}
              </span>
              {hasPromotion && (
                <BadgeFlashSale
                  promotion={promotion}
                  className="scale-85 sm:scale-100"
                />
              )}
            </div>

            {showLineThroughPrice && (
              <div className="text-sm text-gray-400 line-through">
                {FormatUtils.formatPriceVND(showLineThroughPrice)}
              </div>
            )}
          </div>

          {/* Gift Products Section */}
          {hasGifts && (
            <div className="hidden sm:block bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  Quà tặng kèm
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.giftProducts &&
                  product.giftProducts.slice(0, 3).map((giftContainer: any) => {
                    const gift: ProductInterface = giftContainer.gift;
                    return (
                      <RenderGiftItems
                        key={gift.id}
                        gift={gift}
                        className="aspect-square"
                      />
                    );
                  })}

                {product.giftProducts && product.giftProducts.length > 3 && (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xs font-medium text-gray-600">
                      +{product.giftProducts.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Action Buttons - Hidden on mobile, shown on hover */}
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 gap-2 mt-auto">
            <button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => {}}>
              Mua ngay
            </button>
            <button className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-lg transition-colors duration-200">
              ♡
            </button>
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Subtle corner decoration */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </Link>
  );
};
