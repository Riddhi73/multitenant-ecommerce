"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import NavbarSidebar from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      {children}
    </Link>
  );
};
const navbarItem = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];
const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>
      <NavbarSidebar
        items={navbarItem}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItem.map((item) => (
          <NavbarItem
            key={item.href}
            {...item}
            isActive={pathName === item.href}
          ></NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg",
          )}
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "default" }),
            "border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg",
          )}
        >
          Start selling
        </Link>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
