'use client'
import { Settings, HammerIcon, Container, BadgePercent, Truck, Handshake, PanelTopOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ProductDescriptionTable } from "@/components/product/ProductDescriptionTable";

export default function Sanpham({ params }: { params: { name: string } }) {
  // const { name } =  params;

  // Fetching data based on the dynamic route parameter
  // const res = await fetch(`https://api.example.com/product/${name}`, {
  //   cache: "no-store", // Ensures SSR fetch
  // });

  // if (!res.ok) {
  //   return <div>Failed to load product data.</div>;
  // }

  // const product = await res.json();

  return (
    <div className="container mx-auto p-4">
      {/* <nav className="text-sm text-gray-500 mb-4">
        <Link href="/">Trang chủ</Link> / <Link href="/san-pham">Sản phẩm</Link> / <Link href="/san-pham/noi-that-phong-ngu">Nội thất phòng ngủ</Link> / <Link href="/san-pham/tu-quan-ao">Tủ quần áo</Link> / Tủ quần áo cánh kính kịch trần - TAK08
      </nav> */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <Image
            src="/images/maynenkhi/1.png"
            alt="Tủ quần áo cánh kính kịch trần - TAK08"
            width={500}
            height={500}
            className="rounded-lg"
          />
          <div className="flex mt-2 space-x-2">
            <Image
              src="/images/maynenkhi/1.png"
              alt="Thumbnail"
              width={100}
              height={100}
              className="rounded-lg border border-gray-300"
            />
            <Image
              src="/images/maynenkhi/1.png"
              alt="Thumbnail"
              width={100}
              height={100}
              className="rounded-lg border border-gray-300"
            />
            <Image
              src="/images/maynenkhi/1.png"
              alt="Thumbnail"
              width={100}
              height={100}
              className="rounded-lg border border-gray-300"
            />
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-8 mt-4 lg:mt-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Tủ quần áo cánh kính kịch trần - TAK08</h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-500">Nhà sản xuất: Nội Thất CaCo – Mã SKU: TAK08</p>
          <p className="text-sm md:text-base lg:text-lg text-gray-500">Chất liệu: Gỗ MDF Phủ melamine Phối Hợp Cánh Kính Nhôm Cao Cấp</p>
          <p className="text-sm md:text-base lg:text-lg text-gray-500">Danh mục: <Link href="/san-pham/noi-that-phong-ngu" className="text-blue-500">Nội thất phòng ngủ</Link> / <Link href="/san-pham/tu-quan-ao" className="text-blue-500">Tủ quần áo</Link> / <Link href="/san-pham/tu-quan-ao-canh-kinh" className="text-blue-500">Tủ quần áo cánh kính</Link></p>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-red-500 mt-4">18,252,000 ₫ <span className="line-through text-gray-500">20,000,000 ₫</span> <span className="text-green-500">-9%</span></div>
          <p className="text-sm md:text-base lg:text-lg text-gray-500">Bạn tiết kiệm được 1,748,000 ₫</p>
          <div className="mt-4">
            <label className="block text-sm md:text-base lg:text-lg text-gray-700">Kích thước và màu sắc:</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="size" value="1m8 x 2m6" className="form-radio" />
                <span>1m8 x 2m6</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="size" value="2m x 2m6" className="form-radio" />
                <span>2m x 2m6</span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <label className="block text-sm md:text-base lg:text-lg text-gray-700">Số lượng:</label>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border rounded">-</button>
              <Input type="text" value="1" className="w-12 text-center border rounded" />
              <button className="px-2 py-1 border rounded">+</button>
            </div>
          </div>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Mua ngay</button>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-orange-500">TƯ VẤN</h2>
            <p className="text-lg font-bold text-orange-500">Gọi 0987.822.944 để được tư vấn hoặc yêu cầu CaCo gọi lại</p>
            <Input type="text" placeholder="Số điện thoại" className="mt-2 p-2 border rounded w-full" />
            <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded w-full">GỬI TƯ VẤN</button>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6  p-4 rounded-2xl shadow-2xl shadow-white-500/50">
  
  
  
  <div className="flex flex-col items-center">
    <Settings size={50} />
    <p className="mt-2 text-center text-base font-semibold">THIẾT KẾ</p>
    <p className="text-center text-sm">Miễn phí thiết kế</p>
  </div>
  <div className="flex flex-col items-center">
    <Container size={50} />
    <p className="mt-2 text-center text-base font-semibold">CHẤT LIỆU</p>
    <p className="text-center text-sm">Đa dạng chất liệu</p>
  </div>
  <div className="flex flex-col items-center">
    <HammerIcon size={50} />
    <p className="mt-2 text-center text-base font-semibold">SẢN XUẤT THEO YÊU CẦU</p>
    <p className="text-center text-sm">Caco trực tiếp sản xuất</p>
  </div>
  <div className="flex flex-col items-center">
    <BadgePercent size={50} />
    <p className="mt-2 text-center text-base font-semibold">TRẢ GÓP %</p>
    <p className="text-center text-sm">Thủ tục đơn giản</p>
  </div>
  <div className="flex flex-col items-center">
    <Truck size={50} />
    <p className="mt-2 text-center text-base font-semibold">MIỄN PHÍ</p>
    <p className="text-center text-sm">Miễn phí vận chuyển và lắp đặt HCM đơn hàng trên 10tr</p>
  </div>
  <div className="flex flex-col items-center">
    <Handshake size={50} />
    <p className="mt-2 text-center text-base font-semibold">BẢO HÀNH</p>
    <p className="text-center text-sm">Sản phẩm bảo hành 2 năm, bảo trì vĩnh viễn</p>
  </div>
</div>





        <div className = "product-description mt-8 p-4 rounded-2xl shadow-2xl shadow-white-500/50 flex flex-col gap-4">
          <div className = "flex items-end gap-2">
            <PanelTopOpen size ={30}/>
            <span className = "uppercase font-semibold text-xl italic">chi tiết sản phẩm</span>
          </div>
          <div className = "product-table">

            <h4 className = "text-lg">Tóm tắt sơ lược về sản phẩm </h4>
            <ProductDescriptionTable/>
          </div>


        </div>

    </div>
  );
}