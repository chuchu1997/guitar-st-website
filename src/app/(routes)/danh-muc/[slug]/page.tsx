/** @format */

import Link from "next/link";
import Image from "next/image";

import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { Suspense } from "react";
import { ProductWidgets } from "@/components/ui/product/product";
import { ImageLoader } from "@/components/ui/image-loader";

interface DanhMucPageProps {
  params: Promise<{ slug: string }>;
}

const VariantCardSkeleton = () => (
  <div className="group relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 relative"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
      <div className="h-6 bg-white/20 rounded w-2/3"></div>
      <div className="h-4 bg-white/20 rounded w-1/2"></div>
    </div>
  </div>
);

const VariantCard = ({ variant }: { variant: any }) => (
  <Link href={`/danh-muc/${variant.slug}`} className="block group">
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/20 hover:scale-105">
      {/* Background Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {variant.image && (
          <Image
            src={variant.image}
            alt={variant.name || "Category"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

        {/* Animated Border */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:inset-2"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {variant.name}
          </h3>

          {variant.description && (
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {variant.description}
            </p>
          )}

          {variant.productCount && (
            <div className="flex items-center gap-2 text-white/70">
              <svg
                className="w-4 h-4"
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
              <span className="text-sm font-medium">
                {variant.productCount} sản phẩm
              </span>
            </div>
          )}

          {/* Call to action */}
          <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
            <span>Khám phá ngay</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const DanhMucPage = async (props: DanhMucPageProps) => {
  const { params } = props;
  const { slug } = await params;

  let category: CategoryInterface | null = null;

  let response = await CategoryAPI.getCategoryWithSlug(slug);
  if (response.status === 200) {
    console.log("ok", response.data);
    category = response.data as CategoryInterface;
  }

  // Handle category not found
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.468-.94-6.017-2.471L12 9.529l6.017 2.471C16.468 14.06 14.34 15 12 15z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Không tìm thấy danh mục
          </h1>
          <p className="text-gray-600">
            Danh mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          {/* <div className="relative h-[400px] w-full ">
            <ImageLoader
              className="rounded-md"
              src={category.imageUrl}
              fill={true}
              alt="Hình ảnh danh mục "
            />
          </div> */}
          <div className="max-w-4xl mt-[10px]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors duration-200">
                Trang chủ
              </Link>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>

            {/* Category Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight capitalize italic">
                {category.name}
              </h1>

              {category.description && (
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {category.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                {Array.isArray(category.products) &&
                  category.products.length > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
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
                      <span className="font-medium">
                        {category.products.length} sản phẩm
                      </span>
                    </div>
                  )}

                {/* NEED CUSTOM HERE !! */}
                {category.variant && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span className="font-medium">
                      {category.variant} danh mục con
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {category.variant ? (
          /* Render Variants */
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Khám phá danh mục
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tìm hiểu các danh mục sản phẩm đa dạng của chúng tôi
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <VariantCardSkeleton key={i} />
                  ))}
                </div>
              }>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                cai gi day
                {/* {category.variants.map((variant, index) => (
                  <VariantCard key={variant.id || index} variant={variant} />
                ))} */}
              </div>
            </Suspense>
          </div>
        ) : (
          /* Render Products */
          <div className="space-y-8">
            {/* Filter and Sort Bar */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    <span className="font-medium">Bộ lọc</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sắp xếp:</span>
                    <select className="bg-transparent border-none text-sm font-medium text-gray-900 focus:ring-0">
                      <option>Mới nhất</option>
                      <option>Giá thấp đến cao</option>
                      <option>Giá cao đến thấp</option>
                      <option>Phổ biến nhất</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
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
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div> */}

            {/* Products Grid */}
            {category.products && category.products.length > 0 ? (
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ProductWidgets.cardSkeleton key={i} />
                      // <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                }>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.products.map((product, index) => (
                    <ProductWidgets.productCard
                      key={product.id || index}
                      {...product}
                    />
                  ))}
                </div>
              </Suspense>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DanhMucPage;
