import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";

function ChatList({ chat, url = "#" }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link key={chat.id} href={url}>
      <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(chat.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-foreground truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {chat.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate flex-1">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ChatList;
