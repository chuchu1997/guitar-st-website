/** @format */

// components/Navbar.jsx

import Link from "next/link";
import { PanelTopOpen } from "lucide-react";
import MainNavbar from "./MainNavbar";
import { getCategories } from "@/actions/get-categories";

const Navbar = async () => {
  const categories = await getCategories();

  // const [activeCategory, setActiveCategory] = useState("");
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // interface CategoryLayoutType {
  //   name: string;
  //   href: string;
  //   subcategories?: any[];
  // }

  // const categories: CategoryLayoutType[] = [
  //   {
  //     name: "Electronics",
  //     href: "/electronics",
  //     subcategories: [
  //       {
  //         title: "Computers",
  //         href: "/electronics/computers",
  //         items: [
  //           { name: "Laptops", href: "/electronics/computers/laptops" },
  //           { name: "Desktop PCs", href: "/electronics/computers/desktop-pcs" },
  //           { name: "Tablets", href: "/electronics/computers/tablets" },
  //           { name: "Monitors", href: "/electronics/computers/monitors" },
  //         ],
  //       },
  //       {
  //         title: "Phones & Accessories",
  //         href: "/electronics/phones-accessories",
  //         items: [
  //           {
  //             name: "Smartphones",
  //             href: "/electronics/phones-accessories/smartphones",
  //           },
  //           { name: "Cases", href: "/electronics/phones-accessories/cases" },
  //           {
  //             name: "Chargers",
  //             href: "/electronics/phones-accessories/chargers",
  //           },
  //           {
  //             name: "Screen Protectors",
  //             href: "/electronics/phones-accessories/screen-protectors",
  //           },
  //         ],
  //       },
  //       {
  //         title: "Audio",
  //         href: "/electronics/audio",
  //         items: [
  //           { name: "Headphones", href: "/electronics/audio/headphones" },
  //           { name: "Speakers", href: "/electronics/audio/speakers" },
  //           { name: "Microphones", href: "/electronics/audio/microphones" },
  //           { name: "Home Audio", href: "/electronics/audio/home-audio" },
  //         ],
  //       },
  //       {
  //         title: "Cameras",
  //         href: "/electronics/cameras",
  //         items: [
  //           { name: "DSLR", href: "/electronics/cameras/dslr" },
  //           { name: "Mirrorless", href: "/electronics/cameras/mirrorless" },
  //           {
  //             name: "Action Cameras",
  //             href: "/electronics/cameras/action-cameras",
  //           },
  //           { name: "Accessories", href: "/electronics/cameras/accessories" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Fashion",
  //     href: "/fashion",
  //     subcategories: [
  //       {
  //         title: "Men",
  //         href: "/fashion/men",
  //         items: [
  //           { name: "Shirts", href: "/fashion/men/shirts" },
  //           { name: "Pants", href: "/fashion/men/pants" },
  //           { name: "Jackets", href: "/fashion/men/jackets" },
  //           { name: "Shoes", href: "/fashion/men/shoes" },
  //         ],
  //       },
  //       {
  //         title: "Women",
  //         href: "/fashion/women",
  //         items: [
  //           { name: "Dresses", href: "/fashion/women/dresses" },
  //           { name: "Tops", href: "/fashion/women/tops" },
  //           { name: "Bottoms", href: "/fashion/women/bottoms" },
  //           { name: "Footwear", href: "/fashion/women/footwear" },
  //         ],
  //       },
  //       {
  //         title: "Kids",
  //         href: "/fashion/kids",
  //         items: [
  //           { name: "Boys", href: "/fashion/kids/boys" },
  //           { name: "Girls", href: "/fashion/kids/girls" },
  //           { name: "Infants", href: "/fashion/kids/infants" },
  //           { name: "Teens", href: "/fashion/kids/teens" },
  //         ],
  //       },
  //       {
  //         title: "Accessories",
  //         href: "/fashion/accessories",
  //         items: [
  //           { name: "Watches", href: "/fashion/accessories/watches" },
  //           { name: "Bags", href: "/fashion/accessories/bags" },
  //           { name: "Jewelry", href: "/fashion/accessories/jewelry" },
  //           { name: "Hats", href: "/fashion/accessories/hats" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Home",
  //     href: "/home",
  //     subcategories: [
  //       {
  //         title: "Kitchen",
  //         href: "/home/kitchen",
  //         items: [
  //           { name: "Appliances", href: "/home/kitchen/appliances" },
  //           { name: "Cookware", href: "/home/kitchen/cookware" },
  //           { name: "Utensils", href: "/home/kitchen/utensils" },
  //           { name: "Storage", href: "/home/kitchen/storage" },
  //         ],
  //       },
  //       {
  //         title: "Furniture",
  //         href: "/home/furniture",
  //         items: [
  //           { name: "Living Room", href: "/home/furniture/living-room" },
  //           { name: "Bedroom", href: "/home/furniture/bedroom" },
  //           { name: "Dining Room", href: "/home/furniture/dining-room" },
  //           { name: "Office", href: "/home/furniture/office" },
  //         ],
  //       },
  //       {
  //         title: "Decor",
  //         href: "/home/decor",
  //         items: [
  //           { name: "Wall Art", href: "/home/decor/wall-art" },
  //           { name: "Lighting", href: "/home/decor/lighting" },
  //           { name: "Rugs", href: "/home/decor/rugs" },
  //           { name: "Plants", href: "/home/decor/plants" },
  //         ],
  //       },
  //       {
  //         title: "Bathroom",
  //         href: "/home/bathroom",
  //         items: [
  //           { name: "Towels", href: "/home/bathroom/towels" },
  //           { name: "Shower Curtains", href: "/home/bathroom/shower-curtains" },
  //           {
  //             name: "Bath Accessories",
  //             href: "/home/bathroom/bath-accessories",
  //           },
  //           { name: "Storage", href: "/home/bathroom/storage" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Books",
  //     href: "/books",
  //     subcategories: [
  //       {
  //         title: "Fiction",
  //         href: "/books/fiction",
  //         items: [
  //           { name: "Mystery", href: "/books/fiction/mystery" },
  //           { name: "Sci-Fi", href: "/books/fiction/sci-fi" },
  //           { name: "Fantasy", href: "/books/fiction/fantasy" },
  //           { name: "Romance", href: "/books/fiction/romance" },
  //         ],
  //       },
  //       {
  //         title: "Non-Fiction",
  //         href: "/books/non-fiction",
  //         items: [
  //           { name: "Biography", href: "/books/non-fiction/biography" },
  //           { name: "History", href: "/books/non-fiction/history" },
  //           { name: "Science", href: "/books/non-fiction/science" },
  //           { name: "Self-Help", href: "/books/non-fiction/self-help" },
  //         ],
  //       },
  //       {
  //         title: "Children's",
  //         href: "/books/childrens",
  //         items: [
  //           { name: "Picture Books", href: "/books/childrens/picture-books" },
  //           { name: "Chapter Books", href: "/books/childrens/chapter-books" },
  //           { name: "Educational", href: "/books/childrens/educational" },
  //           { name: "Young Adult", href: "/books/childrens/young-adult" },
  //         ],
  //       },
  //       {
  //         title: "Textbooks",
  //         href: "/books/textbooks",
  //         items: [
  //           { name: "School", href: "/books/textbooks/school" },
  //           { name: "College", href: "/books/textbooks/college" },
  //           { name: "Professional", href: "/books/textbooks/professional" },
  //           { name: "Reference", href: "/books/textbooks/reference" },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     name: "Liên hệ",
  //     href: "/lien-he",
  //   },
  // ];

  // const toggleCategory = (categoryName: string) => {
  //   setExpandedCategories((prev) =>
  //     prev.includes(categoryName)
  //       ? prev.filter((name) => name !== categoryName)
  //       : [...prev, categoryName]
  //   );
  // };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                BrandName
              </Link>
            </div>
          </div>

          <MainNavbar data={categories} />

          {/* Mobile menu button */}
          {/* <div className="sm:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>

      {/* <div className="bottom-nav bg-gradient-to-r from-orange-400 to-pink-500">
        <div className="container mx-auto">
          <div className="hidden sm:flex sm:space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory("")}>
                <Link
                  href={category.href}
                  className={`${
                    activeCategory === category.name
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-white hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16`}>
                  <div className="flex gap-2 items-center">
                    <span> {category.name}</span>
                    {category.subcategories && <PanelTopOpen size={16} />}
                  </div>
                </Link>

          
                {activeCategory === category.name && category.subcategories && (
                  <div className="absolute left-0 mt-0.5 min-w-[800px] z-10">
                    <div className="grid grid-cols-4 gap-5 bg-white p-8 shadow-lg rounded-b-lg">
                      {category.subcategories?.map((subcategory) => (
                        <div key={subcategory.title} className="space-y-3">
                          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                            <Link
                              href={subcategory.href}
                              className="hover:text-indigo-600">
                              {subcategory.title}
                            </Link>
                          </h3>
                          <ul className="space-y-2">
                            {subcategory.items.map((item: any) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="text-gray-600 hover:text-indigo-600">
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out">
     
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              sidebarOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setSidebarOpen(false)}></div>

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
          
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
                onClick={() => setSidebarOpen(false)}>
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

       
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                  BrandName
                </Link>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Link
                        href={category.href}
                        className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900">
                        {category.name}
                      </Link>
                      {category.subcategories && (
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() => toggleCategory(category.name)}>
                          {expandedCategories.includes(category.name) ? (
                            <svg
                              className="w-5 h-5 transition-transform duration-300 ease-in-out transform rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 transition-transform duration-300 ease-in-out transform rotate-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    {expandedCategories.includes(category.name) && (
                      <div className="ml-4 space-y-1 transition-all duration-300 ease-in-out">
                        {category.subcategories?.map((subcategory) => (
                          <div key={subcategory.title} className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                              <Link
                                href={subcategory.href}
                                className="hover:text-indigo-600">
                                {subcategory.title}
                              </Link>
                            </h3>
                            <ul className="space-y-2">
                              {subcategory.items.map((item: any) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-indigo-600">
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
