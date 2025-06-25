/** @format */

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  ShoppingBag,
  Edit3,
  User,
  Phone,
  MapPin as AddressIcon,
  FileText,
  X,
  Check,
} from "lucide-react";
import useCart from "@/hooks/use-cart";
import CustomerInfoLocalStorage from "@/utils/customer-info";
import { OrderSummary } from "./order-summary";
import { CustomerInfoModal } from "./customer-info-model";
import { CheckoutFormValues, checkoutSchema } from "@/lib/schemas/checkout";
import { CustomerData } from "@/types/checkout";
import toast from "react-hot-toast";
import { CartProduct } from "@/types/cart";
import { ProductInterface } from "@/types/product";
import { ProductAPI } from "@/api/products/product.api";

// Mock existing customer data - in real app, this would come from your user context/API

// Types

// Mock cart data

// Zod schema

// Format utilities

// Customer Info Card Component
const CustomerInfoCard = ({
  customerData,
  onEdit,
}: {
  customerData: any;
  onEdit: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-sm border mb-6">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Thông tin giao hàng
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
          <Edit3 className="h-4 w-4 mr-1" />
          Sửa
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">{customerData.name}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span>{customerData.phone}</span>
        </div>
        <div className="flex items-start text-gray-700">
          <AddressIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
          <div>
            <div>{customerData.address}</div>
            {customerData.addressDetails && (
              <div className="text-sm text-gray-600">
                {customerData.addressDetails}
              </div>
            )}
          </div>
        </div>
        {customerData.note && (
          <div className="flex items-start text-gray-700">
            <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <span className="text-sm">{customerData.note}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Cart Item Component

export default function CheckoutForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customerData, setCustomerData] = useState<CustomerData | undefined>();
  const [hasCustomerData, setHasCustomerData] = useState(true); // Set to false to test empty state
  const cart = useCart();

  const [productCarts, setProductCarts] = useState<CartProduct[]>([]);

  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const form = useForm({
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

  // Auto-fill form on desktop when customer data exists
  // useEffect(() => {
  //   if (hasCustomerData && customerData) {
  //     form.reset({
  //       name: customerData.name,
  //       phone: customerData.phone,
  //       address: customerData.address,
  //       addressDetails: customerData.addressDetails,
  //       note: "", // Note field is always empty for manual entry
  //       paymentMethod: "cod",
  //     });
  //   }
  // }, [customerData, hasCustomerData, form]);

  const loadUserInfo = () => {
    let customerInfo = CustomerInfoLocalStorage.getCustomer();
    if (customerInfo) {
      const payload = {
        name: "CUONG",
        phone: "phonebnumber",
        address: "123 Đường Lê Lợi, Quận 1",
        addressDetails: "Tầng 5, Tòa nhà ABC",
        note: "",
      };
      form.reset({
        ...payload,
      });
      setCustomerData(payload);
    }
  };
  useEffect(() => {
    loadUserInfo();
    fetchProductRelateWithCart();
    setIsMounted(true);
  }, []);

  const fetchProductRelateWithCart = async () => {
    const { items } = cart;
    const selectedItems = items.filter((item) => item.isSelect);
    const ids = selectedItems.map((item) => item.id);
    if (ids.length > 0) {
      const res = await ProductAPI.getProductByIDS(ids);
      const fetchedProducts: ProductInterface[] = res.data.products;
      const merged = fetchedProducts.map((product) => {
        const cartItem = items.find((item) => item.id === product.id);
        return {
          ...product,
          cartQuantity: cartItem?.stockQuantity || 1,
          isSelect: cartItem?.isSelect ?? true,
        };
      });
      setProductCarts(merged);

      setTotalQuantity(
        productCarts.reduce((acc, item) => {
          if (item.isSelect) {
            acc += item.cartQuantity || 0;
          }
          return acc;
        }, 0)
      );
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setCustomerData(value as CustomerData); // Cập nhật mỗi khi form thay đổi
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">Đặt hàng</h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingBag size={16} />
              <span>{totalQuantity} mặt hàng</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Desktop: Full Form */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Thông tin & địa chỉ đặt hàng
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tên của bạn *
                        </label>
                        <input
                          {...form.register("name")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nhập họ tên đầy đủ"
                        />
                        {form.formState.errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại *
                        </label>
                        <input
                          {...form.register("phone")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nhập số điện thoại"
                        />
                        {form.formState.errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ *
                      </label>
                      <input
                        {...form.register("address")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập địa chỉ"
                      />
                      {form.formState.errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {form.formState.errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả địa chỉ *
                      </label>
                      <input
                        {...form.register("addressDetails")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tầng, căn hộ, tòa nhà..."
                      />
                      {form.formState.errors.addressDetails && (
                        <p className="mt-1 text-sm text-red-600">
                          {form.formState.errors.addressDetails.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú đặc biệt (tùy chọn)
                      </label>
                      <textarea
                        {...form.register("note")}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ghi chú đặc biệt..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Customer Info Card or Add Button */}
            <div className="lg:hidden">
              {hasCustomerData && customerData ? (
                <CustomerInfoCard
                  customerData={customerData}
                  onEdit={() => setIsModalOpen(true)}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                  <div className="p-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors">
                      <MapPin className="h-5 w-5 mr-2" />
                      Thêm thông tin giao hàng
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Order Items */}
          </div>

          {/* Desktop Order Summary */}
          <div className="col-span-5">
            <OrderSummary
              cart={cart}
              items={productCarts}
              onCheckout={() => {
                const result = checkoutSchema.safeParse(customerData);
                if (!result.success) {
                  // Hiển thị thông báo lỗi ở đây (có thể dùng toast hoặc alert)

                  toast.error(
                    "Vui lòng nhập đầy đủ thông tin giao hàng trước khi đặt hàng (hoặc thông tin đang bị sai )"
                  );
                  return;
                }

                // console.log("ON CHECKOUT", customerData);
                // console.log("total", total);
                // console.log("selected items", selectedItems);
              }}
            />
          </div>
        </div>
      </div>

      {/* Customer Info Modal */}

      <CustomerInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          setCustomerData(data);
          form.reset({
            ...data,
          });
        }}
        initialData={customerData}
      />
    </div>
  );
}
