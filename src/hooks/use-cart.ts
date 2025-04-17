import { Product } from "@/types/ProjectInterface";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
  stockQuantity: number;
  stock: number; // ĐÂY LÀ PHẦN STOCK ORIGIN CỦA PRODUCT
  isSelect?: boolean; // <== thêm vào đây

}

export interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelectItem:(id:string) =>void;
  cleanSelectedItems:()=>void

}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      toggleSelectItem: (id: string) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            return { ...item, isSelect: !item.isSelect };
          }
          return item;
        });
      
        set({ items: updatedItems });
      },
     
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existItem = currentItems.find((item) => item.id === data.id);

        if (existItem) {
          return toast("Sản phẩm đã tồn tại trong giỏ hàng!");
        }

        if (data.stockQuantity < 1) {
          return toast.error("Sản phẩm đã hết hàng!");
        }

        const newItem: CartItem = {
          ...data,
          stockQuantity: 1, // mặc định khi thêm vào là 1
          stock:data.stockQuantity
          ,
          isSelect:true
        };

        set({ items: [...currentItems, newItem] });
        toast.success("Đã thêm sản phẩm vào giỏ hàng");
      },

      removeItem: (id: string) => {
        const newItems = get().items.filter((item) => item.id !== id);
        set({ items: newItems });
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      },

      removeAll: () => {
        set({ items: [] });
      },

      updateQuantity: (id: string, quantity: number) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            if (quantity < 1) {
              toast.error("Số lượng tối thiểu là 1");
              return item;
            }

            if (quantity > item.stock) {
              toast.error(`Chỉ còn ${item.stock} sản phẩm trong kho`);
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
