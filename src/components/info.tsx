/** @format */

import { Product, Service } from "@/types/ProjectInterface";
import CurrencyComponent from "./currencyComponent";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import LexicalViewer from "./LoadLexicalJsonString";

interface InfoProps {
  data: Product | Service;
  isProduct?: boolean;
}

const Info: React.FC<InfoProps> = ({ data, isProduct = true }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <CurrencyComponent price={data.price}></CurrencyComponent>
      </div>

      <hr className="my-4" />

      <div className="mt-10 flex items-center gap-x-3">
        {isProduct ? (
          <div>
            <Button className="flex items-center gap-x-2">
              Thêm vào giỏ hàng
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Button className="flex items-center gap-x-2">
              Đặt lịch hay gì đó
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
