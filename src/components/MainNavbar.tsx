/** @format */
"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types/ProjectInterface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchWithSuggestions from "./ui/searchBar";

interface MainNavbarProps {
  data: Category[];
}

const MainNavbar = (props: MainNavbarProps) => {
  const pathname = usePathname();

  const { data } = props;
  const routes = data.map((route) => ({
    href: `/danh-muc/${route.slug}`,
    label: route.name,
    active: pathname === `/danh-muc/${route.slug}`,
  }));
  return (
    <div className="flex-1 ml-[40px]  flex items-center  ">
      <nav className=" hidden md:flex mx-6 space-x-4 items-center lg:space-x-6">
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
      <div className="ml-auto ">
        <SearchWithSuggestions />
      </div>
      <div className="ml-auto hidden md:block">CARD</div>
      <div className="ml-auto block md:hidden">HAMBUGER BTN</div>
    </div>
  );
};

export default MainNavbar;
