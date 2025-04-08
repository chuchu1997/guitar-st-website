

import { Service } from "@/types/ProjectInterface";

const URL = `${process.env.NEXT_PUBLIC_API}/services`


const getServiceWithSlug = async(slug:string):Promise<Service>=>{
    const res = await fetch(`${URL}/${slug}`);
    return res.json();

}


export {getServiceWithSlug}

