"use client";
import { useState } from "react";
import {
  MessageCircleMore,
  CreditCard,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

function MobileSidebar({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    { name: "Dashboard", href: `/seller/${id}/dashboard`, icon: Home },
    {
      name: "Products",
      href: `/seller/${id}/dashboard/products`,
      icon: Package,
    },
    {
      name: "Orders",
      href: "#",
      icon: ShoppingCart,
      badge: "0",
    },
    { name: "Customers", href: "#", icon: Users },
    {
      name: "Messages",
      href: `/seller/${id}/dashboard/chat`,
      icon: MessageCircleMore,
    },
    { name: "Payments", href: "#", icon: CreditCard },
    { name: "Settings", href: "#", icon: Settings },
  ];
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden absolute left-0 mx-2 mt-10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
            <Link href="dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">ChicHut</span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-foreground/5 duration-300 transition-colors
              
              `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
