import { ProductAPI } from "@/api/products/product.api"
import { ProductWidgets } from "@/components/ui/product/product";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header"
import { ProductInterface } from "@/types/product";
import { Star } from "lucide-react"




const FeatureProducts = async  () =>{
    const response =  await ProductAPI.getFeatureProducts({});
    const featureProducts = response.data.products as ProductInterface[];
    console.log("FF",featureProducts)

    return  <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Sản phẩm nổi bật" icon={<Star className="text-black" size={24} />} />
          <div className="grid grid-cols-2 sm-grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
            {featureProducts.map(product => (
                <ProductCard key = {product.id} product={product}  />
            //   <ProductWidgets.productCardMasterPage key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
}
export default FeatureProducts;
