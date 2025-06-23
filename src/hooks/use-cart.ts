import { CartItemType } from "@/types/cart";
import { ProductInterface } from "@/types/product";
import { Product } from "@/types/ProjectInterface";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export interface CartStore {
  items: CartItemType[];
  addItem: (data: ProductInterface) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleSelectItem:(id:number) =>void;
  cleanSelectedItems:()=>void

}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      toggleSelectItem: (id: number) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            return { ...item, isSelect: !item.isSelect };
          }
          return item;
        });
      
        set({ items: updatedItems });
      },
     
      addItem: (data: ProductInterface) => {
        const currentItems = get().items;
        const existItem = currentItems.find((item) => item.id === data.id);

        if (existItem) {
          return toast("Sản phẩm đã tồn tại trong giỏ hàng!");
        }

        if (data.stock < 1) {
          return toast.error("Sản phẩm đã hết hàng!");
        }

        const newItem: CartItemType = {
          ...data,
          stockAvailable:data.stock,
          stockQuantity: 1, // mặc định khi thêm vào là 1
          isSelect:true
        };

        set({ items: [...currentItems, newItem] });
        toast.success("Đã thêm sản phẩm vào giỏ hàng");
      },

      removeItem: (id: number) => {
        const newItems = get().items.filter((item) => item.id !== id);
        set({ items: newItems });
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      },

      removeAll: () => {
        set({ items: [] });
      },

      updateQuantity: (id: number, quantity: number) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            if (quantity < 1) {
              toast.error("Số lượng tối thiểu là 1");
              return item;
            }

            if (quantity > item.stockAvailable) {
              toast.error(`Chỉ còn ${item.stockQuantity} sản phẩm trong kho`);
              return item;
            }

            return { ...item, stockQuantity: quantity };
          }
          return item;
        });

        set({ items: updatedItems });
      },
      cleanSelectedItems:()=>{
        /// XÓA CÁC ITEM ĐƯỢC SELECT KHI NGƯỜI DÙNG ĐÃ ĐẶT HÀNG THÀNH CÔNG !!!!
        const remainingItems = get().items.filter((item) => !item.isSelect);
        set({ items: remainingItems });
      }
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
