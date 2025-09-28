"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import logout from "@/action/logout";
import { Fragment } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

function NavAvater({ data, brand }) {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button as={Fragment}>
          <button className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-foreground bg-transparent border-0 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">
                {data?.firstName[0] + data?.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </button>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-background border border-border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="flex flex-col">
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {data?.firstName[0] + data?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {data?.firstName} {data?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Menu Items */}
              <div className="py-2">
                <Menu.Item>
                  <Link
                    prefetch
                    href={
                      brand?.id
                        ? `/seller/${brand.id}/dashboard`
                        : "/seller/create"
                    }
                    target="_blank"
                    className="w-full flex items-start px-4 py-2 text-left transition-colorstext-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex flex-col items-start">
                      {brand?.id ? (
                        <>
                          <span className="text-sm">Dashboard</span>
                          <span className="block text-xs text-muted-foreground">
                            View your dashboard
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Become a Seller</span>
                          <span className="block text-xs text-muted-foreground">
                            Start selling on our platform
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link prefetch href="/orders">
                    <button className="w-full flex items-start px-4 py-2 text-left transition-colors text-foreground hover:bg-accent hover:text-accent-foreground">
                      <div className="flex flex-col items-start">
                        <span className="text-sm">Orders</span>
                        <span className="text-xs text-muted-foreground">
                          View order history
                        </span>
                      </div>
                    </button>
                  </Link>
                </Menu.Item>
              </div>
              <Menu.Item>
                <div className="w-full flex items-center justify-between px-4 py-2 transition-colors text-foreground">
                  <div className="flex items-start">
                    <div className="flex flex-col items-start">
                      <span className="text-sm">Dark Mode</span>
                      <span className="text-xs text-muted-foreground">
                        Toggle theme appearance
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                    className="ml-2"
                  />
                </div>
              </Menu.Item>

              {/* Logout Section */}
              <div className="border-t border-border pt-2 pb-2">
                <Menu.Item>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-left transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <span className="text-sm">Logout</span>
                  </button>
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default NavAvater;
