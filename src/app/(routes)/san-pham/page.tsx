import { getCategoryWithSlug } from "@/actions/get-categories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";

import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://happyfurniture.logtech.vn";
export const dynamic = "force-dynamic";
export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategoryWithSlug("san-pham");

  if (!category) {
    return {
      title: "Sản Phẩm | Happy Furniture",
      description: "Khám phá các sản phẩm nội thất đa dạng và chất lượng tại Happy Furniture.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `Sản Phẩm Nội Thất - ${category.name} | Happy Furniture`;
  const description = `Khám phá các sản phẩm thuộc danh mục ${category.name} tại Happy Furniture – thiết kế tinh tế, chất lượng cao và giá cả hợp lý.`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/san-pham`,
      languages: {
        "vi-VN": `${baseUrl}/san-pham`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${baseUrl}/san-pham`,
      siteName: "Happy Furniture",
      title,
      description,
      images: [
        {
          url: category.billboard?.imageUrl || `${baseUrl}/images/banner-product.jpg`,
          width: 1200,
          height: 630,
          alt: `Danh mục sản phẩm - ${category.name}`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      "sản phẩm nội thất",
      "nội thất cao cấp",
      "nội thất hiện đại",
      "mua nội thất",
      "happy furniture",
      category.name.toLowerCase(),
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




const SanPhamPage = async ()=>{


    const category = await getCategoryWithSlug("san-pham");
    if (!category) return null;


    return <div className = "container mx-auto">
    <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các Sản Phẩm Trong Website :(${category.name}) `}
          />
          <ProductList title=  {category.name} products={category.products}  />
        </section>
      </Suspense>   

    </div>
}


export default SanPhamPage;
