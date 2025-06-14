import Link from "next/link";
import {
  MessageCircleMore,
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import me from "@/graphql/query/me";

async function DesktopSidebar({ id }) {
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

  const user = await me("firstName lastName email");

  return (
    <>
      <div className="hidden h-screen md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
            <Link
              href={`/seller/${id}/dashboard`}
              className="flex items-center gap-2"
            >
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
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center w-full px-3 py-2 text-sm"
                >
                  <div className="flex items-center flex-1">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                      <span className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesktopSidebar;
