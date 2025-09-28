"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AvaterOpen from "./AvaterOpen";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavAvater from "./NavAvater";
import { Dancing_Script } from "next/font/google";
import Notifications from "./Notifications";
import ChatIconNav from "../chat/ChatIconNav";
import SearchProduct from "./SearchProduct";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const categories = {
  women: [
    {
      name: "Dresses",
      href: "/products?category=women&subCategory=Dresses",
    },
    {
      name: "Tops",
      href: "/products?category=women&subCategory=Tops",
    },
    {
      name: "Bottoms",
      href: "/products?category=women&subCategory=Bottoms",
    },
    {
      name: "Accessories",
      href: "/products?category=women&subCategory=Accessories",
    },
  ],
  men: [
    {
      name: "Shirts",
      href: "/products?category=men&subCategory=Shirts",
    },
    {
      name: "Pants",
      href: "/products?category=men&subCategory=Pants",
    },
    {
      name: "Outerwear",
      href: "/products?category=men&subCategory=Outerwear",
    },
    {
      name: "Accessories",
      href: "/products?category=men&subCategory=Accessories",
    },
  ],
  kids: [
    {
      name: "Boys",
      href: "/products?category=kids&subCategory=Boys",
    },
    {
      name: "Girls",
      href: "/products?category=kids&subCategory=Girls",
    },
    {
      name: "Baby",
      href: "/products?category=kids&subCategory=Baby",
    },
  ],
};

export default function Navbar({ session, brand }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                {/* Fixed Header */}
                <div className="p-4 border-b">
                  <Link
                    prefetch
                    href="/"
                    className={`flex items-center text-3xl font-bold text-primary gap-2 ${dancingScript.className}`}
                  >
                    ChicHut
                  </Link>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      {!session?.email && (
                        <>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            asChild
                          >
                            <Link prefetch href="/register">
                              Create Account
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <Link prefetch href="/login">
                              Login
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="relative flex space-x-2">
                      <SearchProduct />
                    </div>
                    {session?.email && (
                      <div className="flex py-2 bg-border/50 px-4 rounded-md mt-4 items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {session?.firstName[0] + session?.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium leading-none text-foreground">
                            {session?.firstName} {session?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {session?.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="women">
                        <AccordionTrigger>Women</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-1">
                            {categories.women.map((item) => (
                              <Link
                                prefetch
                                key={item.name}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="men">
                        <AccordionTrigger>Men</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-1">
                            {categories.men.map((item) => (
                              <Link
                                prefetch
                                key={item.name}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="kids">
                        <AccordionTrigger>Kids</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-1">
                            {categories.kids.map((item) => (
                              <Link
                                prefetch
                                key={item.name}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex flex-col space-y-3 pt-2">
                      <Link
                        prefetch
                        href="/brands"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        Brands
                      </Link>
                    </div>
                    {session?.email && (
                      <AvaterOpen brand={brand} data={session} />
                    )}
                  </div>
                </div>

                {/* Fixed Footer */}
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Need help?
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link prefetch href="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>

            <Link
              prefetch
              href="/"
              className={`flex items-center text-3xl font-bold text-primary gap-2 ${dancingScript.className}`}
            >
              ChicHut
            </Link>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-0">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Women</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] font-medium p-2">
                  {categories.women.map((item) => (
                    <li key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          prefetch
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Men</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] font-medium p-2">
                  {categories.men.map((item) => (
                    <li key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          prefetch
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Kids</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] font-medium p-2">
                  {categories.kids.map((item) => (
                    <li key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          prefetch
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                prefetch
                href="/brands"
                className={navigationMenuTriggerStyle()}
              >
                Brands
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search */}
          <div className="hidden space-x-2 md:flex relative w-full max-w-sm items-center">
            <SearchProduct />
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {!session?.email ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link prefetch href="/login">
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link prefetch href="/register">
                    Create Account
                  </Link>
                </Button>
              </>
            ) : (
              <NavAvater brand={brand} data={session} />
            )}
          </div>

          <div className="flex items-center">
            {/* Cart */}
            <Link prefetch href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Message */}
            <ChatIconNav />
            {/* Notifications */}
            <Notifications />
          </div>

          {/* Account - Mobile */}
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 border-t">
          <div className="relative flex space-x-2">
            <SearchProduct />
          </div>
        </div>
      )}
    </header>
  );
}
