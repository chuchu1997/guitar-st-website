import { getCategoryWithSlug } from "@/actions/get-categories";
import TileComponent from "@/components/layouts/TileComponent";
import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";








const SanPhamPage = async ()=>{


    const category = await getCategoryWithSlug("san-pham");
    if (!category) return null;


    return <div className = "container mx-auto">
    <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các Sản Phẩm Trong Website :(${category.name}) `}
          />
          <ProductList title=  {category.name} products={category.products}  />
        </section>
      </Suspense>   

    </div>
}


export default SanPhamPage;
