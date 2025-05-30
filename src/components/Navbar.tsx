/** @format */

// components/Navbar.jsx

import MainNavbar from "./MainNavbar";
import { getCategories } from "@/actions/get-categories";
import { AppSidebar } from "./app-sidebar";
export const dynamic = "force-dynamic";
export const revalidate = 60;

const Navbar = async () => {
  // const categories = await getCategories();
  // if (!categories) {
  //   return <>Không có danh mục vui lòng tạo ....</>;
  // }

  return (
    <nav className="bg-white ">
      <AppSidebar categories={categories} />
      <MainNavbar data={categories} />
      {/* This is navbar */}
    </nav>
  );
};

export default Navbar;
