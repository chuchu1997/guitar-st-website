/** @format */
"use client";
import { useState } from "react";
import { ProductInterface } from "@/types/product";
import { ProductCard } from "./product-card";
import { PromotionInterface } from "@/types/promotion";

interface propsInterface {
  products: ProductInterface[];
}

const ProductWrapperCard = ({ products }: propsInterface) => {
  const [isGridLayout, setIsGridLayout] = useState(true);

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  return (
    <>
      {products && products.length > 0 ? (
        <>
          {/* Layout Toggle Button */}
          <div className="flex sm:hidden justify-end mb-4">
            <button
              onClick={toggleLayout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={
                isGridLayout
                  ? "Switch to single column"
                  : "Switch to grid layout"
              }>
              {isGridLayout ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="text-sm">Danh sách</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="text-sm">Lưới</span>
                </>
              )}
            </button>
          </div>

          {/* Products Container */}
          <div
            className={
              isGridLayout
                ? "columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 space-y-2"
                : "grid grid-cols-1 gap-4"
            }>
            {products.map((product, index) => {
              // Get the first promotion if available
              const promotion =
                product.promotionProducts &&
                product.promotionProducts.length > 0
                  ? product.promotionProducts[0].promotion
                  : undefined;

              return (
                <div
                  key={product.id || index}
                  className={isGridLayout ? "" : "w-full"}>
                  <ProductCard
                    product={product}
                    promotion={promotion}
                    isSingleColumn={!isGridLayout}
                  />
                </div>
              );
            })}
          </div>

          {/* Loading indicator for infinite scroll */}
          {/* {loadingMore && <LoadingSpinner />} */}

          {/* End of products message */}
          {/* {products.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Đã hiển thị tất cả sản phẩm</p>
            </div>
          )} */}
        </>
      ) : (
        <div className="text-center py-16 space-y-6">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Chưa có sản phẩm
          </h3>
          <p className="text-gray-600">
            Danh mục này hiện chưa có sản phẩm nào. Hãy quay lại sau nhé!
          </p>
        </div>
      )}
    </>
  );
};

export default ProductWrapperCard;
