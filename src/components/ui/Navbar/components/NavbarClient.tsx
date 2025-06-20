/** @format */

"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { CategoryInterface } from "@/types/category";
import Link from "next/link";
import { ImageLoader } from "../../image-loader";
import { usePathname } from "next/navigation";
import MenuBar from "./Menubar";
import { ProductAPI } from "@/api/products/product.api";
import { ProductInterface } from "@/types/product";

// TypeScript Interfaces
interface NavbarProps {
  categories: CategoryInterface[];
}

interface MegaMenuProps {
  category: CategoryInterface;
}

interface SearchResult {
  id: number;
  name: string;
  description?: string;
  slug: string;
  type?: "product" | "category" | "article";
  imageUrl?: string;
}

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "desktop" | "mobile";
}

// Reusable Search Component
const SearchComponent: React.FC<SearchComponentProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const pathname = usePathname();

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // API call function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await ProductAPI.getProductByName(query);

      if (response.status === 200) {
        const data = (await response.data.products) as ProductInterface[];

        setSearchResults(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            imageUrl: item.images[0].url,
            // các trường khác nếu cần
          }))
        );
        // setSearchResults(data.results || []);
      } else {
        // console.error("Search API error:", response.statusText);
        // setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    (query: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    },
    [performSearch]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search result click
  const handleSearchResultClick = (result: SearchResult) => {
    onClose();
    setSearchQuery("");
    setSearchResults([]);

    window.location.href = `/san-pham/${result.slug}`;
  };

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (pathname) {
      console.log("PATH NAME", pathname);
      onClose();
    }
  }, [pathname]);

  // Close search when clicking outside (desktop only)
  useEffect(() => {
    if (variant === "mobile") return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, variant]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Desktop Search Dropdown
  if (variant === "desktop") {
    if (!isOpen) return null;

    return (
      <div
        ref={searchContainerRef}
        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none z-10" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm relative z-20"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto relative z-30">
          {searchQuery.trim() && !isSearching && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              Không tìm thấy kết quả nào
            </div>
          )}

          {searchResults.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={`/san-pham/${result.slug}`}
              className="w-full p-3 border-b border-gray-100 last:border-b-0 text-left transition-colors duration-200 cursor-pointer relative z-40"
              type="button">
              <div className="flex items-center space-x-3">
                {result.imageUrl && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={result.imageUrl}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {result.name}
                  </div>
                  {result.description && (
                    <div className="text-xs text-gray-500 truncate mt-1">
                      {result.description}
                    </div>
                  )}
                  <div className="text-xs text-indigo-600 mt-1 capitalize">
                    Sản phẩm
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Mobile Search Overlay
  if (variant === "mobile") {
    if (!isOpen) return null;

    return (
      <div ref={searchContainerRef} className="fixed inset-0 bg-white z-[70]">
        <div className="flex items-center p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 mr-2">
            <X className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto">
          {searchQuery.trim() && !isSearching && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Không tìm thấy kết quả nào
            </div>
          )}

          {searchResults.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={`/san-pham/${result.slug}`}
              className="w-full p-4 hover:bg-gray-50 border-b border-gray-100 text-left transition-colors duration-200">
              <div className="flex items-center space-x-3">
                {result.imageUrl && (
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={result.imageUrl}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {result.name}
                  </div>
                  {result.description && (
                    <div className="text-sm text-gray-500 truncate mt-1">
                      {result.description}
                    </div>
                  )}
                  <div className="text-sm text-indigo-600 mt-1 capitalize">
                    {result.type === "product"
                      ? "Sản phẩm"
                      : result.type === "category"
                      ? "Danh mục"
                      : "Bài viết"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const NavbarClient: React.FC<NavbarProps> = ({ categories }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] =
    useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Create a map of all categories for easy lookup
  const categoryMap = new Map<number, CategoryInterface>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat));

  // Filter parent categories and populate their subcategories
  const parentCategories: CategoryInterface[] = categories
    .filter((cat) => cat.parentId === null)
    .map((parentCat) => {
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
                        width={0}
                        height={0}
                      />
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

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="flex sm:hidden bg-[#f2f2f2] flex-1 p-2 items-center gap-x-2 rounded-lg cursor-pointer">
            <Search className="h-5 w-5" />
            <span className="text-[#9b9b9b]">Tìm kiếm</span>
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              {parentCategories.map((category: CategoryInterface) => (
                <Link
                  href={`/danh-muc/${category.slug}`}
                  key={category.id}
                  className="relative group"
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
                </Link>
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
            {/* Desktop Search */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsDesktopSearchOpen(!isDesktopSearchOpen)}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                <Search className="h-5 w-5" />
              </button>

              <SearchComponent
                isOpen={isDesktopSearchOpen}
                onClose={() => setIsDesktopSearchOpen(false)}
                variant="desktop"
              />
            </div>

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
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <SearchComponent
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        variant="mobile"
      />

      <MenuBar />
    </nav>
  );
};

export default NavbarClient;
