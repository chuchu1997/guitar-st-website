/** @format */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import useCart from "@/hooks/use-cart";
import { AddressSelectorWithSelect } from "@/components/AddressSelector";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import OrderType from "@/types/ProjectInterface";
import { onCreateOrderAPI } from "@/actions/create-order";
import { useRouter } from "next/navigation"; // Import useRouter từ next/router
import toast from "react-hot-toast";

// 🧩 Zod schema
const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Họ tên quá ngắn" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().min(5, { message: "Vui lòng nhập địa chỉ" }),
  note: z.string().optional(),
  paymentMethod: z.enum(["vietqr", "cod"]),
  addressDetails: z
    .string()
    .min(2, { message: "Vui lòng chọn địa chỉ đầy đủ" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const [cookies, setCookie] = useCookies(["customerID"]);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const selectedItems = cart.items.filter((item) => item.isSelect);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.stockQuantity,
    0
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
      paymentMethod: "cod",
      addressDetails: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const checkSessionIDInCookie = async (): Promise<string> => {
    let customerID = cookies.customerID;
  
    if (!customerID) {
      // Tạo mới customerID và gán cookie
      customerID = uuidv4();
      const tenYearsFromNow = new Date();
      tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
  
      setCookie("customerID", customerID, {
        path: "/",
        expires: tenYearsFromNow,
      });
  
      // Đợi cookie được set xong (delay nhẹ)
      await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay
    }
  
    return customerID;
  };
  const onSubmit = async (values: CheckoutFormValues) => {
    const address = values.address || "";
    const addressDetails = values.addressDetails || "";
    // Kết hợp address và addressDetails
    const fullAddress = `${address},${addressDetails}`.trim();
    values.address = fullAddress;
    const orderItems = selectedItems.map((item) => ({
      productId: item.id,
      quantity: item.stockQuantity,
    }));

    const customerID = await checkSessionIDInCookie(); // 👉 lấy giá trị mới


    const data: OrderType = {
      totalPrice: total,
      username: values.name,
      address: values.address,
      note: values.note ?? "",
      isPaid: false,
      phone: values.phone ?? "",
      paymentMethod: values.paymentMethod,
      customerID: customerID,
      orderItems: orderItems,
    };

    if (data.paymentMethod === "cod") {
      console.log("GOI COD");
      let res = await onCreateOrderAPI(data);
      toast.success("Đã đặt hàng thành công !!")
      if (res) {
 
        cart.cleanSelectedItems();
        setTimeout(() => {
          router.push("/gio-hang"); // Điều hướng người dùng đến trang giỏ hàng
        }, 1000); // 1000 ms = 1 giây
      }
      //GOI CREATE ORDER API
    } else if (data.paymentMethod === "vietqr") {
      //GOI API CHUYEN KHOAN
      console.log("GOI API CHUYEN KHOAN ");
    }

    // TODO: Call API to place order
  };

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Shipping Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin nhận hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Họ và tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressDetails"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AddressSelectorWithSelect
                      onChange={({ province, district, ward }) => {
                        if (!province || !district || !ward) {
                          // Trường hợp khi chưa chọn đầy đủ tỉnh/quận/phường
                          // Thêm validation nếu cần
                          form.setError("addressDetails", {
                            message: "Vui lòng chọn đầy đủ tỉnh/quận/phường.",
                          });
                        } else {
                          const address = `${ward?.name}, ${district?.name}, ${province?.name}`;
                          form.setValue("addressDetails", address);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số nhà (địa chỉ cụ thể)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ghi chú (tùy chọn)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Order + Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vietqr" id="vietqr" />
                          <Image
                            src="/images/payment/vietqr.jpg"
                            alt="VietQR"
                            width={40}
                            height={40}
                          />
                          <Label htmlFor="vietqr">
                            Chuyển khoản qua ngân hàng (VietQR)
                          </Label>
                        </div>
                        {field.value === "vietqr" && (
                          <div className="bg-gray-50 border mt-3 p-3 rounded-md text-sm text-muted-foreground">
                            <p>Scan mã VietQR tài khoản MB BANK của Siêu Tốc</p>
                            <p className="mt-2">
                              Bạn sẽ nhận được SMS & email khi thanh toán thành
                              công.
                            </p>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-4">
                          <RadioGroupItem value="cod" id="cod" />
                          <Image
                            src="/images/payment/cod.jpg"
                            alt="COD"
                            width={40}
                            height={40}
                          />
                          <Label htmlFor="cod">
                            Thanh toán khi giao hàng (COD)
                          </Label>
                        </div>
                        {field.value === "cod" && (
                          <div className="bg-gray-50 border mt-3 p-3 rounded-md text-sm text-muted-foreground">
                            <p>
                              Thanh toán trực tiếp cho nhân viên giao hàng khi
                              nhận hàng.
                            </p>
                          </div>
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Cart Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng ({selectedItems.length} sản phẩm)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 border-b pb-4 last:border-none">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString()} ₫ / sp
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Số lượng: {item.stockQuantity}</span>
                    <span>
                      Thành tiền:{" "}
                      <span className="font-semibold text-black">
                        {(item.price * item.stockQuantity).toLocaleString()} ₫
                      </span>
                    </span>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString()} ₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between text-base font-bold text-green-600">
                  <span>Tổng cộng</span>
                  <span>{total.toLocaleString()} ₫</span>
                </div>
              </div>

              <Button className="w-full mt-4" type="submit">
                Đặt hàng
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
