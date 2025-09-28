"use client";
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
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

function MobileSidebar({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to socket server");
    };
    const handleDisconnect = () => {
      console.log("Disconnected from socket server");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.emit("join-room", {
      roomId: `${id}-vendor`,
    });

    socket.emit("old-unread", {
      id: id,
      unreadFor: "vendorId",
    });

    socket.on("unread-message", ({ unread }) => {
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((err) => {
        console.error("Error playing notification sound:", err);
      });
      setUnreadMessages((prev) => prev + unread);
    });
    socket.on("old-unread", ({ unreadMessages }) => {
      setUnreadMessages(unreadMessages.unreadVendor || 0);
    });

    socket.on("clean-unread", ({ unreadFor, prevUnread }) => {
      if (unreadFor === "unreadVendor") {
        setUnreadMessages((prev) => prev - prevUnread);
      }
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("old-unread");
      socket.off("unread-message");
      socket.off("clean-unread");
    };
  }, []);
  const navigation = [
    {
      name: "Products",
      href: `/seller/${id}/dashboard/products`,
      icon: Package,
    },
    {
      name: "Orders",
      href: `/seller/${id}/dashboard/orders`,
      icon: ShoppingCart,
    },
    {
      name: "Messages",
      href: `/seller/${id}/dashboard/chat`,
      icon: MessageCircleMore,
    },
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
            <Link prefetch href="dashboard" className="flex items-center gap-2">
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
                  prefetch
                  key={item.name}
                  href={item.href}
                  className={`
                flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-foreground/5 duration-300 transition-colors
              
              `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.name === "Messages" && unreadMessages > 0 && (
                    <Badge className="bg-red-500 font-bold text-xs rounded-full w-5 h-5">
                      {unreadMessages}
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
