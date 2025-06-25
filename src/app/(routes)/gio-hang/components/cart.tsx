/** @format */
"use client";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie"; // Dùng để quản lý cookie
import { Button } from "@/components/ui/button"; // Adjust the path if necessary
import { ImageLoader } from "@/components/ui/image-loader";
import { FormatUtils } from "@/utils/format";
import { DiscountComponent } from "@/components/ui/Discount/discount";
import { CartItem } from "./cart-item";
import { CartProduct } from "@/types/cart";
import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";
import { discountTypeEnum } from "@/types/promotion";

const CartComponent = () => {
  const router = useRouter();
  const [isMouted, setIsMounted] = useState(true);

  const cart = useCart();
  const [productCarts, setProductCarts] = useState<CartProduct[]>([]);
  const [totalBill, setTotalBill] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const tongSanPhamTatCa = cart.items.reduce(
    (sum, item) => sum + item.stockQuantity,
    0
  );

  useEffect(() => {
    setIsMounted(true);
    fetchProductRelateWithCart();
  }, []);

  useEffect(() => {
    const selectedItems = productCarts.filter((item) => item.isSelect);

    const total = selectedItems.reduce((sum, item) => {
      const price = item.promotionProducts?.[0]
        ? // Nếu có khuyến mãi
          item.promotionProducts[0].discountType === discountTypeEnum.PERCENT
          ? item.price * (1 - item.promotionProducts[0].discount / 100)
          : item.price - item.promotionProducts[0].discount
        : item.price;

      return sum + price * item.cartQuantity;
    }, 0);

    const quantity = selectedItems.reduce(
      (sum, item) => sum + item.cartQuantity,
      0
    );

    setTotalBill(total);
    setTotalQuantity(quantity);
  }, [productCarts]);
  const onUpdateQuantity = (id: number, newQuantity: number, stock: number) => {
    cart.updateQuantity(id, newQuantity, stock);
    setProductCarts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cartQuantity: newQuantity } : item
      )
    );
  };
  const fetchProductRelateWithCart = async () => {
    const { items } = cart;

    const ids = items.map((item) => item.id);
    if (ids.length > 0) {
      const res = await ProductAPI.getProductByIDS(ids);
      const fetchedProducts: ProductInterface[] = res.data.products;
      const merged = fetchedProducts.map((product) => {
        const cartItem = items.find((item) => item.id === product.id);
        return {
          ...product,
          cartQuantity: cartItem?.stockQuantity || 1,
          isSelect: cartItem?.isSelect ?? true,
        };
      });
      setProductCarts(merged);
    }
  };

  const toggleSelectItem = (id: number) => {
    cart.toggleSelectItem(id);
    setProductCarts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelect: !item.isSelect } : item
      )
    );
  };
  const onCheckout = async () => {
    router.push(`/checkout`);
  };
  if (!isMouted) return null;

  return (
    <>
      <div className="flex items-center justify-center md:justify-start mb-8">
        <ShoppingBag className="mr-2 text-accent" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
          Giỏ Hàng <span className="text-accent">({tongSanPhamTatCa})</span>
        </h1>
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">
            Giỏ hàng của bạn đang trống
          </h2>
          <Button className="text-accent" onClick={() => router.push("/")}>
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {productCarts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start bg-white shadow-sm hover:shadow-md rounded-xl p-4 gap-4 border border-gray-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={item.isSelect}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />

                  {/* <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover"
                  /> */}
                </div>
                <div className="flex-grow ">
                  <CartItem
                    product={item}
                    cart={cart}
                    onUpdateQuantity={onUpdateQuantity}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tổng đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-100">
                Tổng Thanh Toán
              </h2>

              <div className="space-y-3 mb-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({totalQuantity} sản phẩm):</span>
                  <span>{FormatUtils.formatPriceVND(totalBill)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">
                    {totalBill > 0 ? "Miễn phí" : "0₫"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-accent">
                    <span>{FormatUtils.formatPriceVND(totalBill)}</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Đã bao gồm VAT (nếu có)
                </p>
              </div>

              <Button
                className="w-full py-6 text-lg text-accent transition-all duration-300 rounded-lg disabled:opacity-50"
                disabled={cart.items.length === 0}
                onClick={onCheckout}>
                Tiến hành thanh toán ({totalQuantity})
              </Button>

              <div className="mt-4 text-center">
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => router.push("/")}>
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;
