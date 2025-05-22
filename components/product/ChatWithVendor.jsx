"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Verified } from "../common/Svg";

export default function ChatWithVendor({ vendor, isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "vendor",
      message: "Hello! How can I help you with this product today?",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      {
        sender: "user",
        message: message.trim(),
        timestamp: new Date(),
      },
    ]);

    // Clear input
    setMessage("");

    // Simulate vendor response after a short delay
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "vendor",
          message: "Thank you for your message! I'll get back to you shortly.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const formatTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={vendor?.image} alt={vendor?.name} />
                <AvatarFallback>{vendor?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-start flex-col">
                <span className="flex items-center gap-1">
                  {vendor?.name}{" "}
                  <span className="text-[#1D9BF0] text-xs">
                    <Verified />
                  </span>
                </span>

                <span className="text-sm text-muted-foreground">
                  {vendor?.email}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto p-4 border rounded-md">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  chat.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{chat?.message}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {formatTime(chat?.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex sm:justify-between">
          <div className="flex items-center w-full gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} type="submit">
              Send
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
