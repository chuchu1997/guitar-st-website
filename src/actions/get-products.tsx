





import { Product } from "@/types/ProjectInterface";
import qs from "query-string";
import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_API}/products`

interface Query { 
    categoryId?:string;
    isFeatured?:boolean;
    limit?:number;
    currentPage?:number;
    subCategoryId?:string;
}
const getProducts = async(query:Query):Promise<Product[]>=>{

    const url =  qs.stringifyUrl({
        url:URL,
        query:{
            categoryId:query.categoryId,
            isFeatured:query.isFeatured,
            limit:query.limit,
            currentPage:query.currentPage,
            subCategoryId:query.subCategoryId
        }
    })
    const res = await axios.get(url)
    
    return res.data;

}
const getProductBySlug = async (slug:string):Promise<Product>=>{
    const res = await axios.get(`${URL}/${slug}`)
    return res.data;

}


export {getProducts,getProductBySlug}

