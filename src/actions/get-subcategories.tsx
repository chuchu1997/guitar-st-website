

import { SubCategory } from "@/types/ProjectInterface";
import axios from "axios"
const URL = `${process.env.NEXT_PUBLIC_API}/sub-categories`

// const getCategories = async():Promise<SubCategory[]>=>{
//     const res = await fetch(URL)
//     return res.json();

// }

const getSubCategoriesWithSlug= async(slug:string):Promise<SubCategory>=>{
    
//    const url =  qs.stringifyUrl({
//         url:URL,
//         query:{
//             categoryId:query.categoryId,
//             isFeatured:query.isFeatured,
//             limit:query.limit,
//             currentPage:query.currentPage,
//             subCategoryId:query.subCategoryId
//         }
//     })
    // const encodedSlug = encodeURIComponent(slug);
    
    const res = await axios.get(`${URL}/${slug}`);

    return res.data;

}



export {getSubCategoriesWithSlug}

