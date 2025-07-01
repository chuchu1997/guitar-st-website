/** @format */

import { ProductInterface } from "./product";
import { discountTypeEnum } from "./promotion";

export interface PaymentInterface {
  method: "COD" | "BANK_TRANSFER";
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED";

  isPaid: boolean; // TRẠNG THÁI THANNH TOÁN

  bankName?: string;
  transactionId?: number; // ID GIAO DICH

  payerName?: string; // ten nguoi chuyen khoan
}

export interface CreateOrderInterface {
  userId: number;
  storeId: number;
  address: string;
  total: number;
  items: OrderItem[];
  payment: PaymentInterface;
}

export interface OrderItem {
  productId: number;
  unitPrice: number; //GIÁ TẠI THỜI ĐIỂM ÁP DỤNG VOUCHER
  subtotal: number; // TỔNG TIỀN CHO SẢN PHẨM NÀY

  discountType?: discountTypeEnum;
  discountValue?: number;
  giftItems?: OrderGiftItemDto[];

  quantity: number; // TỔNG SỐ LƯỢNG
}

interface OrderGiftItemDto {
  giftName: string;
  giftImage: string;
  giftQuantity: number;
}

export type OrderStatus = "ORDERED" | "SHIPPING" | "COMPLETED" | "CANCELED";

export interface OrderInterface {
  id: number;
  userId: number;
  storeId: number;

  address: string;

  status: OrderStatus;
  total: number;
  trackingNumber?: number; // MÃ VẬN ĐƠN

  items: OrderItemDetail[]; // Gồm cả giftItems và thông tin sản phẩm

  note?: string;
  payment?: PaymentInterface;

  createdAt: string;
  updatedAt: string;
}

export interface OrderItemDetail {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;

  promotionName?: string;
  discountType?: discountTypeEnum;
  discountValue?: number;

  giftItems?: OrderGiftItemDto[];

  product: ProductInterface;
}
