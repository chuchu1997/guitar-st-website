/** @format */

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { CheckCircle, TruckIcon } from "lucide-react";

const categories = [
  {
    name: "Bảo hành",
    title: "aass",
    posts: [
      {
        id: 1,
        title:
          "Các sản phẩm nội thất tại Nhà Xinh đa số đều được sản xuất tại nhà máy của công ty cổ phần xây dựng kiến trúc AA với đội ngũ nhân viên và công nhân ưu tú cùng cơ sở vật chất hiện đại (http://www.aacorporation.com/). Nhà Xinh đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm hoàn thiện cuối cùng.",

        icon: <CheckCircle></CheckCircle>,
      },
      {
        id: 2,
        title:
          "Nhà Xinh bảo hành một năm cho các trường hợp có lỗi về kỹ thuật trong quá trình sản xuất hay lắp đặt.",
        icon: <CheckCircle></CheckCircle>,
      },
      {
        id: 3,
        title:
          "Quý khách không nên tự sửa chữa mà hãy báo ngay cho Nhà Xinh qua hotline: 1800 7200.",
        icon: <CheckCircle></CheckCircle>,
      },
      {
        id: 4,
        title:
          "Sau thời gian hết hạn bảo hành, nếu quý khách có bất kỳ yêu cầu hay thắc mắc thì vui lòng liên hệ với Nhà Xinh để được hướng dẫn và giải quyết các vấn đề gặp phải.",
        icon: <CheckCircle></CheckCircle>,
      },
    ],
  },
  {
    name: "Vận chuyển",
    title: "AA",
    posts: [
      {
        id: 1,
        title:
          "- MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Hồ Chí Minh và Hà Nội, áp dụng cho các đơn hàng trị giá trên 10 triệu.",
        icon: <TruckIcon></TruckIcon>,
      },
      {
        id: 2,
        title:
          "- Đối với khu vực các tỉnh lân cận: Tính phí hợp lý theo dựa trên quãng đường vận chuyển",
        icon: <TruckIcon></TruckIcon>,
      },
    ],
  },
];

export default function TabPrivacy() {
  return (
    <div className="">
      <div className="w-full ">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, posts }) => (
             <TabPanel key={name} className="rounded-xl bg-white p-3 shadow-md border border-gray-200">
             <ul>
               {posts.map((post) => (
                 <li
                   key={post.id}
                   className="relative rounded-md p-3 text-sm/6 transition hover:bg-gray-100">
                   <div className="font-semibold text-gray-800 items-start flex gap-x-4">
                     <div className="text-green-600">{post.icon}</div>
                     <div>{post.title}</div>
                   </div>
                 </li>
               ))}
             </ul>
           </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
