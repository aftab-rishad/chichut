"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function DropdownModal({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal
  const toggleModal = () => setIsOpen(!isOpen);

  // Close modal on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleModal}
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            className={cn(
              "fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "bg-background border rounded-md shadow-lg p-4 min-w-[250px] w-full max-w-lg"
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Actions</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="w-full h-[0.2px] bg-foreground/10 mb-2" />
            {/* Dropdown Items */}
            <div className="flex flex-col space-y-2">
              {items.map((item, index) => (
                <Button
                  key={index}
                  type="button"
                  disabled={item?.disabled}
                  className="text-sm w-full justify-start"
                  variant="ghost"
                  onClick={() => {
                    item?.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item?.icon} {item?.label}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
