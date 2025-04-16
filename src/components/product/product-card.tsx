/** @format */
"use client";
import { Product } from "@/types/ProjectInterface";
import Image from "next/image";
import IconButton from "../ui/icon-button";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useCart } from "@/provider/cart-provider";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // Import motion từ framer-motion

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // State để theo dõi khi sản phẩm đã được thêm vào giỏ hàng
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddProductToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngừng sự kiện click lan ra ngoài
    setIsAdded(true); // Khi bấm thêm vào giỏ hàng, set state là true
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      quantity: 1,
    });

    // Reset lại trạng thái sau 1 giây để hiệu ứng animation có thể hoàn thành
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const router = useRouter();
  const moveDetailsProduct = () => {
    router.push(`/san-pham/thong-tin/${product.slug}`);
  };

  if (!isMounted) return null;

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl  p-3 space-y-4 relative"
      onClick={() => {
        moveDetailsProduct();
      }}>
      <div className="border rounded-lg p-3 md:p-4 h-full">
        <div className="aspect-square rounded-xl bg-gray-100 relative ">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="aspect-square object-cover rounded-md"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition absolute top-1/2 left-1/2 transform -translate-x-1/2  w-full  px-6 bottom-5 z-50">
          <div className="flex gap-x-6 justify-center">
            <motion.div
              initial={{ rotate: 1 }}
              animate={{ rotate: isAdded ? 1.3 : 1 }} // Khi sản phẩm được thêm vào, tạo hiệu ứng phóng to
              transition={{ type: "spring", stiffness: 300 }}>
              <IconButton
                onClick={handleAddProductToCart} // Chỉ gọi handleAddProductToCart khi bấm vào nút này
                icon={<ShoppingCartIcon size={20} />}
                className="text-gray-600"
              />
            </motion.div>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
            {product.name}
          </h3>
          <div className="text-base md:text-lg lg:text-xl font-bold text-red-500">
            {formatCurrency(product.price) ?? "Liên hệ"}
          </div>

          <div className="text-xs md:text-sm text-gray-500 line-through">
            GIA CU
          </div>

          <div className="text-xs md:text-sm text-green-500">GIA MOI</div>

          <div className="text-xs md:text-sm text-gray-500">
            Member giảm thêm
          </div>

          <div className="flex text-sm md:text-base">
            {Array.from({ length: product.ratingCount ?? 5 }).map((_, i) => (
              <span key={i} className="text-yellow-500">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
