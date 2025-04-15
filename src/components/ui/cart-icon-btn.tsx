/** @format */

"use client";

import { ShoppingBag } from "lucide-react";
import IconButton from "./icon-button";
import Link from "next/link";

const CartIconButton = () => {
  return (
    <Link className="relative" href="/gio-hang">
      <div
        className="h-5 w-5 absolute top-[-6px] bg-red-500 text-white rounded-full right-[-10px] text-sm font-semibold
            text-center
            ">
        1
      </div>
      <IconButton
        icon={
          <ShoppingBag
            size={12}
            onClick={() => {
              // onMoveCart();
            }}
          />
        }
      />
    </Link>
  );
};

export { CartIconButton };
