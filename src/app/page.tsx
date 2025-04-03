/** @format */

import Banner from "@/components/Banner";
import TileComponent from "@/components/layouts/TileComponent";

import SectionComponent from "@/components/layouts/SectionComponent";
import Image from "next/image";

import getBillboard from "@/actions/get-billboard";
import { Suspense } from "react";
import CircleLoading from "@/components/ui/circle-loading";
import ProductList from "@/components/product/product-list";
import { getProducts } from "@/actions/get-products";
import { getCategories } from "@/actions/get-categories";
import { Product } from "@/types/ProjectInterface";
import ReadMoreButton from "@/components/ui/read-more-btn";

export default async function Home() {
  const banners = await getBillboard("65ef27af-3792-4dd6-9473-3a6a363919e7");

  const productWithFeatures = await getProducts({
    isFeatured: true,
    limit: 4,
  });
  const categories = await getCategories();
  const categoryMap = Object.fromEntries(
    categories.map((category) => [category.slug, category.id])
  );

  const [giuongngu, combophongngu, noithatnhabep, tuquanao] = await Promise.all(
    [
      categoryMap["giuong-ngu"]
        ? getProducts({ categoryId: categoryMap["giuong-ngu"] })
        : [],
      categoryMap["combo-phong-ngu"]
        ? getProducts({ categoryId: categoryMap["combo-phong-ngu"] })
        : [],
      categoryMap["noi-that-nha-bep"]
        ? getProducts({ categoryId: categoryMap["noi-that-nha-bep"] })
        : [],
      categoryMap["dd-11-121221"]
        ? getProducts({ categoryId: categoryMap["dd-11-121221"] })
        : [],
    ]
  );

  return (
    <Suspense fallback={<CircleLoading />}>
      <div>
        <SectionComponent className="my-[0px]">
          <Banner images={[banners]}></Banner>
        </SectionComponent>
        <div className="container mx-auto flex flex-col gap-y-4">
          <SectionComponent>
            <ProductList
              title="Các sản phẩm nổi bật "
              products={productWithFeatures}></ProductList>
          </SectionComponent>
          <SectionComponent>
            <ProductList title="Tủ quần áo " products={tuquanao}></ProductList>
            {tuquanao.length !== 0 && (
              <div className="flex justify-center">
                <ReadMoreButton
                  title="Xem thêm tủ quần áo"
                  href={`/danh-muc/${tuquanao[0].category.slug}`}
                />
              </div>
            )}
          </SectionComponent>
          <SectionComponent>
            <ProductList title="Giường ngủ" products={giuongngu}></ProductList>
          </SectionComponent>
          <SectionComponent>
            <ProductList
              title="Nội thất nhà bếp"
              products={noithatnhabep}></ProductList>
          </SectionComponent>
          <SectionComponent>
            <ProductList
              title="Combo phòng ngủ  "
              products={combophongngu}></ProductList>
          </SectionComponent>
        </div>
      </div>
    </Suspense>
  );
}
