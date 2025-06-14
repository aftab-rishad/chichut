"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

function Messages({ chat, chatFor }) {
  const [message, setMessage] = useState("");

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {chat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === chatFor ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback
                className={`text-xs ${
                  msg.sender === chatFor
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {getInitials(msg.sender)}
              </AvatarFallback>
            </Avatar>

            {/* Message Content */}
            <div
              className={`flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                msg.sender === chatFor ? "items-end" : "items-start"
              }`}
            >
              {/* Sender Name */}
              <span className="text-xs mb-1 px-1 text-muted-foreground">
                {msg.sender}
              </span>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-2 break-words ${
                  msg.sender === chatFor
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>

              {/* Timestamp */}
              <span className="text-xs mt-1 px-1 text-muted-foreground">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border sticky bottom-0 p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            className="w-36"
          >
            Send Message <Send className="h-8 w-8" />
          </Button>
        </form>
      </div>
    </>
  );
}

export default Messages;
