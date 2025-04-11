"use client";
import {useEffect, useState} from "react";
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils";
import { ProductSize } from "@/types/ProjectInterface";
import { formatCurrency } from "@/utils/utils";



interface ProductSizeProps  {
    onChangeSize:(value:ProductSize)=>void
    productSizeOptions:ProductSize[]

}
export default function ProductSizeSelector(props:ProductSizeProps) {

    const {onChangeSize,productSizeOptions} = props;
    
  const [selectedId, setSelectedId] = useState<string>()
  
  const onSelectChangeSize = (value:ProductSize)=>{
    setSelectedId(value.sizeId)
    onChangeSize(value);
  }

  useEffect(()=>{
    if(productSizeOptions.length > 0 ){
      setSelectedId(productSizeOptions[0].sizeId);
      onChangeSize(productSizeOptions[0]);
    }
  },[])
  return (
    <div className="space-y-2">
      <p>
        <span className="text-blue-600">• Kích thước và màu sắc:</span>{" "}
        <span className="text-red-500 font-medium">Theo yêu cầu</span>
      </p>
      <div className="flex gap-4">
        {productSizeOptions.map((option) => (
          <button
            key={option.sizeId}
            onClick={() => onSelectChangeSize(option)}
            className={cn(
              "border rounded-md px-4 py-2 w-40 text-center transition duration-200",
              selectedId === option.sizeId
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-500"
            )}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              {selectedId === option.sizeId ? (
                <CheckCircle2 className="text-green-500 w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-gray-400 rounded-full" />
              )}
              <span className="font-medium">{option.size.name}</span>
            </div>
            <div className="text-red-600 font-semibold">{formatCurrency(option.price)}</div>
          </button>
        ))}
      </div>
    </div>
  )
}