/** @format */

import { getCategoryWithSlug } from "@/actions/get-categories";
import { getProducts } from "@/actions/get-products";
import TileComponent from "@/components/layouts/TileComponent";
import PreviewProductComponent from "@/components/product/PreviewProduct";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";

interface DanhMucPageWithIdProps {
  params: Promise<{ slug: string }>;
}
const DanhMucPageWithID = async (props: DanhMucPageWithIdProps) => {
  const { params } = props;
  const { slug } = await params;

  const category = await getCategoryWithSlug(slug);

  const products = await getProducts({
    categoryId: category.id,
  });

  return (
    <div className="container mx-auto py-8">
      {/* <div>DAY LA ID CUA CATEGORY {slug}</div> */}
      <BillboardLayout data={category.billboard} />
      <section className="list-products">
        <TileComponent title="Sản phẩm thuộc category này" />
        <ProductList title="" products={products} />
        {/* <div className=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {products.map((product) => (
            <PreviewProductComponent key={product.id} data={product} />
          ))}
        </div> */}
      </section>
    </div>
  );
};
export default DanhMucPageWithID;
