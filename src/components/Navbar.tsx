/** @format */

// components/Navbar.jsx

import Link from "next/link";
import MainNavbar from "./MainNavbar";
import { getCategories } from "@/actions/get-categories";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" legacyBehavior className="text-2xl font-bold">
                Logo
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
