import { ProductInterface } from "./product";
import { ProductPromotion, PromotionInterface } from "./promotion";



interface CartImage {
  url: string;
}

export interface CartItemType {
  id: number;
  stockQuantity: number;
  isSelect: boolean;
  
}
export interface CartTotals {
  totalItems: number;
  totalPrice: number;
}

export interface CartProduct extends ProductInterface {
  cartQuantity: number;
  isSelect: boolean;
}