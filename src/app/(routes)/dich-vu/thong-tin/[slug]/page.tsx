import { getServices, getServiceWithSlug } from "@/actions/get-services";
import TabPrivacy from "@/app/(routes)/san-pham/thong-tin/[slug]/components/tab-product-privacy";
import Gallery from "@/components/gallery";
import Info from "@/components/info/product/infoProduct";
import InfoService from "@/components/info/infoService";
import TileComponent from "@/components/layouts/TileComponent";
import LexicalViewer from "@/components/LoadLexicalJsonString";
import ServiceList from "@/components/service/service-list";
import CircleLoading from "@/components/ui/circle-loading";
import { Product } from "@/types/ProjectInterface";
import { Suspense } from "react";
import { Metadata } from "next";




interface ThongTinPageProps {
  params: Promise<{ slug: string }>;
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function generateMetadata(props: ThongTinPageProps): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const service = await getServiceWithSlug(slug);

  if (!service) {
    return {
      title: "Dịch Vụ Không Tìm Thấy | Happy Furniture",
      description: "Không tìm thấy thông tin dịch vụ phù hợp.",
      metadataBase: new URL(baseUrl),
    };
  }

  const title = `${service.name} - Dịch Vụ Nội Thất | Happy Furniture`;
  const description = `Tìm hiểu chi tiết về dịch vụ ${service.name} từ Happy Furniture – chuyên nghiệp, tận tâm và chất lượng cao.`

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/dich-vu/thong-tin/${slug}`,
      languages: {
        "vi-VN": `${baseUrl}/dich-vu/thong-tin/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      url: `${baseUrl}/dich-vu/thong-tin/${slug}`,
      siteName: "Happy Furniture",
      title,
      description,
      images: [
        {
          url: service.images?.[0]?.url || `${baseUrl}/images/banner-service.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.name} - Happy Furniture`,
        },
      ],
    },
    applicationName: "Happy Furniture",
    keywords: [
      service.name.toLowerCase(),
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

const ThongTinPage =  async (props:ThongTinPageProps) => {

    const {params} = props;
    const {slug} = await params;

    const service = await  getServiceWithSlug(slug);

    const allServicesInSameCategory = await getServices({
      categoryId: service.category.id,
    });
    const suggestServices = allServicesInSameCategory.filter(
      (s) => s.id !== service.id
    );
   
    // const suggestServicesWithSameCategogy = await getProducts({
    //   categoryId: product.category.id,
    // });

  return (
   <div className = "container mx-auto">
   <Suspense fallback={<CircleLoading />}>
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
              <Gallery images={service.images}></Gallery>
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <InfoService data={service } ></InfoService>
                <hr className="my-4" />
                {/* <TabPrivacy /> */}
              </div>
            </div>
            <div className="py-4">
              <h1 className="text-3xl font-bold  italic">
                Đây là phần mô tả của sản phẩm :
              </h1>
              <div className="flex gap-10 ">
                <LexicalViewer jsonContent={service.description} />
              </div>
            </div>
          </div>
          <hr className="my-10" />

          <ServiceList
            title="Đây là gợi ý các dịch vụ liên quan "
            services={suggestServices}
          />
        </div>
      </div>
    </Suspense>
     
     

     
     </div>
  );
}
export default ThongTinPage;