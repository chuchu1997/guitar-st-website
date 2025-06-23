/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProductWidgets } from "@/components/ui/product/product";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { Star } from "lucide-react";

const FeatureProducts = async () => {
  const response = await ProductAPI.getFeatureProducts({});
  const featureProducts = response.data.products as ProductInterface[];

  const allProductPromotions: ProductPromotion[] = featureProducts.flatMap(
    (product) => product.promotionProducts
  );
  const uniquePromotionsMap = new Map<number, PromotionInterface>();

  for (const promo of allProductPromotions) {
    if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
      uniquePromotionsMap.set(promo.promotionId, promo.promotion);
    }
  }

  const promotions = Array.from(uniquePromotionsMap.values());

  //   featureProducts[0].promotionProducts[0].
  // console.log("FF",featureProducts)

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Sản phẩm nổi bật"
          icon={<Star className="text-black" size={24} />}
        />
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {featureProducts.map((product) => {
            const matchedPromotion = product.promotionProducts.find((pp) =>
              promotions.find((p) => p.id === pp.promotionId)
            )?.promotion;

            return (
              <ProductCard
                key={product.id}
                product={product}
                promotion={matchedPromotion || undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FeatureProducts;
