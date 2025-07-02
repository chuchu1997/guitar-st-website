import { Metadata } from "next";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { SeoInterface } from "@/types/seo";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import DanhMucPage from "./danhmuc-slug";

export async function generateMetadata(
  props: Promise<{ params: { slug: string } }>
): Promise<Metadata> {
  const { params } = await props;

  const { slug } = await params; // 👈 params cũng cần được await

  try {
    const res = await CategoryAPI.getCategoryWithSlug(slug, 1, 1);
    const category = res.data as CategoryInterface;

    if (category.seo && typeof category.seo === "object") {
      return generateSeoForPage(category.seo as SeoInterface);
    }

    return {
      title: category.name || "Danh mục",
      description: category.description || "",
    };
  } catch (error) {
    console.error('Error generating metadata for category:', error);
    
    return {
      title: "Danh mục",
      description: "Danh mục sản phẩm",
    };
  }
}

export default DanhMucPage;