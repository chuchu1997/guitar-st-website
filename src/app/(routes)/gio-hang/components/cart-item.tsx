/** @format */

import { CartStore } from "@/hooks/use-cart";
import { CartItemType } from "@/types/cart";
import { FormatUtils } from "@/utils/format";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItem({
  product,
  cart,
  isShowDelete = true,
}: {
  product: CartItemType;
  cart: CartStore;
  isShowDelete?: boolean;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="mt-4">
            <div className="text-sm font-semibold text-price">
              {FormatUtils.formatPriceVND(
                product.price * product.stockQuantity
              )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">
                {FormatUtils.formatPriceVND(product.originalPrice)}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                cart.updateQuantity(product.id, product.stockQuantity - 1)
              }
              disabled={product.stockQuantity === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <Minus size={14} />
            </button>

            <span className="text-sm font-medium min-w-8 text-center">
              {product.stockQuantity}
            </span>

            <button
              onClick={() =>
                cart.updateQuantity(product.id, product.stockQuantity + 1)
              }
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50">
              <Plus size={14} />
            </button>
          </div>
        </div>
        {isShowDelete && (
          <div className="flex items-center justify-end mt-4 ">
            <button
              onClick={() => cart.removeItem(product.id)}
              className="cursor-pointer text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
              <Trash2 size={16} />
              <span className="text-sm">Xóa</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
