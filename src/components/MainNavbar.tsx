'use client';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Home, MessageCircle, User, Clock, Camera } from 'lucide-react';

import SearchBarComponent from './SearchBar';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import SearchWithSuggestions from './ui/searchBar';

export default function TikTokShopVietnam(data:any) {
  const [searchValue, setSearchValue] = useState('guitar học sinh mini');
  const [categoriesFixed, setCategoriesFixed] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const categoryItems = [
    "Thiết bị gia dụng",
    "May mặc",
    "Quần áo trẻ em",
    "Mỹ phẩm",
    "dqwd","dwqd","dqwdw"
  ];
  
  const renderCategories = () => (
    <div className="container mx-auto w-full px-1 py-2 bg-white">
      <Tabs defaultValue="account" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="flex w-max space-x-4">
            {categoryItems.map((item, idx) => (
              <TabsTrigger key={idx} value={item} className='text-light'>
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
        const categoriesPosition = categoriesRef.current.getBoundingClientRect().top;
        // If categories are near the top of the viewport (just below fixed search)
        if (categoriesPosition <= 90) {
          setCategoriesFixed(true);
        } else {
          setCategoriesFixed(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-cyan-300 to-cyan-200 pt-[10px]">
        {/* Search Bar */}
        <div className="px-4 pt-1 pb-2 relative flex justify-between items-center container mx-auto ">
          <Link className = "mr-4" href = "/">
            <Image className='rounded-lg' src = "/images/logo.jpg" width = {50} height = {50} alt = "logo"></Image>
          </Link>
          <SearchWithSuggestions/>
          {/* <SearchBarComponent className = "w-full md:w-[400px]"/> */}
          <div className="relative ml-4">
              <ShoppingCart className="text-black" size={20} />
              <div className="absolute -top-4 -right-3 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-xs font-medium">24</span>
              </div>
            </div>
       
        </div>
      </div>
 
      {/* Promotion Banner */}
      {/* <div className="px-4 py-2 bg-white mx-4 rounded-lg pt-24">
        <div className="flex items-center">
          <div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="black">
              <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z" />
            </svg>
          </div>
          <div className="ml-1 font-bold text-lg">TikTok Shop</div>
          <div className="ml-2 text-blue-800 font-bold text-xs border-l-2 border-gray-300 pl-2">
            Vinamilk
          </div>
        </div>
        
        <div className="mt-1">
          <div className="text-xl font-bold">Deal Thật Mê</div>
          <div className="text-2xl font-bold text-pink-500">Săn Ngay Kéo Trễ</div>
          
          <div className="mt-2">
            <button className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full text-sm">
              Săn Ngay
            </button>
          </div>
        </div>
      </div> */}

      {/* Feature Icons */}
      {/* <div className="grid grid-cols-5 px-4 pt-4 pb-2 gap-2 container mx-auto">
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#29b6f6" stroke="#fff" strokeWidth="1"/>
              <path d="M9 10h6" stroke="#fff" strokeWidth="2"/>
              <path d="M5 8l2 2-2 2" fill="#ff1a8c" stroke="#fff"/>
            </svg>
          </div>
          <div className="text-xs mt-1 text-center">Voucher Xtra</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" fill="#29b6f6" stroke="#fff"/>
              <path d="M7 8l10 0" stroke="#fff" strokeWidth="2"/>
              <path d="M9 12h6" stroke="#fff" strokeWidth="2"/>
              <path d="M11 16h2" stroke="#fff" strokeWidth="2"/>
            </svg>
          </div>
          <div className="text-xs mt-1 text-center">Ưu đãi vận chuyển</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" fill="#ef5350" stroke="#fff"/>
              <polygon points="10,8 16,12 10,16" fill="#fff"/>
            </svg>
          </div>
          <div className="text-xs mt-1 text-center">Mua sắm qua LIVE</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" fill="#212121" stroke="#fff"/>
              <text x="5" y="15" fontFamily="Arial" fontSize="8" fill="#fff" fontWeight="bold">Mail</text>
            </svg>
          </div>
          <div className="text-xs mt-1 text-center">TikTok Shop Mall</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M3 10v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="#ff7043" stroke="#fff"/>
              <path d="M12 3L4 10h16L12 3z" fill="#ff7043" stroke="#fff"/>
              <rect x="9" y="12" width="6" height="6" fill="#fff"/>
            </svg>
          </div>
          <div className="text-xs mt-1 text-center">Đang theo dõi</div>
        </div>
      </div> */}



  
      {/* Categories - Becomes fixed when scrolled to its position */}
      {/* <>
      {categoriesFixed && (
        <div className="fixed top-14 left-0 right-0 z-10 bg-white shadow-md">
          {renderCategories()}
        </div>
      )}
  
      <div ref={categoriesRef} className="overflow-x-auto mt-2 bg-white border-b">
        {renderCategories()}
      </div>
    </> */}
      
      {/* Spacer for when categories are fixed */}
      {/* {categoriesFixed && <div className="h-10"></div>} */}

      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-4 py-2">
        <div className="flex flex-col items-center">
          <Home className="text-gray-400" size={24} />
          <div className="text-xs mt-1 text-gray-500">Trang chủ</div>
        </div>
        
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="currentColor">
            <path d="M16 6v2h3.586L12 14.586 7.707 10.293 1.293 16.707 2.707 18.121 7.707 13.121 12 17.414 20.414 9H24V6z"/>
            <path d="M20 20H4V12H2V20C2 21.103 2.897 22 4 22H20C21.103 22 22 21.103 22 20V12H20V20z"/>
          </svg>
          <div className="text-xs mt-1 font-semibold">Cửa hàng</div>
        </div>
        
        <div className="flex flex-col items-center -mt-4">
          <div className="bg-cyan-500 rounded-full p-3 border-4 border-white">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col items-center relative">
          <MessageCircle className="text-gray-400" size={24} />
          <div className="text-xs mt-1 text-gray-500">Hộp thư</div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <User className="text-gray-400" size={24} />
          <div className="text-xs mt-1 text-gray-500">Hồ sơ</div>
        </div>
      </div> */}
    </div>
  );
}