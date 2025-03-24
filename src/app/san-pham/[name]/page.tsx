import Image from "next/image";
import Link from "next/link";

export default async function Sanpham({ params }: { params: { name: string } }) {
  const { name } = params;

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
          <h1 className="text-2xl font-bold">Tủ quần áo cánh kính kịch trần - TAK08</h1>
          <p className="text-gray-500">Nhà sản xuất: Nội Thất CaCo – Mã SKU: TAK08</p>
          <p className="text-gray-500">Chất liệu: Gỗ MDF Phủ melamine Phối Hợp Cánh Kính Nhôm Cao Cấp</p>
          <p className="text-gray-500">Danh mục: <Link href="/san-pham/noi-that-phong-ngu" className="text-blue-500">Nội thất phòng ngủ</Link> / <Link href="/san-pham/tu-quan-ao" className="text-blue-500">Tủ quần áo</Link> / <Link href="/san-pham/tu-quan-ao-canh-kinh" className="text-blue-500">Tủ quần áo cánh kính</Link></p>
          <div className="text-3xl font-bold text-red-500 mt-4">18,252,000 ₫ <span className="line-through text-gray-500">20,000,000 ₫</span> <span className="text-green-500">-9%</span></div>
          <p className="text-gray-500">Bạn tiết kiệm được 1,748,000 ₫</p>
          <div className="mt-4">
            <label className="block text-gray-700">Kích thước và màu sắc:</label>
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
            <label className="block text-gray-700">Số lượng:</label>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border rounded">-</button>
              <input type="text" value="1" className="w-12 text-center border rounded" />
              <button className="px-2 py-1 border rounded">+</button>
            </div>
          </div>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Mua ngay</button>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-orange-500">TƯ VẤN</h2>
            <p className="text-lg font-bold text-orange-500">Gọi 0987.822.944 để được tư vấn hoặc yêu cầu CaCo gọi lại</p>
            <input type="text" placeholder="Số điện thoại" className="mt-2 p-2 border rounded w-full" />
            <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded w-full">GỬI TƯ VẤN</button>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <img src="/icons/design.svg" alt="Thiết kế" className="w-12 h-12" />
          <p className="mt-2 text-center">Thiết kế miễn phí thiết kế</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icons/material.svg" alt="Chất liệu" className="w-12 h-12" />
          <p className="mt-2 text-center">Chất liệu đa dạng chất liệu</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icons/customize.svg" alt="Sản xuất theo yêu cầu" className="w-12 h-12" />
          <p className="mt-2 text-center">Sản xuất theo yêu cầu Caco trực tiếp sản xuất</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icons/installment.svg" alt="Trả góp" className="w-12 h-12" />
          <p className="mt-2 text-center">Trả góp 0% thủ tục đơn giản</p>
        </div>
      </div>
    </div>
  );
}