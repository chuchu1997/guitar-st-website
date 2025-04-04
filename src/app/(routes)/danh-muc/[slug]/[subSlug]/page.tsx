/** @format */

import { getProducts } from "@/actions/get-products";
import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";

interface DanhMucSubWithSlugProps {
  params: Promise<{ subSlug: string }>;
}

const DanhMucSubWithSlug = async (props: DanhMucSubWithSlugProps) => {
  const { params } = props;
  const { subSlug } = await params;
  const subCategories = await getSubCategoriesWithSlug(`/${subSlug}`);
  console.log("SUB ", subCategories);

  return (
    <div className="container mx-auto">
      <Suspense fallback={<CircleLoading />}>
        {/* <BillboardLayout data={subCategories.billboard} /> */}
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục : (${subCategories.name}) `}
          />
          <ProductList
            title={subCategories.name}
            products={subCategories.products}
          />
        </section>
      </Suspense>
    </div>
  );
};

export default DanhMucSubWithSlug;
