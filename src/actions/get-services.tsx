

import { Service } from "@/types/ProjectInterface";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API}/services`


interface Query { 
    categoryId?:string;
    limit?:number;
    currentPage?:number;
    subCategoryId?:string;
}

const getServiceWithSlug = async(slug:string):Promise<Service>=>{
    const res = await fetch(`${URL}/${slug}`);
    return res.json();

}

const getServices = async (query:Query):Promise<Service[]>=>{
    const url =  qs.stringifyUrl({
          url:URL,
          query:{
              categoryId:query.categoryId,
         
              limit:query.limit,
              currentPage:query.currentPage,
              subCategoryId:query.subCategoryId
          }
      })
      const res = await fetch(url)
      
      return res.json();
}


export {getServiceWithSlug ,getServices}

