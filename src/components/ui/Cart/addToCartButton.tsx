/** @format */
"use client";
import authApi from "@/api/auth";
import { UserCartAPI } from "@/api/cart/cart.api";
import { CartItemSSR } from "@/app/(routes)/gio-hang/components/cart";
import { ProductInterface } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

interface propsCart {
  product: ProductInterface;
  quantity?: number;
}
export const AddToCartButton = ({ product, quantity = 1 }: propsCart) => {
  const [cookies, setCookie] = useCookies(["userInfo"]);

  const createNewUserInfo = async () => {
    let res = await authApi.createGuestUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      productId: product.id,
      quantity,
    });

    if (res.status === 200) {
      let userInfo = res.data.userInfo;
      console.log("USER INFO", userInfo);
      setCookie("userInfo", { id: userInfo.id }, { path: "/" });
    }
  };

  const addNewItemToCart = async () => {
    const userID = cookies.userInfo.id;

    if (userID) {
      const res = await UserCartAPI.getAllCartItemsOfUser(userID);
      const currentItems = Array.isArray(res.data?.cart?.items)
        ? res.data.cart.items
        : [];

      // Tìm xem sản phẩm đã có trong giỏ chưa
      const existingIndex = currentItems.findIndex(
        (item: any) => item.product.id === product.id
      );

      let updatedItems: CartItemSSR[] = [];

      if (existingIndex !== -1) {
        // ✅ Nếu đã tồn tại, cập nhật quantity
        updatedItems = currentItems.map((item: any, index: number) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                isSelect: true,
              }
            : item
        );
      } else {
        // ✅ Nếu chưa có, thêm mới
        updatedItems = [
          ...currentItems,
          {
            isSelect: true,
            product,
            quantity,
          },
        ];
      }

      // Gửi dữ liệu lên server
      await UserCartAPI.updateCartItems(userID, res.data.cart.id, updatedItems);

      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    }
  };
  return (
    <button
      className="
    flex-1                      
    bg-black text-white 
    py-0 px-0                   
    sm:py-3 sm:px-6             
    rounded-lg font-semibold 
    text-sm sm:text-base        // nhỏ hơn ở mobile, bình thường ở sm trở lên
    hover:bg-gray-800 transition-colors 
    flex items-center justify-center space-x-2

  "
      onClick={async () => {
        const user = cookies["userInfo"];
        if (!user) {
          return await createNewUserInfo();
        } else {
          addNewItemToCart();
        }
      }}>
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>Thêm vào giỏ hàng</span>
    </button>
  );
};
