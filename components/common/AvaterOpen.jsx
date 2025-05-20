"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HistoryIcon, LogOutIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import logout from "@/action/logout";

function AvaterOpen({ data, brand }) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:absolute md:top-14 md:right-10 bottom-0 static gap-4 md:w-72 w-full rounded-lg h-fit bg-background md:shadow-md md:border p-2 flex flex-col items-start">
      <div className="hidden md:flex items-center gap-2 bg-primary/10 rounded-lg p-2 w-full">
        <Avatar className="cursor-pointer">
          <AvatarFallback className="text-primary font-semibold bg-primary/20 border border-primary/30">
            {data?.firstName[0] + data?.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">
            {data?.firstName} {data?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{data?.email}</p>
        </div>
      </div>
      <hr className="w-full" />
      <ul className="flex flex-col w-full">
        <li className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg">
          {brand ? (
            <>
              <LayoutDashboardIcon size={20} />{" "}
              <Link target="_blank" href={`/seller/${brand?.id}/dashboard`}>
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <LayoutDashboardIcon size={20} />{" "}
              <Link href="/seller/create">Become a seller</Link>
            </>
          )}
        </li>

        <li className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg">
          <HistoryIcon size={20} /> <Link href="/orders">Orders</Link>
        </li>
        <li className="hover:bg-foreground/10 gap-2 flex items-center duration-100 cursor-pointer w-full px-4 py-2 rounded-lg">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer gap-2 flex items-center"
          >
            <LogOutIcon size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AvaterOpen;
