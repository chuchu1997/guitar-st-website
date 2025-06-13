
import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { BadgePercent , Star , Info, Truck ,ShieldCheck , ChevronRight ,ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./productImageGallery";
interface propsProductMobile { 
    product:ProductInterface;

}
export default function ProductMobile({product}:propsProductMobile) {
  
  const StickyBottomActions = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
    <div className="flex gap-3">
      {/* Store Button */}
      <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-12 border border-gray-300 rounded-lg">
        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
        <span className="text-xs text-gray-600">Cửa hàng</span>
      </button>

      {/* Chat Button */}
      <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-12 border border-gray-300 rounded-lg">
        <div className="w-5 h-5 bg-gray-300 rounded mb-1"></div>
        <span className="text-xs text-gray-600">Thêm vào giỏ hàng</span>
      </button>

      {/* Buy Now Button */}
      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
        Mua Ngay
      </button>
    </div>
  </div>
);

  
    return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="mobile-product-version block md:hidden max-w-md mx-auto bg-white">
        <ProductImageGallery images={product.images} />
        {/* Product Info */}
        <div className="px-4 py-4 bg-white">
          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p className="text-2xl font-bold text-red-500 order-1">
                {FormatUtils.formatPriceVND(product.price)}
   
              </p>
              <BadgePercent size={18} className="text-red-500 order-3" />
              <p className="text-base font-medium text-gray-400 line-through order-2">
                {FormatUtils.formatPriceVND(product.originalPrice ?? 1000)}
              </p>
              
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="bg-red-100 text-red-600 rounded-md px-2 py-1 text-xs font-semibold order-4">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
            </div>
          </div>

          {/* Product Title */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-2">
              <Badge className="border-none py-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white text-xs flex-shrink-0">
                HÀNG VIỆT
              </Badge>
               <h1 className="text-lg font-medium text-gray-800 leading-6 line-clamp-3">
              {product.name}
            </h1>
            </div>
          
          
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">{product.ratingCount}</span>
              <span className="text-blue-500">(100K)</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="text-gray-600 flex items-center gap-1">
              <span>Bán</span>
              <span className="text-gray-900 font-semibold">200K</span>
              <span>trực tuyến</span>
              <Info size={14} className="text-gray-400" />
            </div>
          </div>

          <Separator />

          {/* Shipping Info */}
          <div className="py-3">
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-ship text-ship px-2 py-1 rounded text-xs font-semibold">
                    Miễn phí vận chuyển
                  </span>
                  <span className="text-gray-800 font-medium">Đảm bảo giao vào 14 tháng 6</span>
                </div>
                <p className="flex items-center gap-2 text-gray-600">
                  <span>Nhận voucher ít nhất 15K đ nếu đơn giao trễ</span>
                  <Info size={14} className="text-gray-400" />
                </p>
                <p className="text-gray-600">
                  Phí vận chuyển:
                  <span className="line-through ml-1">69.000đ</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Policy */}
          <div className="flex items-center py-3 gap-3">
            <ShieldCheck size={20} className="text-gray-500 flex-shrink-0" />
            <p className="text-gray-800 text-sm font-medium">
              Thanh toán khi giao - Trả hàng miễn phí trong 15 ngày
            </p>
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="py-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">
                Đánh giá của khách hàng (1000)
              </p>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span>Xem thêm</span>
                <ChevronRight size={16} />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-gray-900">5</span>
                <span className="text-sm text-gray-400">/5</span>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            {/* Sample Reviews */}
            <div className="space-y-3 pt-2">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    H
                  </div>
                  <span className="text-sm font-medium">Hương</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">Sản phẩm rất tốt, âm thanh trong, pin trâu. Giao hàng nhanh!</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Description */}
          <div className="py-3">
            <h3 className="font-semibold text-sm mb-2">Giới thiệu về sản phẩm này</h3>
            <p className="text-sm text-gray-600 leading-relaxed overflow-hidden">
              {product.description}
            </p>
            <button className="text-blue-500 text-sm mt-1 flex items-center gap-1">
              Xem thêm <ChevronDown size={14} />
            </button>
          </div>

          <Separator />

          {/* Suggested Products */}
          <div className="py-3 pb-20">
            <h3 className="font-semibold text-sm mb-3">Có thể bạn cũng thích</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src={`https://images.unsplash.com/photo-${item === 1 ? '1572635196184-84e35138cf62' : '1583394838701-5cd4b6b7f0c8'}?w=200&h=200&fit=crop`}
                      alt={`Product ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                      Sản phẩm tương tự chất lượng cao
                    </p>
                    <p className="text-sm font-bold text-red-500">
                      {FormatUtils.formatPriceVND(item === 1 ? 199000 : 249000)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <StickyBottomActions  />
      </div>
    </div>
  );
}