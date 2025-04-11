/** @format */

import { getProductBySlug, getProducts } from "@/actions/get-products";
import Info from "@/components/info/product/infoProduct";
import ProductList from "@/components/product/product-list";
import TabPrivacy from "./components/tab-product-privacy";
import { Suspense } from "react";
import CircleLoading from "@/components/ui/circle-loading";
import LexicalViewer from "@/components/LoadLexicalJsonString";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import GalleryClientWrapper from "@/components/gallery/gallery-wrapper";
import EditorClientWrapper from "@/components/editor/editor-wrapper";

interface ProductPageWithSlugProps {
  params: Promise<{ slug: string }>;
}

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://happyfurniture.logtech.vn";

export async function generateMetadata(
  props: ProductPageWithSlugProps
): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản Phẩm Không Tồn Tại | Happy Furniture",
      description: "Không tìm thấy thông tin sản phẩm phù hợp.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `${product.name} - Sản Phẩm Nội Thất | Happy Furniture`;
  const description = `Tìm hiểu chi tiết về sản phẩm ${product.name} – thiết kế tinh tế, chất liệu cao cấp từ Happy Furniture.`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/san-pham/thong-tin/${slug}`,
      languages: {
        "vi-VN": `${baseUrl}/san-pham/thong-tin/${slug}`,
      },
    },
    openGraph: {
      locale: "vi_VN",
      url: `${baseUrl}/san-pham/thong-tin/${slug}`,
      siteName: "Happy Furniture",
      title,
      description,
      images: [
        {
          url: product.images?.[0]?.url || ``,
          width: 1200,
          height: 630,
          alt: `${product.name} - Hình ảnh sản phẩm`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      product.name.toLowerCase(),
      "nội thất cao cấp",
      "mua nội thất",
      product.category.name.toLowerCase(),
      "happy furniture",
    ],
    authors: [{ name: "Happy Furniture Team" }],
    creator: "Happy Furniture",
    publisher: "Happy Furniture Việt Nam",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "shopping",
  };
}

const SanPhamWithId = async (props: ProductPageWithSlugProps) => {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  const allProductInSameCategory = await getProducts({
    categoryId: product.category.id,
  });

  const suggestProduct = allProductInSameCategory.filter(
    (s) => s.id !== product.id
  );

  return (
    <Suspense fallback={<CircleLoading />}>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <GalleryClientWrapper images={product.images} />
              <div className="mt-10 sm:mt-16 lg:mt-0">
                <Info data={product} />
                <hr className="my-4" />
                <TabPrivacy />
              </div>
            </div>

            <div className="mt-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold italic mb-4 capitalize">
                Đây là phần mô tả của sản phẩm:
              </h1>
              <div className="flex  gap-2">
                <EditorClientWrapper jsonString={product.description} />
              </div>
            </div>
          </div>

          <hr className="my-10" />

          <ProductList
            title="Đây là gợi ý các sản phẩm liên quan"
            products={suggestProduct}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default SanPhamWithId;
