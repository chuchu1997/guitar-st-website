import { getCategoryWithSlug } from "@/actions/get-categories";
import { getProducts } from "@/actions/get-products";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";



const DanhMucPage = async () => {
    const category = await getCategoryWithSlug('danh-muc');
    const products = await getProducts({
        categoryId: category.id,
        isFeatured: true,
        limit: 10,
        currentPage: 1,
    });

  return (
    <div className="container mx-auto">
        <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục :(${category.name}) `}
          />
          <ProductList title={category.name} products={products} />
        </section>
      </Suspense>
    </div>
  );
}

export default DanhMucPage;