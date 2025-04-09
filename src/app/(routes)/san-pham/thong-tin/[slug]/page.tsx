/** @format */

import { getProductBySlug, getProducts } from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product/product-list";
import Image from "next/image";
import TabPrivacy from "./components/tab-product-privacy";
import { Suspense } from "react";
import CircleLoading from "@/components/ui/circle-loading";
import LexicalViewer from "@/components/LoadLexicalJsonString";

interface ProductPageWithSlugProps {
  params: Promise<{ slug: string }>;
}

const SanPhamWithId = async (props: ProductPageWithSlugProps) => {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  const allProductInSameCategory = await getProducts({
    categoryId: product.category.id,
  });

  const suggestProduct = allProductInSameCategory.filter(
    (s) => s.id !== product.id
  );
  // const suggestProductWithSameCategogy = await getProducts({
  //   categoryId: product.category,
  // });

  return (
    <Suspense fallback={<CircleLoading />}>
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
              <Gallery images={product.images}></Gallery>
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={product}></Info>
                <hr className="my-4" />
                <TabPrivacy />
              </div>
            </div>
            <div className="py-4">
              <h1 className="text-3xl font-bold  italic">
                Đây là phần mô tả của sản phẩm :
              </h1>
              <div className="flex gap-10 ">
                <LexicalViewer jsonContent={product.description} />
              </div>
            </div>
          </div>
          <hr className="my-10" />

          <ProductList
            title="Đây là gợi ý các sản phẩm liên quan "
            products={suggestProduct}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default SanPhamWithId;
