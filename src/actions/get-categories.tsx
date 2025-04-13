import { Category } from "@/types/ProjectInterface";

const URL = `${process.env.NEXT_PUBLIC_API}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  return res.json();
};

const getCategoryWithSlug = async (slug: string): Promise<Category> => {
  const res = await fetch(`${URL}/${slug}`);

  return res.json();
};

export { getCategories, getCategoryWithSlug };
