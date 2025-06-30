"use client";

import { TypingIcon } from "@/components/common/Svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Messages({ chat, chatFor, roomId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [showTime, setShowTime] = useState(1);

  const scrollRef = useRef(null);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to socket server");
    };
    const handleDisconnect = () => {
      console.log("Disconnected from socket server");
    };
    socket.on("connect", handleConnect);
    socket.emit("join-room", { roomId });
    socket.emit("join-room", {
      roomId: `${chat?.id}-${chatFor}`,
    });

    socket.emit("old-messages", { roomId });
    socket.emit("clean-unread", {
      roomId,
      unreadFor: chatFor === "client" ? "unreadClient" : "unreadVendor",
    });

    socket.on("old-messages", (oldMessages) => {
      setMessages(oldMessages);
    });

    socket.on("typing", (isTyping) => {
      setTyping(isTyping);
      setTimeout(() => {
        setTyping(false);
      }, 3000);
    });
    socket.on("new-message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    });

    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("old-messages");
      socket.off("typing");
      socket.off("new-message");
    };
  }, []);

  const handleChangeMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (value.trim()) {
      socket.emit("typing", { roomId });
    }
    if (value.length <= 0) {
      setTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send-message", {
        roomId,
        message: message.trim(),
        sender: chatFor,
      });
      setMessage("");
      setTyping(false);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
    if (chatFor === "client") {
      socket.emit("send-notification", {
        title: `New message in your brand's chat room (${roomId})`,
        message: "You have received a new message from a customer.",
        userId: chat?.vendor?.userId,
        url: `/seller/${chat?.vendor?.id}/dashboard/chat/${roomId}`,
      });
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col justify-center items-center p-4",
          chatFor === "client" ? "mt-6" : ""
        )}
      >
        <Avatar className="w-20 h-20 flex-shrink-0">
          <AvatarImage src={chat?.image} />
          <AvatarFallback className={`text-xl bg-primary/20 text-primary`}>
            {getInitials(chat?.name)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{chat?.name}</h2>
        <p className="text-foreground/80 w-[80vw] md:w-[50vw] line-clamp-2 md:line-clamp-1 text-center">
          {chat?.description}
        </p>
      </div>
      <div className="flex-1 p-4 space-y-4 bg-background">
        {messages?.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex items-center space-x-3 ${
              msg.sender === chatFor ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={chat[msg?.sender]?.image} />
              <AvatarFallback
                className={`${
                  msg.sender === chatFor
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {getInitials(chat[msg?.sender]?.name || msg.sender)}
              </AvatarFallback>
            </Avatar>

            {/* Message Content */}
            <div
              onMouseEnter={() => setShowTime(i)}
              onMouseLeave={() => setShowTime(null)}
              className={`flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                msg.sender === chatFor ? "items-end" : "items-start"
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-2 break-words ${
                  msg.sender === chatFor
                    ? "bg-primary rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
            <span
              className={cn(
                "text-xs text-muted-foreground transition-opacity duration-300",
                i === showTime ? "opacity-100" : "opacity-0"
              )}
            >
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                  })
                : "Just now"}
            </span>
          </div>
        ))}
        {typing && (
          <div className={`flex items-start space-x-3`}>
            <div
              className={`flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl items-start`}
            >
              <TypingIcon />
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-border sticky bottom-0 p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={handleChangeMessage}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-32 resize-none pr-12 bg-background border-input text-foreground placeholder:text-muted-foreground"
              rows={1}
            />
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={!message.trim()}
            size="lg"
            className="md:w-36"
          >
            <span className="hidden md:flex">Send Message</span>
            <Send className="h-8 w-8" />
          </Button>
        </form>
      </div>
      <div className="h-0 w-0" ref={scrollRef} />
    </>
  );
}

export default Messages;
