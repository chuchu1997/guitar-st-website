/** @format */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import { AddressSelectorWithSelect } from "@/components/AddressSelector";
export default function CheckoutForm() {
  const [selected, setSelected] = useState("vietqr");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const cart = useCart();
  const selectedItems = cart.items.filter((item) => item.isSelect);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.stockQuantity,
    0
  );
  if (!isMounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Shipping Information */}
      <Card className="md:col-span-2">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Thông tin nhận hàng</h2>
          <div className="col-span-2 flex flex-col gap-4">
            <Input placeholder="Email" />
            <Input placeholder="Họ và tên" />
            <Input placeholder="Số điện thoại" />
            <AddressSelectorWithSelect
              onChange={({ province, district, ward }) => {
                console.log(
                  "Địa chỉ:",
                  province?.name,
                  district?.name,
                  ward?.name
                );
              }}
            />{" "}
            <Input placeholder="Số nhà, tên đường" className="col-span-2" />
            <Textarea placeholder="Ghi chú (tùy chọn)" className="col-span-2" />
          </div>
        </CardContent>
      </Card>

      {/* Order Summary + Payment */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Thanh toán</h2>
            <RadioGroup
              value={selected}
              onValueChange={(value) => setSelected(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vietqr" id="vietqr" />
                <Image
                  src="/images/payment/vietqr.jpg"
                  alt="COD"
                  width={40}
                  height={40}
                />

                <Label htmlFor="vietqr">
                  Chuyển khoản qua ngân hàng (VietQR)
                </Label>
              </div>
              {selected === "vietqr" && (
                <div className="bg-gray-50 border-t mt-3 px-4 py-3 text-sm rounded-b-md text-gray-600">
                  <p>Scan mã VietQR tài khoản MB BANK của Siêu Tốc</p>
                  <p className="mt-2">
                    VietQR là nhãn hiệu chung cho các dịch vụ thanh toán bằng mã
                    QR do Napas và ngân hàng phát hành.
                  </p>
                  <p className="mt-2">
                    Quý khách sẽ nhận SMS và email thông báo khi scan thanh toán
                    thành công.
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Image
                  src="/images/payment/cod.jpg"
                  alt="COD"
                  width={40}
                  height={40}
                />

                <Label htmlFor="cod">Thanh toán khi giao hàng (COD)</Label>
              </div>
              {selected === "cod" && (
                <div className="bg-gray-50 border-t mt-3 px-4 py-3 text-sm rounded-b-md text-gray-600">
                  <p>
                    Thanh toán trực tiếp cho nhân viên giao hàng khi nhận hàng.
                  </p>
                  <p className="mt-2">
                    Vui lòng chuẩn bị đúng số tiền để việc giao hàng nhanh chóng
                    hơn.
                  </p>
                </div>
              )}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Đơn hàng ({selectedItems.length} sản phẩm)
            </h2>

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

            <div className="space-y-2 pt-2 border-t">
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

            <Button className="w-full mt-4" type="button">
              Đặt hàng
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
