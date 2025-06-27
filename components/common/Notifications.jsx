"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import me from "@/graphql/query/me";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Notifications() {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

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
        setUserId(session?.id);
        if (session?.id) {
          socket.emit("join-room", {
            roomId: `${session?.id}-client`,
          });
          socket.emit("get-notifications", {
            userId: session?.id,
          });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    })();
    socket.on("notifications", (notifications) => {
      setNotifications(notifications);
      const unreadCount = notifications.filter((n) => !n.read).length;
      setUnreadNotifications(unreadCount);
    });
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadNotifications((prev) => prev + 1);
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((err) => {
        console.error("Error playing notification sound:", err);
      });
      toast(
        <span className="text-sm">
          {notification?.title ?? "New Notification"}
        </span>,
        {
          description: (
            <span className="text-xs">
              {notification?.message ?? "You have a new message."}
            </span>
          ),
          icon: (
            <span className="text-primary">
              <Bell />
            </span>
          ),
        }
      );
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  const handleClickNotification = (url, id) => {
    router.push(url);
    socket.emit("read-notification", { id });
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadNotifications((prev) => prev - 1);
  };

  const handleClearNotifications = () => {
    socket.emit("clear-notifications", {
      userId,
    });
    setNotifications([]);
    setUnreadNotifications(0);
  };

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <Menu.Button as={Fragment}>
        <button className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-foreground bg-transparent border-0 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:flex relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadNotifications}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
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
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-background border border-border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="flex flex-col">
            {/* Notification Header */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Notifications
                </h3>
                <button
                  onClick={handleClearNotifications}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-accent"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Notification Items */}
            <div className="max-h-96 overflow-y-auto">
              <div className="py-2">
                {/* Order Update Notification */}
                {notifications.length === 0 ? (
                  <div className="px-4 py-3 text-center text-muted-foreground">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <Menu.Item
                      onClick={() =>
                        handleClickNotification(
                          notification?.url,
                          notification?.id
                        )
                      }
                      key={notification?.id}
                      as={Fragment}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 cursor-pointer hover:bg-accent/50",
                          !notification?.read
                            ? "border-l-2 border-l-primary"
                            : "border-l-2 border-l-transparent"
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          {!notification?.read && (
                            <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {notification?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(
                                notification?.createdAt
                              ).toLocaleTimeString([], {
                                month: "short",
                                year: "numeric",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                )}
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Notifications;
