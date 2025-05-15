"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import AvaterOpen from "./AvaterOpen";

function NavAvater({ data }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <Avatar
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer relative"
      >
        <AvatarFallback className="text-primary select-none font-semibold bg-primary/20 border border-primary/30">
          {data?.firstName[0] + data?.lastName[0]}
        </AvatarFallback>
      </Avatar>
      {isDropdownOpen && <AvaterOpen data={data} />}
    </>
  );
}

export default NavAvater;
