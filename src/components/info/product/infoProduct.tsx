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
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sizeSelect, setSizeSelect] = useState<ProductSize>();
  const [isAdded, setIsAdded] = useState(false); // State để theo dõi khi sản phẩm đã được thêm vào giỏ hàng

  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleAddProductToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngừng sự kiện click lan ra ngoài
    setIsAdded(true); // Khi bấm thêm vào giỏ hàng, set state là true
    cart.addItem(data);

    // Reset lại trạng thái sau 1 giây để hiệu ứng animation có thể hoàn thành
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };
  if (!isMounted) return null;
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

      <div className="">
        <FreeConsultation />
      </div>
      <div className=" overflow-hidden mt-10 flex flex-col sm:flex-row items-center justify-between gap-x-3 gap-y-3">
        <div className="w-full sm:flex-1">
          <Button
            onClick={handleAddProductToCart}
            className="w-full h-auto flex flex-col items-center justify-center gap-y-1
    bg-orange-500 text-white
    hover:bg-orange-600 hover:shadow-lg hover:scale-[1.02]
    transition-all duration-300 ease-in-out
    rounded-lg py-3"
            type="button">
            <ShoppingCart className="w-6 h-6" />
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div className="w-full sm:flex-1">
          <Button
            className="w-full h-auto flex flex-col items-center justify-center gap-x-2 "
            type="button">
            <ShoppingCart className="w-6 h-6" />
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
