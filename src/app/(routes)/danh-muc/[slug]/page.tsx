/** @format */
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ProductWidgets } from "@/components/ui/product/product";
import { useParams } from "next/navigation";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const DanhMucPage = () => {
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  // Fetch category data function
  const fetchCategoryData = useCallback(
    async (slug: string, page: number = 1) => {
      try {
        const response = await CategoryAPI.getCategoryWithSlug(slug, page);
        if (response.status === 200) {
          const categoryData = response.data as CategoryInterface;

          if (page === 1) {
            // Initial load
            setCategory(categoryData);
            setProducts(categoryData.products || []);
            setHasMore((categoryData.products?.length || 0) >= 4);
          } else {
            // Load more products
            const newProducts = categoryData.products || [];
            setProducts((prev) => [...prev, ...newProducts]);
            setHasMore(newProducts.length >= 4);
          }
          return categoryData;
        } else {
          throw new Error("Category not found");
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category");
        return null;
      }
    },
    []
  );

  // Load more products function
  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore || !slug) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      await fetchCategoryData(slug.toString(), nextPage);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Error loading more products:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, loadingMore, hasMore, slug, fetchCategoryData]);

  // Intersection Observer ref callback
  const lastProductElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loadingMore) {
            loadMoreProducts();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [loadingMore, hasMore, loadMoreProducts]
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Debug effect for currentPage changes

  // Initialize data when slug changes
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setCurrentPage(1);
      setProducts([]);
      setHasMore(true);
      setError(null);

      if (slug) {
        const categoryData = await fetchCategoryData(slug.toString(), 1);
        if (!categoryData) {
          setError("Category not found");
        }
      }
      setLoading(false);
    };

    initializeData();
  }, [slug, fetchCategoryData]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductWidgets.cardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Implement variant rendering here if needed */}
              <div>Variants rendering to be implemented</div>
            </div>
          </div>
        ) : (
          /* Render Products with Infinite Scroll */
          <div className="space-y-8">
            {products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product, index) => {
                    const isLast = index === products.length - 1;
                    return (
                      <div
                        key={product.id || index}
                        ref={isLast ? lastProductElementRef : null}>
                        <ProductWidgets.productCardSameTiktok {...product} />
                      </div>
                    );
                  })}
                </div>

                {/* Loading indicator for infinite scroll */}
                {loadingMore && <LoadingSpinner />}

                {/* End of products message */}
                {!hasMore && products.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Đã hiển thị tất cả sản phẩm</p>
                  </div>
                )}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DanhMucPage;
