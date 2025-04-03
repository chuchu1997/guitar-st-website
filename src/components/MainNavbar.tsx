/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/ProjectInterface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchWithSuggestions from "./ui/searchBar";
import IconButton from "./ui/icon-button";
import { Menu, ShoppingBag, X } from "lucide-react";

interface MainNavbarProps {
  data: Category[];
}

const MainNavbar = (props: MainNavbarProps) => {
  const pathname = usePathname();
  const { data } = props;

  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null); // Ref để xác định vùng menu
  const router = useRouter();

  const onToggleMobileMenuBtn = () => {
    setIsOpenMobileNav(!isOpenMobileNav);
  };

  // 🔹 Xử lý khi resize màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpenMobileNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpenMobileNav(false);
      }
    };

    if (isOpenMobileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMobileNav]);

  const routes = data.map((route) => ({
    href: `/danh-muc/${route.slug}`,
    label: route.name,
    active: pathname === `/danh-muc/${route.slug}`,
  }));

  const onMoveCart = () => {
    router.push("/gio-hang");
  };

  return (
    <>
      <div className="flex-1 ml-[40px] flex items-center relative">
        {/* Navigation cho màn hình lớn */}
        <nav className="hidden md:flex mx-6 space-x-4 items-center lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                route.active ? "text-black" : "text-neutral-500"
              )}>
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Search & Cart cho màn hình lớn */}
        <div className="ml-auto hidden md:block">
          <SearchWithSuggestions />
        </div>
        <div className="ml-auto hidden md:block">
          <div className="flex items-center w-full justify-center relative">
            <div
              className="h-5 w-5 absolute top-[-8px] bg-red-500 text-white rounded-full right-[-10px] text-sm font-semibold
            text-center
            ">
              1
            </div>
            <IconButton
              icon={
                <ShoppingBag
                  size={16}
                  onClick={() => {
                    onMoveCart();
                  }}
                />
              }
            />
          </div>
        </div>

        {/* Nút mở menu mobile */}
        <div className="ml-auto block md:hidden">
          <IconButton
            icon={isOpenMobileNav ? <X size={16} /> : <Menu size={16} />}
            onClick={onToggleMobileMenuBtn}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpenMobileNav && (
        <div
          ref={mobileMenuRef} // Gán ref vào menu để kiểm tra sự kiện click outside
          className={`w-full bg-white shadow-2xl border rounded-md z-50 absolute top-[66px] left-0 flex items-center flex-col p-4 gap-y-2
            transition-all duration-700 ease-in-out transform origin-top 
            ${
              isOpenMobileNav
                ? "opacity-100 scale-100 max-h-[300px]"
                : "opacity-0 scale-95 max-h-0 overflow-hidden"
            }`}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                route.active ? "text-black" : "text-neutral-500"
              )}>
              {route.label}
            </Link>
          ))}

          <div className="flex items-center w-full justify-center">
            <SearchWithSuggestions />
          </div>

          <div className="flex items-center w-full justify-center mt-[10px]">
            <div className="">
              <div className="flex items-center w-full justify-center relative">
                <div
                  className="h-5 w-5 absolute top-[-8px] bg-red-500 text-white rounded-full right-[-10px] text-sm font-semibold
            text-center
            ">
                  1
                </div>
                <IconButton
                  icon={
                    <ShoppingBag
                      size={16}
                      onClick={() => {
                        onMoveCart();
                      }}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
