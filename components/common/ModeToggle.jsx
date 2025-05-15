"use client";

import { Moon, Sun, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ModeToggle() {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchTheme = (theme) => {
    setTheme(theme);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
        <Moon className="h-[1.2rem] w-[1.2rem] block dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      {isMenuOpen && (
        <div className="fixed top-14 right-5 w-52 bg-background px-4 py-2 border rounded-lg">
          <ul>
            <li
              onClick={() => switchTheme("light")}
              className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg"
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" /> Light
            </li>
            <li
              onClick={() => switchTheme("dark")}
              className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg"
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" /> Dark
            </li>
            <li
              onClick={() => switchTheme("system")}
              className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg"
            >
              <Settings className="h-[1.2rem] w-[1.2rem]" /> System
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
