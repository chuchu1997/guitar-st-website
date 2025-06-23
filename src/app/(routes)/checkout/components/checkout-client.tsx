

"use client"
import { useEffect, useState } from "react";
import { z } from "zod";
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
  Check
} from "lucide-react";
import useCart from "@/hooks/use-cart";
import { CartItem } from "../../gio-hang/components/cart-item";

// Mock existing customer data - in real app, this would come from your user context/API
const EXISTING_CUSTOMER_DATA = {
  name: "Nguyễn Văn An",
  phone: "0901234567",
  address: "123 Đường Lê Lợi, Quận 1",
  addressDetails: "Tầng 5, Tòa nhà ABC",
  note: ""
};

// Types
interface CartImage {
  url: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  isSelect: boolean;
  images: CartImage[];
}

// Mock cart data


// Zod schema
const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Tên quá ngắn" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().min(5, { message: "Vui lòng nhập địa chỉ" }),
  note: z.string().optional(),
  paymentMethod: z.enum(["vietqr", "cod"]),
  addressDetails: z.string().min(2, { message: "Vui lòng nhập mô tả địa chỉ" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Format utilities
const FormatUtils = {
  formatPriceVND: (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
};

// Customer Info Card Component
const CustomerInfoCard = ({ customerData, onEdit }: { customerData: any, onEdit: () => void }) => (
  <div className="bg-white rounded-lg shadow-sm border mb-6">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Thông tin giao hàng</h2>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
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
              <div className="text-sm text-gray-600">{customerData.addressDetails}</div>
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

// Customer Info Modal Component
const CustomerInfoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSave: (data: any) => void,
  initialData?: any 
}) => {
  const modalForm = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: initialData || {
      name: "",
      phone: "",
      address: "",
      note: "",
      paymentMethod: "cod",
      addressDetails: "",
    },
  });

  const handleSave = (data: CheckoutFormValues) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên của bạn *
            </label>
            <input
              {...modalForm.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ tên đầy đủ"
            />
            {modalForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {typeof modalForm.formState.errors.name?.message === "string"
                  ? modalForm.formState.errors.name.message
                  : null}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại *
            </label>
            <input
              {...modalForm.register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
            {modalForm.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {typeof modalForm.formState.errors.phone?.message === "string"
                  ? modalForm.formState.errors.phone.message
                  : null}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ *
            </label>
            <input
              {...modalForm.register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập địa chỉ"
            />
            {modalForm.formState.errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {typeof modalForm.formState.errors.address?.message === "string"
                  ? modalForm.formState.errors.address.message
                  : null}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả địa chỉ *
            </label>
            <input
              {...modalForm.register("addressDetails")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tầng, căn hộ, tòa nhà..."
            />
            {modalForm.formState.errors.addressDetails && (
              <p className="mt-1 text-sm text-red-600">
                {typeof modalForm.formState.errors.addressDetails?.message === "string"
                  ? modalForm.formState.errors.addressDetails.message
                  : null}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              {...modalForm.register("note")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ghi chú đặc biệt..."
            />
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={modalForm.handleSubmit(handleSave)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component


export default function CheckoutForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState(EXISTING_CUSTOMER_DATA);
  const [hasCustomerData, setHasCustomerData] = useState(true); // Set to false to test empty state
  const cart = useCart();


  const selectedItems = cart.items.filter(item => item.isSelect);
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.stockQuantity, 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + item.stockQuantity, 0);

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
  useEffect(() => {
    if (hasCustomerData && customerData) {
      form.reset({
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
        addressDetails: customerData.addressDetails,
        note: "", // Note field is always empty for manual entry
        paymentMethod: "cod",
      });
    }
  }, [customerData, hasCustomerData, form]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: CheckoutFormValues) => {
    console.log("Order submitted:", values);
    // Handle order submission
    alert("Đơn hàng đã được gửi thành công!");
  };

  const handleSaveCustomerData = (data: CheckoutFormValues) => {
    // setCustomerData(data);
    setHasCustomerData(true);
  };

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
              <span>{totalItems} mặt hàng</span>
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
                      className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Thêm thông tin giao hàng
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Order Items */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm border mb-20">
              <div className="p-4">
                <button
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    Tóm tắt đơn hàng
                  </h2>
                  <span className="text-sm text-gray-600">
                    {showOrderSummary ? "−" : "+"} {totalItems} sản phẩm
                  </span>
                </button>

                {showOrderSummary && (
                  <div className="mt-4 space-y-2">
                    {selectedItems.map((product) => (
                      <CartItem key={product.id} product={product} cart = {cart} isShowDelete = {false} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-2 mb-6">
                  {selectedItems.map((product) => (
                      <CartItem key={product.id} product={product} cart = {cart} isShowDelete = {false} />
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Tổng tiền tạm tính ({totalItems} sản phẩm)
                    </span>
                    <span className="text-sm font-medium">
                      {FormatUtils.formatPriceVND(total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Giao hàng</span>
                    <span className="text-sm font-medium text-green-600">
                      Miễn phí
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                    <span>Tổng tiền</span>
                    <span className="text-red-600">
                      {FormatUtils.formatPriceVND(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors mt-6"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">
              Tổng {totalItems} sản phẩm:{" "}
              <span className="font-semibold text-red-600">
                {FormatUtils.formatPriceVND(total)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (hasCustomerData) {
                // Create form data from customer data for submission
                const formData = {
                  ...customerData,
                  paymentMethod: "cod" as const
                };
                onSubmit(formData);
              } else {
                setIsModalOpen(true);
              }
            }}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            {hasCustomerData ? "Đặt hàng" : "Thêm thông tin & đặt hàng"}
          </button>
        </div>
      </div>

      {/* Customer Info Modal */}
      <CustomerInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomerData}
        initialData={hasCustomerData ? customerData : undefined}
      />
    </div>
  );
}