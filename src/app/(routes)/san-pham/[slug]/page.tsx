/** @format */

import { Metadata } from "next";

import { SeoInterface } from "@/types/seo";
import { generateProductSchema, generateSeoForPage } from "@/seo-ssr/seo-ssr";
import SanPhamPageWithSlug from "./san-pham-slug";
import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";
export async function generateMetadata(
  props: Promise<{ params: { slug: string } }>
): Promise<Metadata> {
  const { params } = await props;
  const { slug } = await params; // 👈 params cũng cần được await
  try {
    const res = await ProductAPI.getProductBySlug(slug);
    const product = res.data.product as ProductInterface;

    if (product.seo && typeof product.seo === "object") {
      return generateSeoForPage(product.seo as SeoInterface);
    }

    return {
      title: "Sản phẩm",
      description: "",
    };
  } catch (error) {
    console.error("Error generating metadata for category:", error);

    return {
      title: "Sản phẩm ",
      description: "Mô tả sản phẩm ",
    };
  }
}

export default SanPhamPageWithSlug;
