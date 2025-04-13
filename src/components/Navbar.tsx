/** @format */

// components/Navbar.jsx

import Link from "next/link";
import MainNavbar from "./MainNavbar";
import { getCategories } from "@/actions/get-categories";
import { AppSidebar } from "./app-sidebar";
export const dynamic = "force-dynamic";
export const revalidate = 60;

const Navbar = async () => {
  const categories = await getCategories();
  console.log("CATE", categories);
  if (!categories) {
    return <>Không có danh mục vui lòng tạo ....</>;
  }

  return (
    <nav className="bg-white shadow-md">
      <AppSidebar categories={categories} />
      <div className="container mx-auto">
        <div className="flex items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold  ">
                Logo 11
              </Link>
            </div>
          </div>

          <MainNavbar data={categories} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
