import { getServiceWithSlug } from "@/actions/get-services";
import TileComponent from "@/components/layouts/TileComponent";




interface ThongTinPageProps {
  params: Promise<{ slug: string }>;    
}

const ThongTinPage =  async (props:ThongTinPageProps) => {

    const {params} = props;
    const {slug} = await params;
    const service = await  getServiceWithSlug(slug);


    console.log("SERVICE",service.subcategory);
    // const products = await subCategories.products


  return (
      <div className = "container mx-auto">
         <TileComponent
            title={`Các dịch vụ thuộc danh mục  :(${service.subcategory.name}) `}
          />
        
        DAY LA THONG TIN SERVICE CÓ TÊN {service.name }</div>
  );
}
export default ThongTinPage;