/** @format */

import { Product } from "@/types/ProjectInterface";
import CurrencyComponent from "./currencyComponent";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <CurrencyComponent price={data.price}></CurrencyComponent>
      </div>

      <hr className="my-4" />

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">
          day la description :{data.description}
        </h3>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add to cart
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Info;
