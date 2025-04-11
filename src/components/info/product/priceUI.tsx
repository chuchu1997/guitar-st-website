"use client"
import { formatCurrency } from "@/utils/utils"
import { useEffect, useState } from "react"

type ProductPriceBoxProps = {
  originalPrice: number
  salePrice: number
  warranty?: string
  flashSaleEndsInSeconds?: number // ví dụ: 54000 = 15h
}



function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h : ${m.toString().padStart(2, "0")}m : ${s
    .toString()
    .padStart(2, "0")}s`
}

export default function ProductPriceBox({
  originalPrice,
  salePrice,
  warranty = "12 tháng",
  flashSaleEndsInSeconds = 54000,
}: ProductPriceBoxProps) {
  const [timeLeft, setTimeLeft] = useState(flashSaleEndsInSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const discountPercent = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  )
  const savedAmount = originalPrice - salePrice

  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-3 border border-gray-200">
      {/* Flash Sale Tag */}
      <div className="flex items-center justify-between bg-amber-100 text-sm px-3 py-2 rounded-md text-gray-800">
        <div className="font-semibold flex items-center gap-1 text-orange-500">
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold">
            FLASH SALE ⚡
          </span>
        </div>
        <div className="text-sm text-gray-700 italic">
          Kết thúc sau:{" "}
          <span className="font-semibold text-gray-900">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Giá */}
      <div className="text-3xl font-bold text-orange-500 italic">
        {formatCurrency(salePrice)}
      </div>
      <div className="flex items-center gap-2">
        <span className="line-through text-gray-400 text-base">
          {formatCurrency(originalPrice)}
        </span>
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discountPercent}%
        </span>
      </div>

      {/* Tiết kiệm */}
      <div className="text-sm text-gray-700">
        Bạn tiết kiệm được{" "}
        <span className="font-semibold text-gray-900">
          {formatCurrency(savedAmount)}
        </span>
      </div>

      {/* Bảo hành */}
      <div>
        <button className="bg-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-blue-600 transition">
          Bảo hành từ {warranty}
        </button>
      </div>
    </div>
  )
}