/** @format */

import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import Image from "next/image";
import { ImageLoader } from "../image-loader";
import { Badge } from "../badge";

export const ProductWidgets = {
  cardSkeleton: () => {
    return (
      <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="aspect-square bg-gray-200 relative overflow-hidden"></div>
        <div className="p-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  },

  productCard: (product: ProductInterface) => {
    return (
      <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/10 hover:-translate-y-2 hover:border-gray-200">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {product.images && (
            <ImageLoader
              src={product.images[0].url}
              alt={product.name || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Badge for sale/new items */}
          {/* {product.isNew && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Mới
            </div>
          )} */}
          {/* {product.discount && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              -{product.discount}%
            </div>
          )} */}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <Badge className="bg-yellow-400 text-gray-900 italic ">
            Guitar St.Real
          </Badge>
          <h3 className="font-semibold text-gray-900 text-sm md:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="text-base md:text-xl font-semibold text-orange-600 tracking-tight">
            {FormatUtils.formatPriceVND(product.price)}
          </div>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-sm sm:text-base text-gray-500 line-through">
              {FormatUtils.formatPriceVND(product.oldPrice)}
            </span>
          )}

          {/* Đánh giá  */}
          <div>
            {product.ratingCount && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs md:text-sm text-gray-600">
                  {product.ratingCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none"></div>
      </div>
    );
  },
};
