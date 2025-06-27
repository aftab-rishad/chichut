"use client";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
function UnreadForList({ id, listOf, roomId }) {
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to socket server");
    };
    const handleDisconnect = () => {
      console.log("Disconnected from socket server");
    };

    socket.emit("join-room", {
      roomId: `${id}-${listOf}`,
    });
    socket.emit("old-unread-for-list", { id: roomId });

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.on("unread-message", ({ unread, id }) => {
      if (Number(id) !== Number(roomId)) return;
      setUnreadMessages((prev) => prev + unread);
    });
    socket.on("old-unread-for-list", ({ unreadVendor, unreadClient, id }) => {
      if (Number(id) !== Number(roomId)) return;
      if (listOf === "vendor") {
        setUnreadMessages(unreadVendor);
      } else if (listOf === "client") {
        setUnreadMessages(unreadClient);
      }
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("unread-messages");
    };
  }, []);

  return (
    <>
      {unreadMessages > 0 && (
        <Badge className="bg-red-500 font-bold text-xs rounded-full w-5 h-5">
          {unreadMessages}
          <span className="sr-only">Unread messages</span>
        </Badge>
      )}
    </>
  );
}

export default UnreadForList;
