/** @format */
"use client";
import { Zap } from "lucide-react";
import { Badge } from "../badge";
import { useEffect, useState } from "react";
import { PromotionInterface } from "@/types/promotion";
import { FlashSaleCountDown } from "../Flashsale/flashsale-countdown";

interface propsFlashSaleBadge {
  promotion: PromotionInterface;
}

export const BadgeFlashSale = ({ promotion }: propsFlashSaleBadge) => {
  return (
    <>
      {new Date(promotion.endDate).getTime() > Date.now() && (
        <span>
          <Badge className="bg-[#fdf0f7] text-price text-sm font-semibold flex items-center">
            <Zap />
            <FlashSaleCountDown promotion={promotion} />
          </Badge>
        </span>
      )}
    </>
  );
};
