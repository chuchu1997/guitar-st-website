import { Billboard, Category } from "@/types/ProjectInterface";

import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_API}/billboards`

const getBillboard = async (id:string):Promise<Billboard>=>{


    const res = await axios.get(`${URL}/${id}`)

    return res.data;
    
}


export default getBillboard;
