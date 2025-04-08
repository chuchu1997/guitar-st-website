import { getSubCategoriesWithSlug } from "@/actions/get-subcategories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";


interface DanhMucPageProps {
    params: Promise<{ slug: string }>
}


const DanhMucPage = async (props:DanhMucPageProps) => {
    const {params} = props;
    const {slug}= await params;

    const subCategories = await getSubCategoriesWithSlug(slug);

    const products = await subCategories.products;

  return (
    <div className = "container mx-auto">
     <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={subCategories.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục con :(${subCategories.name}) `}
          />
          <ProductList title={subCategories.name} products={products} />
        </section>
      </Suspense>
    </div>
  );
}

export default DanhMucPage;