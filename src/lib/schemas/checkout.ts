// lib/schemas/checkout.ts
import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Tên quá ngắn" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().min(5, { message: "Vui lòng nhập địa chỉ" }),
  addressDetails: z.string().min(2, { message: "Vui lòng nhập mô tả địa chỉ" }),
  note: z.string().optional(),
  paymentMethod: z.enum(["vietqr", "cod"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;