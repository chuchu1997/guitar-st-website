/** @format */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { CategoryInterface } from "@/types/category";
import Link from "next/link";
import { ImageLoader } from "../../image-loader";
import { usePathname } from "next/navigation";
import MenuBar from "./Menubar";

// TypeScript Interfaces

interface NavbarProps {
  categories: CategoryInterface[];
}

interface MegaMenuProps {
  category: CategoryInterface;
}

const NavbarClient: React.FC<NavbarProps> = ({ categories }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Create a map of all categories for easy lookup
  const categoryMap = new Map<number, CategoryInterface>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat));

  // Filter parent categories and populate their subcategories
  const parentCategories: CategoryInterface[] = categories
    .filter((cat) => cat.parentId === null)
    .map((parentCat) => {
      // Find all subcategories for this parent
      const subcategories = categories.filter(
        (cat) => cat.parentId === parentCat.id
      );
      return {
        ...parentCat,
        subCategories: subcategories,
      };
    });

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (categoryId: number): void => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = (): void => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  const MegaMenu: React.FC<MegaMenuProps> = ({ category }) => {
    if (!category.subCategories || category.subCategories.length === 0)
      return null;
    return (
      <div
        className="absolute top-full left-[80px] -translate-x-1/2 w-screen bg-white shadow-2xl border-t border-gray-100 z-50 transform transition-all duration-300 ease-out"
        onMouseEnter={() => handleMouseEnter(category.id)}
        onMouseLeave={handleMouseLeave}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Featured Category */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 h-full min-h-[120px]">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 capitalize">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 font-medium">
                    Xem tất cả
                    <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                  </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full opacity-20"></div>
              </div>
            </div>

            {/* Subcategories */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subCategories.map((subcat: CategoryInterface) => (
                  <Link
                    href={`/danh-muc/${subcat.slug}`}
                    key={subcat.id}
                    className="group/item relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="aspect-w-16 aspect-h-10 relative overflow-hidden">
                      <ImageLoader
                        src={subcat.imageUrl}
                        alt={subcat.name}
                        className="h-32 w-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        // fill={true}
                        width={0}
                        height={0}
                      />

                      {/* <img
                        src={subcat.imageUrl}
                        alt={subcat.name}
                        className="w-full h-32 object-cover group-hover/item:scale-110 transition-transform duration-500"
                        loading="lazy"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 capitalize group-hover/item:text-indigo-600 transition-colors duration-200">
                        {subcat.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {subcat.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 ring-2 ring-indigo-500 ring-opacity-0 group-hover/item:ring-opacity-20 rounded-xl transition-all duration-200"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white shadow-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link className="flex items-center" href="/">
            <ImageLoader
              className="scale-90 sm:scale-100 bg-transparent rounded-full overflow-hidden"
              src="/logo.jpg"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
          <button className="flex sm:hidden bg-[#f2f2f2] flex-1 p-2  items-center gap-x-2 rounded-lg cursor-pointer">
            <Search className="h-5 w-5" />
            <span className="text-[#9b9b9b]">Tìm kiếm</span>
          </button>
          {/* <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
            <Search className="h-5 w-5" />
          </button> */}

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              {parentCategories.map((category: CategoryInterface) => (
                <div
                  key={category.id}
                  className="relative group "
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}>
                  <button className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50 capitalize">
                    {category.name}
                    {category.subCategories &&
                      category.subCategories.length > 0 && (
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                  </button>
                  {activeDropdown === category.id && (
                    <MegaMenu category={category} />
                  )}
                </div>
              ))}

              <Link
                href="/gioi-thieu"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
                Giới thiệu
              </Link>
              <Link
                href="/lien-he"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
                Liên hệ
              </Link>
              <Link
                href="/tin-tuc"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
                Tin tức
              </Link>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 px-2">
            {/* Search */}
            <button className="hidden sm:block p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>
            {/* User */}
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <User className="h-5 w-5" />
            </button>

            {/* Shopping bag */}
            <button className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                2
              </span>
            </button>

            {/* Mobile menu button */}
            {/* <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button> */}
          </div>
        </div>
      </div>

      <MenuBar />
      {/* Mobile menu */}
      {/* <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <div className="px-4 pt-2 pb-6 bg-white border-t border-gray-100">
          <div className="space-y-1">
            {parentCategories.map((category: CategoryInterface) => (
              <div key={category.id} className="space-y-1">
                <div className="px-3 py-3 text-gray-700 font-medium capitalize border-b border-gray-100">
                  {category.name}
                </div>
                {category.subCategories &&
                  category.subCategories.map((subcat: CategoryInterface) => (
                    <Link
                      key={subcat.id}
                      href={`/danh-muc/${subcat.slug}`}
                      className="block pl-6 pr-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 capitalize">
                      {subcat.name}
                    </Link>
                  ))}
              </div>
            ))}

            <Link
              href="/gioi-thieu"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
              Giới thiệu
            </Link>
            <Link
              href="/lien-he"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
              Liên hệ
            </Link>
            <Link
              href="/tin-tuc"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-indigo-50">
              Tin tức
            </Link>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default NavbarClient;
