/** @format */

import { Zap } from "lucide-react";
import { Badge } from "../badge";

export const BadgeFlashSale = () => {
  return (
    <Badge className="bg-[#fdf0f7] text-price text-sm font-semibold flex items-center">
      <Zap />
      <span>11:33:22</span>
    </Badge>
  );
};
