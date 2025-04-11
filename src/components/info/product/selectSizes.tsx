"use client";
import {useState} from "react";
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils";

type SizeOption = {
  id: string
  label: string
  price: string
}

const sizeOptions: SizeOption[] = [
  { id: "1", label: "1m6 x 2m", price: "15,500,000 ₫" },
  { id: "2", label: "1m8 x 2m", price: "16,400,000 ₫" },
  { id: "3", label: "2m x 2m", price: "17,400,000 ₫" },
]

interface ProductSizeProps  {
    onChangeSize:()=>void
}
export default function ProductSizeSelector(props:ProductSizeProps) {

    const {onChangeSize} = props;
    
  const [selectedId, setSelectedId] = useState<string>("1")

  return (
    <div className="space-y-2">
      <p>
        <span className="text-blue-600">• Kích thước và màu sắc:</span>{" "}
        <span className="text-red-500 font-medium">Theo yêu cầu</span>
      </p>
      <div className="flex gap-4">
        {sizeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={cn(
              "border rounded-md px-4 py-2 w-40 text-center transition duration-200",
              selectedId === option.id
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-500"
            )}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              {selectedId === option.id ? (
                <CheckCircle2 className="text-green-500 w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-gray-400 rounded-full" />
              )}
              <span className="font-medium">{option.label}</span>
            </div>
            <div className="text-red-600 font-semibold">{option.price}</div>
          </button>
        ))}
      </div>
    </div>
  )
}