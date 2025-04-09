import { getServices, getServiceWithSlug } from "@/actions/get-services";
import TabPrivacy from "@/app/(routes)/san-pham/thong-tin/[slug]/components/tab-product-privacy";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import TileComponent from "@/components/layouts/TileComponent";
import LexicalViewer from "@/components/LoadLexicalJsonString";
import ServiceList from "@/components/service/service-list";
import CircleLoading from "@/components/ui/circle-loading";
import { Product } from "@/types/ProjectInterface";
import { Suspense } from "react";




interface ThongTinPageProps {
  params: Promise<{ slug: string }>;    
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
                <Info data={service } isProduct = {false}></Info>
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