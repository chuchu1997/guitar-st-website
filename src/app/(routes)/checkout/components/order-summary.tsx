/** @format */

// components/checkout/OrderSummary.tsx
// import { CartItem as CartItemType, CartTotals } from '@/types/checkout';

import { CartItemType, CartProduct, CartTotals } from "@/types/cart";
import { CartItem } from "../../gio-hang/components/cart-item";
import { FormatUtils } from "@/utils/format";
import { CartStore } from "@/hooks/use-cart";
import { RenderGiftItems } from "@/components/ui/product/product-card";
import { Separator } from "@radix-ui/react-separator";
import { discountTypeEnum } from "@/types/promotion";
interface OrderSummaryProps {
  items: CartProduct[];
  onCheckout: () => void;
  isLoading?: boolean;
  cart: CartStore;
}

export const OrderSummary = ({
  items,
  onCheckout,
  isLoading = false,
  cart,
}: OrderSummaryProps) => {
  const getDiscountedPrice = (item: CartProduct) => {
    const promotion = item.promotionProducts?.[0];
    if (!promotion) return item.price;

    if (promotion.discountType === discountTypeEnum.PERCENT) {
      return item.price * (1 - promotion.discount / 100);
    }

    return item.price - promotion.discount;
  };

  const totals = items.reduce(
    (acc, item) => {
      const price = getDiscountedPrice(item); // 👉 dùng hàm khuyến mãi
      const quantity = item.cartQuantity;
      acc.totalPrice += price * quantity;
      acc.totalQuantity += quantity;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );
  return (
    <div className="bg-white rounded-lg shadow-sm border sticky top-24 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tóm tắt đơn hàng
        </h2>

        <div className="mb-6">
          {items.map((item, index) => (
            <div key={item.id}>
              <CartItem
                className="py-2"
                product={item}
                cart={cart}
                isShowDelete={false}
                onUpdateQuantity={() => {}}
                hiddenUpdateQuantity={true}
              />
              {index < items.length - 1 && (
                <hr className="border-t border-gray-200 my-2" />
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Tổng tiền tạm tính ({totals.totalQuantity} sản phẩm)
            </span>
            <span className="text-sm font-medium">
              {FormatUtils.formatPriceVND(totals.totalPrice)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Giao hàng</span>
            <span className="text-sm font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
            <span>Tổng tiền</span>
            <span className="text-red-600">
              {FormatUtils.formatPriceVND(totals.totalPrice)}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6">
          {isLoading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};
