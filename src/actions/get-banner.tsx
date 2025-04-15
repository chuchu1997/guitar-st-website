import { Billboard } from "@/types/ProjectInterface";
import axios from "axios"


const getBanners = async():Promise<Billboard[]> =>{
    const url = `${process.env.NEXT_PUBLIC_API}/banners`
    const res = await axios.get(url);
    return res.data;


}


export default getBanners;
