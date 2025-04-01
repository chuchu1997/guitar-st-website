/** @format */

import {
  honda,
  makita,
  manhanhongkyPRO,
  mayhancoTiendat,
  mayhanhongkyHK,
  mayhanJasic,
  maynenkhi,
  quehanKimtin,
} from "@/data/data";
import dynamic from "next/dynamic";
import Banner from "@/components/Banner";
import Services from "@/components/layouts/Services";
import TileComponent from "@/components/layouts/TileComponent";
import { TabsLayout } from "@/components/layouts/Tabs";
import PreviewProduct from "@/components/product/PreviewProduct";
// const VideoDescription = dynamic(() => import("@/components/layouts/Videos"), {
//   ssr: false,
// });
// const SliderWithProducts = dynamic(
//   () => import("@/components/SliderWithProducts"),
//   { ssr: false }
// );
import SectionComponent from "@/components/layouts/SectionComponent";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getBillboard from "@/actions/get-billboard";

export default async function Home() {
  const banners = await getBillboard("65ef27af-3792-4dd6-9473-3a6a363919e7");

  return (
    <div>
      <SectionComponent className="my-[0px]">
        <Banner images={[banners]}></Banner>
      </SectionComponent>

      {/* <div className="wrapper-content-container container mx-auto">
        <SectionComponent>
          <Services />
        </SectionComponent>

        <SectionComponent className="my-[30px]">
          <TabsLayout />
        </SectionComponent>

        <SectionComponent className="my-[30px]">
          <TileComponent title="giường ngủ" />
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
          </div>
          <div className="flex justify-center py-[10px]">
            <Link href="/target-page" className="w-1/5 mx-auto">
              <Button className="text-center w-full">Xem thêm</Button>
            </Link>
          </div>
        </SectionComponent>

        <SectionComponent className="my-[30px]">
          <TileComponent title="tủ bếp" />
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
          </div>
          <div className="flex justify-center py-[10px]">
            <Link href="/target-page" className="w-1/5 mx-auto">
              <Button className="text-center w-full">Xem thêm</Button>
            </Link>
          </div>
        </SectionComponent>

        <SectionComponent className="my-[30px]">
          <TileComponent title="combo phòng ngủ" />
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
            <PreviewProduct />
          </div>
        </SectionComponent>
      </div> */}

      <div className="bg-[#dfdfdf73] py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center p-6 rounded-lg ">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold text-orange-500">
                NĂNG LỰC CẠNH TRANH
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside custom-list">
                <li>CaCo có xưởng sản xuất trực tiếp – Tiết kiệm ngân sách</li>
                <li>
                  Giám đốc đi từ thợ chính – Trực tiếp làm việc với khách hàng
                </li>
                <li>Đội ngũ thiết kế – Kỹ thuật trên 5 năm kinh nghiệm</li>
                <li>Tư vấn – Khảo sát – Thiết kế 3D miễn phí</li>
                <li>
                  Cam kết thi công đúng tiến độ đúng chất liệu như trên hợp đồng
                </li>
                <li>Chất liệu gỗ thương hiệu An Cường – Mộc Phát – Ba Thanh</li>
                <li>Bảo hành 3 năm – Bảo trì trọn đời</li>
              </ul>
              <div className="mt-4">
                <div className="text-lg font-bold text-orange-500">
                  Hotline: 0987.822.944
                </div>
                <div className="text-sm text-gray-500">
                  Hãy gọi cho chúng tôi để được tư vấn miễn phí!
                </div>
              </div>
            </div>
            {/* <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <iframe
                className="rounded-xl"
                width="520px"
                height="400px"
                src="https://www.youtube.com/embed/bG6WB-IjxRM?si=bN4kTpDntJyzmjOT"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <SectionComponent>
          <TileComponent title="Đối tác chính thức"></TileComponent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 ">
            <div className="test relative min-h-[200px] w-full">
              <Image
                src="/images/banner/11.png"
                alt="test"
                fill
                objectFit="cover"></Image>
            </div>
            <div className="test relative min-h-[200px] w-full">
              <Image
                src="/images/banner/11.png"
                alt="test"
                fill
                objectFit="cover"></Image>
            </div>
            <div className="test relative min-h-[200px] w-full">
              <Image
                src="/images/banner/11.png"
                alt="test"
                fill
                objectFit="cover"></Image>
            </div>
            <div className="test relative min-h-[200px] w-full">
              <Image
                src="/images/banner/11.png"
                alt="test"
                fill
                objectFit="cover"></Image>
            </div>
          </div>
          <div className="text-center py-4">
            An Cường, Thanh Thùy, Ba Thanh và Mộc Phát - bốn tên tuổi vượt trội
            trong ngành gỗ công nghiệp tại Việt Nam. Với tiếng tăm về chất lượng
            hàng đầu và dịch vụ uy tín, họ đã trở thành đối tác không thể thiếu
            trong việc cung cấp nguyên liệu chính cho Nội thất CaCo.
          </div>
        </SectionComponent>
      </div>
    </div>
  );
}
