'use client';

import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/provider/cart-provider"; // Import useCart hook
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie"; // Dùng để quản lý cookie
import { v4 as uuidv4 } from 'uuid'; // Thư viện tạo UUID

const GioHangClient = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { productCart, addToCart, removeFromCart, updateQuantity } = useCart(); // Get cart data and functions
  const [cookies, setCookie] = useCookies(["sessionId"]); // Lấy và lưu cookie

  // Calculate the total amount
  const tongTien = productCart.reduce((tong, item) => tong + item.price * item.quantity, 0);
  const tongSanPham = productCart.reduce((tong, item) => tong + item.quantity, 0);

  // Check if sessionId exists, otherwise create a new one
  // useEffect(() => {
  //   if (!cookies.sessionId) {
  //     const newSessionId = uuidv4(); // Tạo ID mới cho customer
  //     setCookie("sessionId", newSessionId, { path: "/" }); // Lưu sessionId vào cookie
  //   }
  // }, [cookies, setCookie]);

  useEffect(() => {
    console.log("COOKIRES",cookies.sessionId)
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Debug log to track the current cart items
    console.log("Giỏ hàng hiện tại:", productCart);
  }, [productCart]);

  const createCheckout = async (sessionId:string) => {
    if (productCart.length === 0) return;

    const totalAmount = productCart.reduce((total, item) => total + item.price * item.quantity, 0); // Tính tổng tiền giỏ hàng

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: sessionId,  // Lấy sessionId từ cookie
          totalAmount: totalAmount,
          status: "pending", // Trạng thái tạm thời
        }),
      });
      const data = await response.json();
      console.log("Checkout created:", data);
      router.push(`/checkout/${data.id}`); // Chuyển hướng tới trang thanh toán với ID checkout
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="flex items-center justify-center md:justify-start mb-8">
        <ShoppingBag className="mr-2 text-accent" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
          Giỏ Hàng <span className="text-accent">({tongSanPham})</span>
        </h1>
      </div>

      {productCart.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">Giỏ hàng của bạn đang trống</h2>
          <Button className="text-accent">Tiếp tục mua sắm</Button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            {productCart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center bg-white shadow-sm hover:shadow-md rounded-xl p-4 gap-4 border border-gray-100 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-lg md:text-xl font-bold text-accent italic">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.price.toLocaleString()}₫</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        disabled={item.quantity === 1}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 text-center min-w-12">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm">Xóa</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-100">
                Tổng Thanh Toán
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({tongSanPham} sản phẩm):</span>
                  <span>{tongTien.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-accent">{tongTien.toLocaleString()}₫</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Đã bao gồm VAT (nếu có)</p>
              </div>
              
              <Button
                className="w-full py-6 text-lg text-accent transition-all duration-300 rounded-lg"
                onClick={() => createCheckout(cookies.sessionId)} // Gọi hàm tạo checkout
              >
                Tiến hành thanh toán
              </Button>
              
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                  Tiếp tục mua sắm
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GioHangClient;
