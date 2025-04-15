'use client'

import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GioHangClient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      ten: "Áo Thun Nam",
      gia: 250000,
      soLuong: 2,
      hinhAnh: "/api/placeholder/160/160",
    },
    {
      id: 2,
      ten: "Quần Jeans Nữ",
      gia: 400000,
      soLuong: 1,
      hinhAnh: "/api/placeholder/160/160",
    },
  ]);

  // Calculate the total amount
  const tongTien = items.reduce((tong, item) => tong + item.gia * item.soLuong, 0);
  const tongSanPham = items.reduce((tong, item) => tong + item.soLuong, 0);

  // Handle quantity changes
  const handleQuantityChange = (id:any, change:any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.soLuong + change);
          return { ...item, soLuong: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id:any) => {
    setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="flex items-center justify-center md:justify-start mb-8">
        <ShoppingBag className="mr-2 text-accent" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
          Giỏ Hàng <span className="text-accent">({tongSanPham})</span>
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">Giỏ hàng của bạn đang trống</h2>
          <Button className="text-accent ">Tiếp tục mua sắm</Button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center bg-white shadow-sm hover:shadow-md rounded-xl p-4 gap-4 border border-gray-100 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.hinhAnh}
                    alt={item.ten}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">{item.ten}</h2>
                    <p className="text-lg md:text-xl font-bold text-accent italic">
                      {(item.gia * item.soLuong).toLocaleString()}₫
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">{item.gia.toLocaleString()}₫</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 text-center min-w-12">{item.soLuong}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
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
              
              <Button className="w-full py-6 text-lg bg-accent hover:bg-accent-700 transition-all duration-300 rounded-lg">
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