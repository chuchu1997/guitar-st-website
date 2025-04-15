/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/ProjectInterface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchWithSuggestions from "./ui/searchBar";
import IconButton from "./ui/icon-button";
import { Menu, ShoppingBag, X, Search, SearchIcon } from "lucide-react";
import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";
import { CartIconButton } from "./ui/cart-icon-btn";

interface MainNavbarProps {
  data: Category[];
}

const MainNavbar = (props: MainNavbarProps) => {
  const pathname = usePathname();
  const { data } = props;
  const [isMounted, setIsMounted] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<number | null>(null);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State kiểm tra trạng thái mở/đóng search
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };
  const iconRef = useRef<HTMLButtonElement>(null); // Thêm ref cho icon

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Nếu click ngoài cả dropdown và icon thì mới đóng
      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        iconRef.current &&
        !iconRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onToggleMobileMenuBtn = () => {
    setIsOpenMobileNav(!isOpenMobileNav);
  };

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpenMobileNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle click outside mobile menu

  const routes = data.map((route) => ({
    href: `/${route.slug}`,
    label: route.name,
    active: pathname === `/${route.slug}`,
    parentCategorySlug: route.slug,
    subCategories: route.subcategories,
  }));

  const onMoveCart = () => {
    router.push("/gio-hang");
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Spacer div to prevent content from being hidden under fixed header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#161617CC]"
        )}>
        <div className="container mx-auto ">
          <div className="flex items-center justify-between md:justify-center h-12 px-6 ">
            {/* Logo + Navigation */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="px-4 py-2 text-xs text-white font-medium transition-opacity capitalize opacity-70 hover:opacity-100">
                <span className="text-sm font-semibold capitalize">Logo</span>
              </Link>

              {/* Main Navigation */}
              <nav className="hidden lg:flex items-center gap-4">
                <ul className="flex items-center gap-4">
                  {routes.map((route, index) => (
                    <li key={route.href} className="relative">
                      <button
                        className={cn(
                          "px-4 py-2 text-xs text-white font-medium transition-opacity capitalize",
                          route.active
                            ? "opacity-100"
                            : "opacity-70 hover:opacity-100"
                        )}
                        onMouseEnter={() => setOpenMegaMenu(index)}
                        onMouseLeave={() => setOpenMegaMenu(null)}>
                        {route.label}
                      </button>

                      {/* Mega Menu Dropdown */}
                      {route.subCategories.length > 0 && (
                        <div
                          className={cn(
                            "absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-[#161617CC] backdrop-blur-md py-8 px-6 z-50 transition-all duration-300",
                            openMegaMenu === index
                              ? "opacity-100 visible"
                              : "opacity-0 invisible pointer-events-none"
                          )}
                          onMouseEnter={() => setOpenMegaMenu(index)}
                          onMouseLeave={() => setOpenMegaMenu(null)}>
                          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                            {route.subCategories.map((subCategory) => (
                              <Link
                                key={subCategory.id}
                                href={`${route.href}/${subCategory.slug}`}
                                className="group flex flex-col items-center text-center transition-transform hover:scale-105">
                                <div className="relative w-16 h-16 mb-3 overflow-hidden rounded-lg">
                                  <Image
                                    fill
                                    src={subCategory.billboard.imageUrl}
                                    alt={subCategory.name}
                                    className="object-cover group-hover:brightness-110 transition-all"
                                  />
                                </div>
                                <span className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">
                                  {subCategory.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="ml-[40px] right flex gap-6 items-center">
              <button
                ref={iconRef}
                onClick={toggleSearch} // Toggle search box visibility
                className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <SearchIcon color="white" size={18} />
              </button>
              <CartIconButton />
              <div className="block sm:hidden">
                <SidebarTrigger className=" text-white opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div
                ref={searchRef}
                className={`w-full absolute left-0 top-12 bg-black/60 px-6 shadow-lg transition-all duration-300 ease-in-out 
    transform ${
      isSearchOpen
        ? "translate-y-0 opacity-100 pointer-events-auto h-[350px]"
        : "-translate-y-full opacity-0 pointer-events-none"
    } flex justify-center items-start pt-[20px]`}>
                <SearchWithSuggestions />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainNavbar;
