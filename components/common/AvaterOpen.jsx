"use client";
import { Settings } from "lucide-react";
import logout from "@/action/logout";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

function AvaterOpen({ data, brand }) {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="right-0 mt-2 w-64 origin-top-right bg-background rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="flex flex-col">
          {/* Profile Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                Account Settings
              </span>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Profile Menu Items */}
          <>
            <div className="py-2">
              <div>
                <Link
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
              </div>

              <div>
                <Link href="/orders">
                  <button className="w-full flex items-start px-4 py-2 text-left transition-colors text-foreground hover:bg-accent hover:text-accent-foreground">
                    <div className="flex flex-col items-start">
                      <span className="text-sm">Orders</span>
                      <span className="text-xs text-muted-foreground">
                        View order history
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div>
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
            </div>
            <div className="border-t border-border pt-2 pb-2">
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-left transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-700 dark:hover:text-red-400"
                >
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default AvaterOpen;
