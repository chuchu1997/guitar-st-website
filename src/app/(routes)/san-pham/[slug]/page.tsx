/** @format */

import { getProductBySlug } from "@/actions/get-products";
import Image from "next/image";

interface ProductPageWithSlugProps {
  params: Promise<{ slug: string }>;
}

const SanPhamWithId = async (props: ProductPageWithSlugProps) => {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  return (
    <div className="container mx-auto">
      <div>DAY LA TEN SAN PHAM {product.name}</div>
      <div className="h-[200px] w-[200px] relative">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SanPhamWithId;
