import { Category } from "@/types/ProjectInterface";
import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_API}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(URL);

  return res.data;
  
};

const getCategoryWithSlug = async (slug: string): Promise<Category> => {
  const res = await axios.get(`${URL}/${slug}`);

  return res.data;

};

export { getCategories, getCategoryWithSlug };
