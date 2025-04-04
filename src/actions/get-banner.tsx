import { Billboard } from "@/types/ProjectInterface";



const getBanners = async():Promise<Billboard[]> =>{
    const url = `${process.env.NEXT_PUBLIC_API}/banners`
    const res=  await fetch(url);
    return res.json();

}


export default getBanners;
