"use client";

import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import me from "@/graphql/query/me";

function ChatIconNav() {
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

    (async function () {
      try {
        const session = await me("id");
        if (session?.id) {
          socket.emit("join-room", {
            roomId: `${session.id}-client`,
          });
          socket.emit("old-unread", {
            id: session.id,
            unreadFor: "clientId",
          });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    })();

    socket.on("unread-message", ({ unread }) => {
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((err) => {
        console.error("Error playing notification sound:", err);
      });
      setUnreadMessages((prev) => prev + unread);
    });
    socket.on("old-unread", ({ unreadMessages }) => {
      setUnreadMessages(unreadMessages.unreadClient || 0);
    });

    socket.on("clean-unread", ({ unreadFor, prevUnread }) => {
      if (unreadFor === "unreadClient") {
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

  return (
    <Link href="/chat">
      <Button variant="ghost" size="icon" className="flex relative">
        {unreadMessages > 0 && (
          <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 z-50">
            {unreadMessages}
            <span className="sr-only">Unread messages</span>
          </Badge>
        )}
        <MessageCircleMore className="h-5 w-5" />
        <span className="sr-only">Message</span>
      </Button>
    </Link>
  );
}

export default ChatIconNav;
