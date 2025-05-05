/** @format */

"use client";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
  BookText,
  TicketPercent,
  Briefcase,
  MapPinHouse,
  CircleHelp,
  HandPlatter,
} from "lucide-react";
import Link from "next/link";

const HomePromotion = () => {
  const [searchValue, setSearchValue] = useState("guitar học sinh mini");
  const [categoriesFixed, setCategoriesFixed] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 59,
    seconds: 50,
  });
  const items = [
    { icon: <BookText className="w-5 h-5 " />, title: "Đơn hàng", link: "/" },
    {
      icon: <TicketPercent className="w-5 h-5 " />,
      title: "Voucher",
      link: "/",
    },
    { icon: <Briefcase className="w-5 h-5 " />, title: "Đơn hủy", link: "/" },
    { icon: <MapPinHouse className="w-5 h-5 " />, title: "Địa chỉ", link: "/" },
    { icon: <CircleHelp className="w-5 h-5 " />, title: "Trợ giúp", link: "/" },
    {
      icon: <HandPlatter className="w-5 h-5 " />,
      title: "Chính sách",
      link: "/",
    },

    // có thể thêm nhiều item nữa
  ];
  const categoryItems = [
    "Thiết bị gia dụng",
    "May mặc",
    "Quần áo trẻ em",
    "Mỹ phẩm",
    "dqwd",
    "dwqd",
    "dqwdw",
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const format = (n: number) => String(n).padStart(2, "0");

  const renderCategories = () => (
    <div className="container mx-auto w-full px-1 py-2">
      <Tabs defaultValue="account" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap pb-6">
          <TabsList className="flex w-max space-x-4">
            {categoryItems.map((item, idx) => (
              <TabsTrigger key={idx} value={item} className="text-light">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>
  );
  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const categoriesPosition =
          categoriesRef.current.getBoundingClientRect().top;
        // If categories are near the top of the viewport (just below fixed search)
        if (categoriesPosition <= 90) {
          setCategoriesFixed(true);
        } else {
          setCategoriesFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-cyan-200 via-cyan-100 to-pink-200 ">
      <div className="content">
        <div className="container mx-auto px-2">
          {/* TOP LINK  */}
          <div className="py-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex items-center space-x-4 px-2 pb-6">
                {/* Thêm pb-6 ở đây */}
                {items.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="flex flex-col  items-center gap-y-2 min-w-[60px]">
                    <div>{item.icon}</div>
                    <div className="text-xs ">{item.title}</div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Flash Sale Section */}
          <div className="bg-gradient-to-r from-white via-gray-100 to-pink-100 rounded-lg p-3">
            <div className="flex items-center justify-between text-black px-4 py-2 ">
              {/* Flash⚡Sale */}
              <div className="flex items-center gap-2 text-xl font-bold text-black">
                <p className="font-semibold italic text-base">⚡ Flash Sale </p>
                <span className="bg-red-400 text-white text-xs font-semibold px-2 py-0.5 rounded-md ml-[2px]">
                  70% Off
                </span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-1 text-black px-3 py-1 rounded-md font-semibold text-sm sm:text-sm ">
                <div className="bg-black text-white rounded px-1.5 py-0.5 sm:px-2">
                  {format(timeLeft.hours)}
                </div>
                <span>:</span>
                <div className="bg-black text-white rounded px-1.5 py-0.5 sm:px-2">
                  {format(timeLeft.minutes)}
                </div>
                <span>:</span>
                <div className="bg-black text-white rounded px-1.5 py-0.5 sm:px-2">
                  {format(timeLeft.seconds)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-x-4 mt-3">
              <div className="overflow-hidden ">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gray-100 shadow-md ">
                    <Image
                      src="/images/banner/11.png"
                      fill
                      alt="abc"
                      objectFit="cover"></Image>
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/20 px-1 py-0.5">
                    <span className="bg-red-500 font-semibold text-white text-[10px] px-1 py-0.5  rounded">
                      Hot
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="text-[13px] font-semibold text-center">
                    73.099đ
                  </div>
                </div>
              </div>
              <div className="overflow-hidden ">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gray-100 shadow-md ">
                    <Image
                      src="/images/banner/11.png"
                      fill
                      alt="abc"
                      objectFit="cover"></Image>
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/20 px-1 py-0.5">
                    <span className="bg-red-500 font-semibold text-white text-[10px] px-1 py-0.5  rounded">
                      Hot
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="text-[13px] font-semibold text-center">
                    73.099đ
                  </div>
                </div>
              </div>
              <div className="overflow-hidden ">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gray-100 shadow-md ">
                    <Image
                      src="/images/banner/11.png"
                      fill
                      alt="abc"
                      objectFit="cover"></Image>
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/20 px-1 py-0.5">
                    <span className="bg-red-500 font-semibold text-white text-[10px] px-1 py-0.5  rounded">
                      Hot
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="text-[13px] font-semibold text-center">
                    73.099đ
                  </div>
                </div>
              </div>
              <div className="overflow-hidden ">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gray-100 shadow-md ">
                    <Image
                      src="/images/banner/11.png"
                      fill
                      alt="abc"
                      objectFit="cover"></Image>
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/20 px-1 py-0.5">
                    <span className="bg-red-500 font-semibold text-white text-[10px] px-1 py-0.5  rounded">
                      Hot
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="text-[13px] font-semibold text-center">
                    73.099đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-500 ">
          {categoriesFixed && (
            <div className="fixed top-14 md:top-16 left-0 right-0 z-10  shadow-md bg-white">
              {renderCategories()}
            </div>
          )}

          <div
            ref={categoriesRef}
            className="overflow-x-auto mt-2 border-b bg-white">
            {renderCategories()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePromotion;
