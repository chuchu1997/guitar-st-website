import {News} from "@/types/ProjectInterface";
import axios from "axios"


const getArticle = async():Promise<News[]> =>{
    const url = `${process.env.NEXT_PUBLIC_API}/news`
    const res = await axios.get(url);
    return res.data;
}
const getArticleWithSlug = async (slug:string):Promise<News> =>{
    const url = `${process.env.NEXT_PUBLIC_API}/news/${slug}`
    const res = await axios.get(url)
    return res.data;


}


export 
{getArticle,getArticleWithSlug}

