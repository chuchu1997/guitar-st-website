

import { Service } from "@/types/ProjectInterface";
import qs from "query-string";
import axios from "axios"
const URL = `${process.env.NEXT_PUBLIC_API}/services`



interface Query { 
    categoryId?:string;
    limit?:number;
    currentPage?:number;
    subCategoryId?:string;
}

const getServiceWithSlug = async(slug:string):Promise<Service>=>{
    const res = await axios.get(`${URL}/${slug}`);
    return res.data;
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
      const res = await axios.get(url)
      
      return res.data;
}


export {getServiceWithSlug ,getServices}

