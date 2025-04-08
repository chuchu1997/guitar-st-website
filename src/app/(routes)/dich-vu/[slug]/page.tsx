import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";


interface DichVuPageWithProps {  
    params:Promise<{slug:string}>

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
