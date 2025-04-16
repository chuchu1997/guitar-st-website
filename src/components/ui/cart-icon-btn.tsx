/** @format */

"use client";

import { ShoppingBag } from "lucide-react";
import IconButton from "./icon-button";
import Link from "next/link";
import { useCart } from "@/provider/cart-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartIconButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const { productCart } = useCart(); // Get cart data and functions
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onMoveCart = () => {
    router.push("/gio-hang");
  };
  useEffect(() => {}, [productCart]);
  if (!isMounted) return null;

  return (
    <Link className="relative" href="/gio-hang">
      {productCart.length > 0 && (
        <div
          className="h-5 w-5 absolute top-[-6px] bg-red-500 text-white rounded-full right-[-10px] text-sm font-semibold
            text-center
            ">
          {productCart.reduce((total, item) => total + item.quantity, 0)}
        </div>
      )}
      <IconButton
        icon={
          <ShoppingBag
            size={12}
            onClick={() => {
              onMoveCart();
            }}
          />
        }
      />
    </Link>
  );
};

export { CartIconButton };
