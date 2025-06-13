/** @format */

import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import Image from "next/image";
import { ImageLoader } from "../image-loader";
import { Badge } from "../badge";
import {
  Eye,
  Gift,
  Heart,
  ShoppingBasket,
  ShoppingCart,
  Star,
} from "lucide-react";
import FlashSaleComponent from "../Flashsale/flashsale";
import { Separator } from "../separator";
import Link from "next/link";

const productTemp = {
  id: 1,
  name: "Fender Player Stratocaster Electric Guitar",
  shortDescription:
    "Classic electric guitar with modern features, perfect for any music style",
  image:
    "https://mekship-develop.s3.ap-southeast-1.amazonaws.com/happyfurniture/ed947ac7-3d18-4228-8eb9-396a33a80d09-messi.jfif",
  price: 15990000,
  originalPrice: 18990000,
  discount: 16,
  rating: 4.8,
  reviewCount: 124,
  brand: "Guitar St.Real",
  giftProducts: [
    {
      id: 1,
      name: "Guitar Pick Set",
      image:
        "https://mekship-develop.s3.ap-southeast-1.amazonaws.com/happyfurniture/ed947ac7-3d18-4228-8eb9-396a33a80d09-messi.jfif",
    },
    {
      id: 2,
      name: "Guitar Strap",
      image:
        "https://mekship-develop.s3.ap-southeast-1.amazonaws.com/happyfurniture/ed947ac7-3d18-4228-8eb9-396a33a80d09-messi.jfif",
    },
    {
      id: 3,
      name: "Guitar Cable",
      image:
        "https://mekship-develop.s3.ap-southeast-1.amazonaws.com/happyfurniture/ed947ac7-3d18-4228-8eb9-396a33a80d09-messi.jfif",
    },
    {
      id: 4,
      name: "Tuner",
      image:
        "https://mekship-develop.s3.ap-southeast-1.amazonaws.com/happyfurniture/ed947ac7-3d18-4228-8eb9-396a33a80d09-messi.jfif",
    },
  ],
};

export const ProductWidgets = {
  cardSkeleton: () => {
    return (
      <div className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-200 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-3 bg-gray-300 rounded flex-1"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
        </div>
      </div>
    );
  },

  productCard: (product: ProductInterface) => {
    return (
      <div>
        {/* PC DISPLAY */}
        <Link
          href={`/san-pham/${product.slug}`}
          className="hidden sm:block group relative  bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-3 hover:border-gray-200">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Main Product Image */}
            <ImageLoader src={product.images[0].url} alt={product.name} fill />
            <div className="absolute top-2 right-2  bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold italic shadow-md">
              <span> Guitar St.Real</span>
            </div>
            <div className="absolute bottom-0 left-0">
              <div className="flex rounded-r-4xl  overflow-hidden rounded-b-lg">
                {/* <div className="bg-[#28d4d4] flex flex-col px-2 text-white">
                <span>XTRA</span>
                <span>Freeship*</span>
              </div> */}
                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 text-white">
                  <span className="text-xs font-bold italic ">XTRA</span>
                  <Badge className=" ">Freeship*</Badge>
                </div>
                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white">
                  <span className="text-xs font-bold italic ">EXTRA</span>
                  <Badge className="bg-[#fb2150] py-0 rounded-sm">
                    lên đến 14%*
                  </Badge>
                </div>
              </div>
            </div>
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                -{product.discount ?? 10}%
              </div>
            )}

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-3 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <button className="bg-white/95 backdrop-blur-md text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl">
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className={`bg-white/95 backdrop-blur-md p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-xl `}>
                  <Heart className={`w-5 h-5 `} />
                </button>
                <button className="bg-black text-white p-3 rounded-full hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-xl">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="p-6 pt-4 space-y-3">
            {/* Brand Badge */}

            {/* <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 text-yellow-400 fill-current`}
              />
            ))}
          </div> */}

            {/* Product Title */}
            <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Short Description */}
            {/* <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            Classic electric guitar with modern features, perfect for any music
            style
          </p> */}

            {/* Rating */}
            {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div> */}

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#fb2150] tracking-tight">
                  {FormatUtils.formatPriceVND(product.price)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {FormatUtils.formatPriceVND(product.price)}
                    </span>
                  )}
              </div>
            </div>

            {/* Flashsale Section */}
            <FlashSaleComponent />

            {/* { STAR} */}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <div className="space-x-2 text-[#797979] text-sm font-semibold">
                <span>5</span>
                <span>|</span>
                <span>Đã bán 90.0k</span>
              </div>
            </div>

            {/* Gifts Section */}

            {productTemp.giftProducts &&
              productTemp.giftProducts.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    {/* <Gift className="w-5 h-5 text-blue-600" /> */}

                    <Badge className="overflow-hidden border-none rounded-sm bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white font-bold text-xs ">
                      Quà tặng
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {productTemp.giftProducts.map((gift) => (
                      <div
                        key={gift.id}
                        className="flex items-center gap-2 bg-white/70 rounded-lg p-2">
                        <img
                          src={gift.image}
                          alt={gift.name}
                          className="w-8 h-8 object-cover rounded-md flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="text-xs text-gray-700 font-medium truncate">
                          {gift.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Add to Cart Button */}
            {/* <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 active:translate-y-0">
            Thêm vào giỏ hàng
          </button> */}
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500 pointer-events-none"></div>
        </Link>

        {/* MOBILE DISPLAY */}
        <div className=" flex flex-row sm:hidden relative bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-3 hover:border-gray-200">
          {/* Product Image */}
          <div className="relative aspect-square min-w-[140px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Main Product Image */}
            <ImageLoader src={product.images[0].url} alt={product.name} fill />

            <div className="absolute bottom-0 left-0 ">
              <div className="flex  rounded-r-4xl  overflow-hidden ">
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
          <div className="p-6 pt-4 space-y-1 flex flex-col justify-between  w-full">
            <div className="top-info space-y-1">
              <div className="flex items-center">
                <span className="inline-flex transform scale-75 origin-left">
                  <Badge className=" bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white">
                    HÀNG VIỆT
                  </Badge>
                </span>
                <h3 className="max-w-[150px] ml-[-12px] font-semibold text-sm text-gray-900 leading-tight overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
              <span className="inline-flex transform scale-90 origin-left">
                <Badge className=" bg-[#def6f6] text-[#248f8d]">Freeship</Badge>
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
                <div className="flex items-center justify-between ">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold text-[#fb2150] tracking-tight">
                      {FormatUtils.formatPriceVND(product.price)}
                    </span>

                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through font-semibold">
                          {FormatUtils.formatPriceVND(product.price)}
                        </span>
                      )}
                  </div>

                  <div className=" rounded-sm overflow-hidden flex ">
                    <button className="px-2 py-1 bg-[#fde6ee]">
                      <Link href={`/danh-muc/san-pham/`}>
                        <ShoppingBasket className="text-[#ec5073]" size={20} />
                      </Link>
                    </button>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="px-4 bg-[#fe2b54] text-white text-sm font-bold flex items-center">
                      <span>Mua</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500 pointer-events-none"></div>
        </div>
      </div>
    );
  },
};
