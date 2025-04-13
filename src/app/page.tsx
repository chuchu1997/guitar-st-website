/** @format */

import Banner from "@/components/Banner";
import SectionComponent from "@/components/layouts/SectionComponent";
import { Suspense } from "react";
import CircleLoading from "@/components/ui/circle-loading";
import ProductList from "@/components/product/product-list";
import { getProducts } from "@/actions/get-products";
import { getCategories } from "@/actions/get-categories";
import ReadMoreButton from "@/components/ui/read-more-btn";
import getBanners from "@/actions/get-banner";
import { Product } from "@/types/ProjectInterface";
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  // Fetch categories and banners first
  const [categories, banners] = await Promise.all([
    getCategories(),
    getBanners(),
  ]);

  const subcategories = categories.flatMap(
    (category) => category.subcategories
  );

  // Lookup subcategory IDs safely
  const tuquanaoId = subcategories.find((s) => s.slug === "tu-quan-ao")?.id;
  const giuongnguId = subcategories.find((s) => s.slug === "giuong-ngu")?.id;
  const tubepId = subcategories.find((s) => s.slug === "tu-bep")?.id;
  const comboPhongNguId = subcategories.find(
    (s) => s.slug === "combo-phong-ngu"
  )?.id;

  // Fetch products in parallel
  const [
    productWithFeatures,
    tuquanaoProducts,
    giuongnguProducts,
    tubepProducts,
    comboPhongNguProducts,
  ] = await Promise.all([
    getProducts({ isFeatured: true, limit: 4 }),
    getProducts({ subCategoryId: tuquanaoId }),
    getProducts({ subCategoryId: giuongnguId }),
    getProducts({ subCategoryId: tubepId }),
    getProducts({ subCategoryId: comboPhongNguId }),
  ]);

  const renderProductSection = (
    title: string,
    products: Product[],
    linkReadmore?: string
  ) => (
    <SectionComponent>
      <ProductList title={title} products={products} />
      {linkReadmore && products.length > 0 && (
        <div className="flex justify-center">
          <ReadMoreButton
            title={`Xem thêm ${title.toLowerCase()}`}
            href={linkReadmore}
          />
        </div>
      )}
    </SectionComponent>
  );

  return (
    <Suspense fallback={<CircleLoading />}>
      <div>
        <SectionComponent className="my-[0px]">
          <Banner images={banners} />
        </SectionComponent>
        <div className="container mx-auto flex flex-col gap-y-4">
          {renderProductSection("Sản phẩm nổi bật", productWithFeatures, "")}
          {renderProductSection(
            "Tủ quần áo",
            tuquanaoProducts,
            "/san-pham/tu-quan-ao"
          )}
          {renderProductSection(
            "Giường ngủ ",
            giuongnguProducts,
            "/san-pham/giuong-ngu"
          )}
          {renderProductSection("Tủ bếp", tubepProducts, "/san-pham/tu-bep")}
          {renderProductSection(
            "Combo phòng ngủ ",
            comboPhongNguProducts,
            "/san-pham/combo-phong-ngu"
          )}
        </div>
      </div>
    </Suspense>
  );
}
