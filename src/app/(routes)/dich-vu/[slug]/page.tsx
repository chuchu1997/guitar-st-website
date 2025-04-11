import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";





interface DichVuPageWithProps {  
    params:Promise<{slug:string}>

}


import type { Metadata } from "next";

const baseUrl = "https://happyfurniture.logtech.vn";


export async function generateMetadata(props: DichVuPageWithProps): Promise<Metadata> {
  const {params} = props;
  const {slug} = await params;
  const subCategory = await getSubCategoriesWithSlug(slug);

  if (!subCategory) {
    return {
      title: "Dịch Vụ Không Tồn Tại | Happy Furniture",
      description: "Không tìm thấy danh mục dịch vụ phù hợp.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `${subCategory.name} - Dịch Vụ Nội Thất | Happy Furniture`;
  const description = `Dịch vụ ${subCategory.name} từ Happy Furniture – chuyên nghiệp, tận tâm và chất lượng cao.`

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/dich-vu/${slug}`,
      languages: {
        "vi-VN": `${baseUrl}/dich-vu/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${baseUrl}/dich-vu/${slug}`,
      siteName: "Happy Furniture",
      title,
      description,
      images: [
        {
          url: subCategory.billboard?.imageUrl || `${baseUrl}/images/banner-service.jpg`,
          width: 1200,
          height: 630,
          alt: `${subCategory.name} - Dịch Vụ | Happy Furniture`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      subCategory.name.toLowerCase(),
      "dịch vụ nội thất",
      "thiết kế nội thất",
      "thi công nội thất",
      "nội thất trọn gói",
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



const DichVuPageWithSlug  = async (props:DichVuPageWithProps) =>{
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
          <div>THIS IS CREATE SERVICE LIST </div>
        </section>
      </Suspense> 
    
    
    </div>
    

}


export default DichVuPageWithSlug;
