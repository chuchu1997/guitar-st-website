/** @format */
"use client";
import { Product, ProductSize } from "@/types/ProjectInterface";
import CurrencyComponent from "../../currencyComponent";
import { Button } from "../../ui/button";
import { ShoppingCart } from "lucide-react";
import FreeConsultation from "../../freeConsultationForm";
import ProductSizeSelector from "./selectSizes";
import ProductPriceBox from "./priceUI";
import { useEffect, useState } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [sizeSelect, setSizeSelect] = useState<ProductSize>();

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-semibold text-gray-900 capitalize">
        {data.name}
      </h1>

      <ProductPriceBox
        originalPrice={sizeSelect ? sizeSelect.price : data.price}
        salePrice={sizeSelect ? sizeSelect.price * 0.7 : data.price * 0.7}
      />

      <ProductSizeSelector
        onChangeSize={(data: ProductSize) => {
          setSizeSelect(data);
        }}
        productSizeOptions={data.productSizes}
      />

      <hr className="my-4" />

      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2" type="button">
          Thêm vào giỏ hàng
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>

      <div className="">
        <FreeConsultation />
      </div>
    </div>
  );
};

export default Info;
