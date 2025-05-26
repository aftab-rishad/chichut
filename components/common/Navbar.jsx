"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ModeToggle from "@/components/common/ModeToggle";
import AvaterOpen from "./AvaterOpen";
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

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const categories = {
  women: [
    {
      name: "Dresses",
      href: "#",
    },
    {
      name: "Tops",
      href: "#",
    },
    {
      name: "Bottoms",
      href: "#",
    },
    {
      name: "Accessories",
      href: "#",
    },
  ],
  men: [
    {
      name: "Shirts",
      href: "#",
    },
    {
      name: "Pants",
      href: "#",
    },
    {
      name: "Outerwear",
      href: "#",
    },
    {
      name: "Accessories",
      href: "#",
    },
  ],
  kids: [
    {
      name: "Boys",
      href: "#",
    },
    {
      name: "Girls",
      href: "#",
    },
    {
      name: "Baby",
      href: "#",
    },
    {
      name: "Teens",
      href: "#",
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
                            <Link href="/register">Create Account</Link>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/login">Login</Link>
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products, brands..."
                        className="pl-8 w-full"
                      />
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="women">
                        <AccordionTrigger>Women</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-1">
                            {categories.women.map((item) => (
                              <Link
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
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        Brands
                      </Link>
                      <Link
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        Sale
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
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>

            <Link
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
              <Link href="#" className={navigationMenuTriggerStyle()}>
                Brands
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" className={navigationMenuTriggerStyle()}>
                Sale
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, brands..."
              className="pl-8 bg-muted/50"
            />
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
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/register">Create Account</Link>
                </Button>
              </>
            ) : (
              <NavAvater brand={brand} data={session} />
            )}
          </div>

          <div className="flex items-center">
            {/* Wishlist - Desktop */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <ModeToggle />
          </div>

          {/* Account - Mobile */}
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 border-t">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, brands..."
              className="pl-8 w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
