import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";


import type { Metadata } from "next";
import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://happyfurniture.logtech.vn";

interface SanPhamPageWithProps {  
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: SanPhamPageWithProps): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const subCategory = await getSubCategoriesWithSlug(slug);

  if (!subCategory) {
    return {
      title: "Danh Mục Không Tồn Tại | Happy Furniture",
      description: "Không tìm thấy danh mục sản phẩm phù hợp.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `${subCategory.name} - Sản Phẩm Nội Thất | Happy Furniture`;
  const description = `Khám phá sản phẩm thuộc danh mục ${subCategory.name} tại Happy Furniture – thiết kế đẹp, chất lượng cao, giá tốt.`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/san-pham/${slug}`,
      languages: {
        "vi-VN": `${baseUrl}/san-pham/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${baseUrl}/san-pham/${slug}`,
      siteName: "Happy Furniture",
      title,
      description,
      images: [
        {
          url: subCategory.billboard?.imageUrl || `${baseUrl}/images/banner-product.jpg`,
          width: 1200,
          height: 630,
          alt: `${subCategory.name} - Danh Mục Sản Phẩm`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      subCategory.name.toLowerCase(),
      "sản phẩm nội thất",
      "thiết kế nội thất",
      "mua nội thất",
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


const SanPhamPageWithSlug  = async (props:SanPhamPageWithProps) =>{
    const {params} = props;
    const {slug} = await params;
    //GET SERVICE WITH SLUG  ;
    //GET SERVICE ITEM 
    const subCategories = await getSubCategoriesWithSlug(slug);

    return <div className = "container mx-auto">


    <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={subCategories.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục :(${subCategories.name}) `}
          />
         <ProductList title = {subCategories.name} products={subCategories.products} />
        </section>
      </Suspense> 
    
    
    </div>
    

}


export default SanPhamPageWithSlug;
