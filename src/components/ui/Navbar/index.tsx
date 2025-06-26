/** @format */

// components/Navbar.jsx

import { CategoryAPI } from "@/api/categories/category.api";
import MainNavbar from "./components/NavbarClient";
import { AppSidebar } from "../../app-sidebar";
import { CategoryInterface } from "@/types/category";
import NavbarClient from "./components/NavbarClient";
export const dynamic = "force-dynamic";

const Navbar = async () => {
  let categories: CategoryInterface[] = [];

  const response = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
  });
  if (response.status === 200) {
    const data = response.data as { categories: CategoryInterface[] };

    categories = data.categories;
  }

  //LẤY TẤT CẢ CATEGORIES BAO GỒM CẢ CATEGORY CON!!

  return (
    <nav className="bg-white ">
      <NavbarClient categories={categories} />
      {/* <AppSidebar categories={getCategories} />
      <MainNavbar data={categories} /> */}
      {/* This is navbar */}
    </nav>
  );
};

export default Navbar;
