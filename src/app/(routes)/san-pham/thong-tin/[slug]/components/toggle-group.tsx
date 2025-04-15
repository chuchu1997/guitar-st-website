/** @format */

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

const ToggleGroupComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selected, setSelected] = useState<string>("a");

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleScrollTo = (id: string, value: string) => {
    setSelected(value);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isMounted) return <>Chưa có dữ liệu</>;

  return (
    <ToggleGroup type="single" className="w-full justify-center gap-2">
      <ToggleGroupItem
        className={`${selected === "a" ? "bg-orange-500 text-white" : ""} 
                  hover:bg-orange-600 hover:text-white transition-all duration-300`}
        value="a"
        onClick={() => {
          handleScrollTo("product-description", "a");
        }}>
        Thông tin sản phẩm
      </ToggleGroupItem>

      <ToggleGroupItem
        className={`${selected === "b" ? "bg-orange-500 text-white" : ""} 
                  hover:bg-orange-600 hover:text-white transition-all duration-300`}
        value="b"
        onClick={() => {
          handleScrollTo("comments", "b");
        }}>
        Đánh giá và bình luận
      </ToggleGroupItem>

      <ToggleGroupItem
        className={`${selected === "c" ? "bg-orange-500 text-white" : ""} 
                  hover:bg-orange-600 hover:text-white transition-all duration-300`}
        value="c"
        onClick={() => {
          handleScrollTo("products-suggest", "c");
        }}>
        Gợi ý sản phẩm tương tự
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleGroupComponent;
