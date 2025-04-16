/** @format */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/provider/cart-provider";
import Image from "next/image";

const CheckoutClientPage = () => {
  const { productCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const total = productCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full md:w-4/5 mx-auto grid md:grid-cols-3 gap-6 p-6">
      {/* Shipping Info */}
      <Card className="md:col-span-2 p-4">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Thông tin nhận hàng</h2>
          <Input
            placeholder="Email"
            name="email"
            value={shippingInfo.email}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Họ và tên"
            name="name"
            value={shippingInfo.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Số điện thoại"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Tỉnh thành"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Quận huyện"
            name="district"
            value={shippingInfo.district}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Phường xã"
            name="ward"
            value={shippingInfo.ward}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Số nhà, tên đường"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
          />
          <textarea
            className="w-full border rounded-md p-2"
            name="note"
            placeholder="Ghi chú (tùy chọn)"
            value={shippingInfo.note}
            onChange={handleInputChange}
          />

          <h3 className="text-lg font-semibold">Thanh toán</h3>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4">
            {/* VietQR */}
            <div
              className={`p-4 border rounded-md transition-all ${
                paymentMethod === "bank"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="bank" value="bank" />
                <label htmlFor="bank" className="font-medium text-sm flex-1">
                  Chuyển khoản qua ngân hàng (VietQR)
                </label>
                <Image
                  src="/images/payment/vietqr.jpg"
                  alt="vietqr"
                  width={60}
                  height={20}
                />
              </div>
              {paymentMethod === "bank" && (
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>Scan mã VietQR tài khoản MB BANK của Siêu Tốc</p>
                  <p>
                    VietQR là nhận diện thương hiệu chung cho các dịch vụ thanh
                    toán, chuyển khoản bằng mã QR được xử lý qua mạng lưới Napas
                    do Ngân hàng Nhà nước Việt Nam ban hành.
                  </p>
                  <p>
                    Quý khách sẽ nhận SMS và email thông báo khi scan thanh toán
                    thành công.
                  </p>
                </div>
              )}
            </div>

            {/* COD */}
            <div
              className={`p-4 border rounded-md transition-all ${
                paymentMethod === "cod"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="cod" value="cod" />
                <label htmlFor="cod" className="font-medium text-sm flex-1">
                  Thanh toán khi giao hàng (COD)
                </label>
                <Image
                  src="/images/payment/cod.jpg"
                  alt="cod"
                  width={48}
                  height={24}
                />
              </div>
              {paymentMethod === "cod" && (
                <div className="mt-2 text-sm space-y-1">
                  <p className="text-gray-700">
                    TP. Hồ Chí Minh: Ưu tiên giao hàng không tiếp xúc.
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Hỗ trợ COD với đơn hàng giá trị &lt; 3.000.000đ.
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Đơn hàng ≥ 3.000.000đ hoặc có các sản phẩm Laptop, PC, Màn
                    hình, Ghế quý khách vui lòng chọn chuyển khoản.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Lưu ý: MemoryZone miễn phí đồng kiểm cho khách hàng.
                  </p>
                </div>
              )}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="p-4">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">
            Đơn hàng ({productCart.length} sản phẩm)
          </h2>
          {productCart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{item.name}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <p className="font-semibold text-green-600">
                {item.price.toLocaleString()} ₫
              </p>
            </div>
          ))}
          <hr />
          <div className="flex justify-between">
            <span>Tổng cộng</span>
            <span className="text-xl font-bold text-red-600">
              {total.toLocaleString()} ₫
            </span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            ĐẶT HÀNG
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutClientPage;
