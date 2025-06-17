/** @format */

"use client";

import { ProductInterface } from "@/types/product";
import ProductImageGallery from "./productImageGallery";
import { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductWidgets } from "@/components/ui/product/product";
import EditorClientWrapper from "@/components/editor/editor-wrapper";

interface propsProductClientPC {
  product: ProductInterface;
}

export const ProductClientPC = ({ product }: propsProductClientPC) => {
  const tabs = [
    { key: "description", label: "Mô tả" },
    { key: "reviews", label: "Đánh giá" },
    { key: "shipping", label: "Giao hàng" },
  ];
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <span>Trang chủ</span> <span className="mx-2">/</span>
            <span>san-pham</span> <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.slug}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} />

            {/* Image Actions */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {product.viewCount} views
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderRatingStars(5)}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews ?? 0} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-red-600">
                  {FormatUtils.formatPriceVND(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              {product.stock < 10 && (
                <p className="text-orange-600 font-medium">
                  Only {product.stock} left in stock!
                </p>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Màu sắc:</h3>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-gray-900 scale-110"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Kích thước:</h3>
                <div className="flex items-center space-x-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-500"
                      }`}>
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Còn {product.stock} sản phẩm
                </span>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Mua ngay
                </button>
              </div>
            </div>

            {/* Gift Products */}
            {product.giftProducts && product.giftProducts.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-700 mb-2">
                  🎁 Quà tặng miễn phí kèm theo:
                </h3>
                <ul className="text-sm text-green-600 space-y-1">
                  {product.giftProducts.map((giftContainer) => {
                    const gift: ProductInterface = giftContainer.gift;
                    return (
                      <li key={gift.id}>
                        <ProductWidgets.giftItem gift={gift} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Miễn phí vận chuyển
                  </p>
                  <p className="text-sm text-gray-600">
                    Cho đơn hàng trên 500.000đ
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Bảo mật thanh toán
                  </p>
                  <p className="text-sm text-gray-600">100% được bảo mật</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Trả hàng</p>
                  <p className="text-sm text-gray-600">Chơi thử 15 ngày </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <span className="text-gray-600">Bạn cần giúp đỡ ?</span>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Phone className="w-4 h-4" />
                <span>Gọi điện trực tiếp (SDT)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">
                  Mô tả về sản phẩm
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditorClientWrapper jsonString={product.description} />
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Đánh giá của khách hàng
                  </h3>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Viết review về sản phẩm
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl font-bold">4.0</div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {renderRatingStars(4)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {product.ratingCount} reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Sample review */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderRatingStars(5)}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-sm text-gray-500">
                        Verified Purchase
                      </span>
                    </div>
                    <p className="text-gray-700">
                      Excellent product quality and fast shipping. Highly
                      recommended!
                    </p>
                    <p className="text-sm text-gray-500 mt-2">2 days ago</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                  Thông tin về giao hàng{" "}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Tiêu chuẩn giao hàng </h4>
                        <p className="text-sm text-gray-600">
                          3-5 ngày - Miễn phí vận chuyển với đơn hàng trên 500k
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Giao hàng nhanh</h4>
                        <p className="text-sm text-gray-600">
                          2-3 ngày - Phí 200k
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Giao vào ngày hôm sau</h4>
                        <p className="text-sm text-gray-600">
                          Đặt trước 3 giờ chiều - phí 400k
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <RotateCcw className="w-6 h-6 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Dễ dàng đổi trả</h4>
                        <p className="text-sm text-gray-600">
                          Với chính sách trả hàng trong 30 ngày .
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Chính sách bảo hành </h4>
                        <p className="text-sm text-gray-600">
                          Trung bình bảo hành 3 năm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
