// import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
// import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";





interface DichVuPageWithProps {  
    params:Promise<{slug:string}>

}


import type { Metadata } from "next";

const baseUrl = "https://happyfurniture.logtech.vn";





const DichVuPageWithSlug  = async (props:DichVuPageWithProps) =>{
    const {params} = props;
    const {slug} = await params;
    //GET SERVICE WITH SLUG  ;
    //GET SERVICE ITEM 

    return <div className = "container mx-auto">


    <Suspense fallback={<CircleLoading />}>
       
          <div>THIS IS CREATE SERVICE LIST </div>
      
      </Suspense> 
    
    
    </div>
    

}


export default DichVuPageWithSlug;
