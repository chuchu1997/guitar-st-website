import { Billboard, Category } from "@/types/ProjectInterface";



const URL = `${process.env.NEXT_PUBLIC_API}/billboards`

const getBillboard = async (id:string):Promise<Billboard>=>{


    const res = await fetch(`${URL}/${id}`)

    return res.json()
}


export default getBillboard;
