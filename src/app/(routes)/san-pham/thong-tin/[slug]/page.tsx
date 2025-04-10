/** @format */

import { getProductBySlug, getProducts } from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info/infoProduct";
import ProductList from "@/components/product/product-list";
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

  return (
    <Suspense fallback={<CircleLoading />}>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <Gallery images={product.images} />
              <div className="mt-10 sm:mt-16 lg:mt-0">
                <Info data={product} />
                <hr className="my-4" />
                <TabPrivacy />
              </div>
            </div>

            <div className="mt-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold italic mb-4 capitalize">
                Đây là phần mô tả của sản phẩm:
              </h1>
              <div className="flex  gap-2">
                <LexicalViewer jsonContent={product.description} />
              </div>
            </div>
          </div>

          <hr className="my-10" />

          <ProductList
            title="Đây là gợi ý các sản phẩm liên quan"
            products={suggestProduct}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default SanPhamWithId;
