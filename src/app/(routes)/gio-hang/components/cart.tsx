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

const CartComponent = () => {
  const router = useRouter();
  const [isMouted, setIsMounted] = useState(true);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const selectedCartItems = cart.items.filter(
    (item) => item.isSelect // Kiểm tra xem sản phẩm có được chọn hay không
  );

  const tongTien = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.stockQuantity,
    0
  );

  const tongSanPham = selectedCartItems.reduce(
    (sum, item) => sum + item.stockQuantity,
    0
  );

  // Tổng tất cả sản phẩm (dùng ở phần tiêu đề)
  const tongSanPhamTatCa = cart.items.reduce(
    (sum, item) => sum + item.stockQuantity,
    0
  );

  const toggleSelectItem = (id: number) => {
    cart.toggleSelectItem(id);
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
            {cart.items.map((item, index) => (
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
                  <CartItem product={item} cart={cart} />
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
                  <span>Tạm tính ({tongSanPham} sản phẩm):</span>
                  <span>{tongTien.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">
                    {tongTien > 0 ? "Miễn phí" : "0₫"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-accent">
                    {tongTien.toLocaleString()}₫
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Đã bao gồm VAT (nếu có)
                </p>
              </div>

              <Button
                className="w-full py-6 text-lg text-accent transition-all duration-300 rounded-lg disabled:opacity-50"
                disabled={selectedCartItems.length === 0}
                onClick={onCheckout}>
                Tiến hành thanh toán ({tongSanPham})
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
