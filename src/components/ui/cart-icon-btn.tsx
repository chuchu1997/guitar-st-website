/** @format */

"use client";

import { ShoppingBag } from "lucide-react";
import IconButton from "./icon-button";
import Link from "next/link";
import useCart from "@/hooks/use-cart";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartIconButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onMoveCart = () => {
    router.push("/gio-hang");
  };

  if (!isMounted) return null;

  return (
    <Link className="relative" href="/gio-hang">
      {cart.items.length > 0 && (
        <div
          className="h-5 w-5 absolute top-[-6px] bg-red-500 text-white rounded-full right-[-10px] text-sm font-semibold
            text-center
            ">
          {cart.items.length}
          {/* {productCart.reduce((total, item) => total + item.quantity, 0)} */}
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
