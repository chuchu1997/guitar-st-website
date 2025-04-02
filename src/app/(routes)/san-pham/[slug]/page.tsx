/** @format */

import { getProductBySlug, getProducts } from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product/product-list";
import Image from "next/image";

interface ProductPageWithSlugProps {
  params: Promise<{ slug: string }>;
}

const SanPhamWithId = async (props: ProductPageWithSlugProps) => {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  const suggestProductWithSameCategogy = await getProducts({
    categoryId: product.category.id,
  });
  // const suggestProductWithSameCategogy = await getProducts({
  //   categoryId: product.category,
  // });

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
            <Gallery images={product.images}></Gallery>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product}></Info>
            </div>
          </div>
        </div>
        <hr className="my-10" />

        <ProductList
          title="Đây là gợi ý các sản phẩm liên quan "
          products={suggestProductWithSameCategogy}
        />
      </div>
    </div>
  );
};

export default SanPhamWithId;
