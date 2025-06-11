/** @format */

import Banner from "@/components/Banner";
import SectionComponent from "@/components/layouts/SectionComponent";
import { Suspense } from "react";
import CircleLoading from "@/components/ui/circle-loading";
import ProductList from "@/components/product/product-list";
// import { getCategories } from "@/actions/get-categories";
import ReadMoreButton from "@/components/ui/read-more-btn";
import { Product } from "@/types/ProjectInterface";
import Link from "next/link";
import Image from "next/image";
import RenderSubCateForRoot, { SubType } from "./components/renderSubcateRoot";
import GocCamHungView from "./components/gocamhung";
import HomePromotion from "./components/home-promotion";
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  // Fetch categories and banners first
  // const [categories, banners] = await Promise.all([
  //   getCategories(),
  //   getBanners(),
  // ]);

  // const tuquanaoSubcategory = categories
  //   .flatMap((category) => category.subcategories)
  //   .find((sub) => sub.slug === "tu-quan-ao");

  // const giuongnguSubcategory = categories
  //   .flatMap((category) => category.subcategories)
  //   .find((sub) => sub.slug === "giuong-ngu");

  // const comboPhongNguSubcategory = categories
  //   .flatMap((category) => category.subcategories)
  //   .find((sub) => sub.slug === "combo-phong-ngu");

  // const tubepSubcategory = categories
  //   .flatMap((category) => category.subcategories)
  //   .find((sub) => sub.slug === "tu-bep");

  // // Fetch products in parallel
  // const [productWithFeatures] = await Promise.all([
  //   getProducts({ isFeatured: true, limit: 4 }),
  // ]);

  // const subcategories: SubType[] = [
  //   {
  //     subcategory: tuquanaoSubcategory,
  //     alt: "Tủ quần áo",
  //     href: "/san-pham/tu-quan-ao",
  //   },
  //   {
  //     subcategory: giuongnguSubcategory,
  //     alt: "Giường ngủ",
  //     href: "/san-pham/giuong-ngu",
  //   },
  //   {
  //     subcategory: comboPhongNguSubcategory,
  //     alt: "Combo Phòng Ngủ",

  //     href: "/san-pham/combo-phong-ngu",
  //   },
  //   {
  //     subcategory: tubepSubcategory,
  //     alt: "Tủ Bếp",
  //     href: "/san-pham/tu-bep",
  //   },
  // ];

  // const renderProductSection = (
  //   title: string,
  //   products: Product[],
  //   linkReadmore?: string
  // ) => (
  //   <SectionComponent>
  //     <ProductList title={title} products={products} />
  //     {linkReadmore && products.length > 0 && (
  //       <div className="flex justify-center">
  //         <ReadMoreButton
  //           title={`Xem thêm ${title.toLowerCase()}`}
  //           href={linkReadmore}
  //         />
  //       </div>
  //     )}
  //   </SectionComponent>
  // );

  return (
    <Suspense fallback={<CircleLoading />}>
      <div>
        <HomePromotion />
        {/* <SectionComponent className="my-[0px]">
          <Banner images={banners} minHeight="lg" />
        </SectionComponent> */}
        {/* <div className="container mx-auto flex flex-col gap-y-4 py-4">
          {renderProductSection("Sản phẩm nổi bật", productWithFeatures, "")}
        </div> */}

        {/* <div className="grid grid-cols-2 gap-4 ">
          {renderProductSection("Sản phẩm nổi bật", productWithFeatures, "")}
        </div>
        <RenderSubCateForRoot subcategories={subcategories} /> */}
      </div>
      {/* <GocCamHungView /> */}
    </Suspense>
  );
}
