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
    <div className="w-full overflow-x-auto px-4 py-2">
      <ToggleGroup
        type="single"
        className="w-max min-w-full flex-nowrap flex justify-start md:justify-center gap-3">
        {[
          {
            value: "a",
            label: "Thông tin sản phẩm",
            target: "product-description",
          },
          { value: "b", label: "Đánh giá và bình luận", target: "comments" },
          {
            value: "c",
            label: "Gợi ý sản phẩm tương tự",
            target: "products-suggest",
          },
        ].map(({ value, label, target }) => (
          <ToggleGroupItem
            key={value}
            className={`
            px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
            ${
              selected === value
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }
            hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm border
          `}
            value={value}
            onClick={() => handleScrollTo(target, value)}>
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupComponent;
