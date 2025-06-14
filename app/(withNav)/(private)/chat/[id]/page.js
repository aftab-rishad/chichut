import Messages from "@/components/chat/id/Messages";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";

function ChatRoomPage() {
  const chat = {
    name: "Mike Johnson",
    isOnline: false,
    messages: [
      {
        id: "1",
        content: "Is the iPhone still available?",
        sender: "client",
        timestamp: "12:15 PM",
      },
      {
        id: "2",
        content:
          "Yes, it's still available. It's an iPhone 13 Pro in excellent condition.",
        sender: "vendor",
        timestamp: "12:45 PM",
      },
    ],
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  if (!chat) return <ChatNotFound />;
  return (
    <div className={`min-h-screen transition-colors duration-200`}>
      <div className="h-screen flex flex-col bg-background text-foreground">
        <div className="flex fixed top-0 z-50 w-full items-center justify-between p-4 border-b border-border bg-background">
          <div className="flex items-center space-x-3">
            <Link href="/chat">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(chat.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-foreground">{chat.name}</h1>
              <p className="text-sm text-muted-foreground">
                {chat.isOnline ? "Online now" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Messages chat={chat} chatFor="client" />
      </div>
    </div>
  );
}

const ChatNotFound = () => {
  return (
    <div className="h-[80vh] bg-background text-foreground flex items-center justify-center">
      <Card className="p-8 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Chat not found
        </h2>
        <p className="text-muted-foreground mb-4">
          This conversation doesn't exist.
        </p>
        <Link href="/chat">
          <Button variant="outline">Back to Messages</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ChatRoomPage;
