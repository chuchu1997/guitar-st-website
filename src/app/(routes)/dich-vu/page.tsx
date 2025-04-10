import { getCategoryWithSlug } from "@/actions/get-categories"
import TileComponent from "@/components/layouts/TileComponent"
import ServiceList from "@/components/service/service-list"
import BillboardLayout from "@/components/ui/billboard"
import CircleLoading from "@/components/ui/circle-loading"
import { Suspense } from "react"



const DichVuPage = async  ()=>{

    const category = await getCategoryWithSlug('dich-vu');
    if (!category) return null;

    return <div className = "container mx-auto">
  
         <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các Dịch Vụ Của (CN) :(${category.name}) `}
          />
          <ServiceList title=  {category.name} services={category.services}  />
        </section>
      </Suspense>   
    </div>
}


export default DichVuPage