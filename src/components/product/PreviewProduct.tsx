import { Product } from "@/types/ProjectInterface";
import Image from "next/image"
import Link from "next/link";



interface PreviewProductProps  { 
    data:Product
}

const PreviewProductComponent = (props:PreviewProductProps) => {

    const {data} = props;
 
    return (
        <Link
            href={`/san-pham/${data.slug}`}
            className="w-full flex-shrink-0 cursor-pointer"
        >
            <div className="border rounded-lg p-3 md:p-4 h-full">
                <div className="relative h-40 md:h-44 lg:h-48 mb-3 md:mb-4">
                    <Image
                        src={data.images[0].url}
                        alt={data.name}
                        fill
                        className="object-contain rounded-md"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      
                    />
                </div>
                <div className="space-y-1 md:space-y-2">
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
                        {data.name}
                    </h3>
                    <div className="text-base md:text-lg lg:text-xl font-bold text-red-500">
                        {data.price ?? 'Liên hệ'}
                    </div>
                    {/* {productPreview.oldPrice && (
                        <div className="text-xs md:text-sm text-gray-500 line-through">
                            {productPreview.oldPrice}
                        </div>
                    )}
                    {productPreview.discount && (
                        <div className="text-xs md:text-sm text-green-500">
                            {productPreview.discount}
                        </div>
                    )}
                    <div className="text-xs md:text-sm text-gray-500">
                        Member giảm thêm {productPreview.memberDiscount}
                    </div> */}
                    {/* {productPreview.studentDiscount && (
                        <div className="text-xs md:text-sm text-gray-500">
                            S-Student giảm thêm {productPreview.studentDiscount}
                        </div>
                    )} */}
                    <div className="flex text-sm md:text-base">
                        {Array.from({ length: data.ratingCount ?? 5 }).map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}  

export default PreviewProductComponent;

