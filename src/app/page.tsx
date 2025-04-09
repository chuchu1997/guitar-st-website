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

export default async function Home() {
  // const banners = await getBillboard("65ef27af-3792-4dd6-9473-3a6a363919e7");
  const categories = await getCategories();
  const subcategories = categories.flatMap(
    (category) => category.subcategories
  );

  // Create a map for subcategory lookups
  const getSubCategoryWithSlug = (slug: string) => {
    console.log("slug", slug);
    const match = subcategories.find((sub) => sub.slug === slug);

    return match?.id;
  };

  // Parallel fetching of all data
  const [
    productWithFeatures,
    banners,
    tuquanaoProducts,
    // tuquanaoProducts,
    // giuongnguProducts,
    // tubepProducts,
    // tuRuouProducts,
  ] = await Promise.all([
    getProducts({ isFeatured: true, limit: 4 }),
    getBanners(),

    getProducts({
      subCategoryId: getSubCategoryWithSlug("tu-quan-ao"),
    }),

    // getProducts({ limit: 4, subCategoryId: getSubcategoryId("/giuong-ngu") }),
    // getProducts({ limit: 4, subCategoryId: getSubcategoryId("/tu-bep") }),
    // getProducts({ limit: 4, subCategoryId: getSubcategoryId("/tu-ruou") }),
  ]);

  // Helper function to render product sections
  const renderProductSection = (
    title: string,
    products: Product[],
    slug: string
  ) => (
    <SectionComponent>
      <ProductList title={title} products={products} />
      {products.length !== 0 && (
        <div className="flex justify-center">
          <ReadMoreButton
            title={`Xem thêm ${title.toLowerCase()}`}
            href={`/danh-muc/noi-that/${slug}`}
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
          {renderProductSection("Tủ quần áo", tuquanaoProducts, "tu-quan-ao")}
          {/* {renderProductSection("Tủ quần áo", tuquanaoProducts, "tu-quan-ao")}
          {renderProductSection("Giường ngủ", giuongnguProducts, "giuong-ngu")}
          {renderProductSection("Tủ bếp", tubepProducts, "tu-bep")}
          {renderProductSection("Tủ rượu", tuRuouProducts, "tu-ruou")} */}
        </div>
      </div>
    </Suspense>
  );
}
