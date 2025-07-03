/** @format */

import { Metadata } from "next";
import TintucSlug from "./tin-tuc-slug";
import { NewsAPI } from "@/api/news/news.api";
import { NewsInterface } from "@/types/news";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
export async function generateMetadata(
  props: Promise<{ params: { slug: string } }>
): Promise<Metadata> {
  const { params } = await props;
  const { slug } = await params; // 👈 params cũng cần được await
  try {
    const res = await NewsAPI.getNewsWithSlug({ slug });
    const news = res.data.article as NewsInterface;
    if (news.seo && typeof news.seo === "object") {
      return generateSeoForPage(news.seo);
    }
    return {
      title: "Tin tức",
      description: "",
    };
  } catch (error) {
    console.error("Error generating metadata for category:", error);

    return {
      title: "Tin tức ",
      description: "Mô tả tin tức  ",
    };
  }
}

export default TintucSlug;
