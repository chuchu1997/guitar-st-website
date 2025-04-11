import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";












import type { Metadata } from "next";

const baseUrl = "https://happyfurniture.logtech.vn";

interface DanhMucPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props:DanhMucPageProps): Promise<Metadata> {
  const {params} = props;
  const {slug}= await params;
  const subCategory = await getSubCategoriesWithSlug(slug);

  if (!subCategory) {
    return {
      title: "Danh Mục Không Tồn Tại | Happy Furniture",
      description: "Không tìm thấy danh mục sản phẩm phù hợp.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `${subCategory.name} - Nội Thất Cao Cấp | Happy Furniture`;
  const description = `Khám phá các sản phẩm trong danh mục ${subCategory.name} với thiết kế hiện đại, chất lượng cao, phù hợp mọi không gian sống.`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/danh-muc/${slug}`,
      languages: {
        "vi-VN": `${baseUrl}/danh-muc/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${baseUrl}/danh-muc/${slug}`,
      siteName: "Happy Furniture",
      title,
      description: `Tìm kiếm các sản phẩm thuộc danh mục ${subCategory.name} – đa dạng về kiểu dáng, chất liệu và công năng.`,
      images: [
        {
          url: subCategory.billboard?.imageUrl || `${baseUrl}/images/default-banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${subCategory.name} - Happy Furniture`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      subCategory.name.toLowerCase(),
      "nội thất cao cấp",
      "nội thất hiện đại",
      "nội thất phòng khách",
      "sofa đẹp",
      "giường ngủ thông minh",
      "bàn ăn gỗ",
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



const DanhMucPage = async (props:DanhMucPageProps) => {
    const {params} = props;
    const {slug}= await params;

    const subCategories = await getSubCategoriesWithSlug(slug);

    const products = await subCategories.products;

  return (
    <div className = "container mx-auto">
     <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={subCategories.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục con :(${subCategories.name}) `}
          />
          <ProductList title={subCategories.name} products={products} />
        </section>
      </Suspense>
    </div>
  );
}

export default DanhMucPage;