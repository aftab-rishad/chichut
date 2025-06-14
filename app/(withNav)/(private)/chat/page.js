import EmptyChat from "@/components/chat/EmptyChat";
import ChatList from "@/components/chat/ChatList";

function ChatPage() {
  const chats = [
    {
      id: "1",
      name: "Sarah Chen",
      lastMessage:
        "Hi! I'm interested in the wireless headphones you have listed. Are they still available?",
      timestamp: "15m",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Mike Johnson",
      lastMessage: "Is the iPhone still available?",
      timestamp: "2h",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Emma Wilson",
      lastMessage: "Hi! I saw your laptop listing. Can we negotiate the price?",
      timestamp: "1d",
      unreadCount: 1,
      isOnline: true,
    },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-foreground">Messages</h1>
          </div>
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">
              This is your dedicated space to communicate directly with vendors.
              Whether you have questions about a product, need more details
              before purchasing, or want to follow up on an order, you can
              easily start a conversation here.
            </p>
          </div>
        </div>
        <div className="p-4">
          {chats?.length <= 0 ? (
            <EmptyChat />
          ) : (
            <div className="flex flex-col gap-2">
              {chats.map((chat) => (
                <ChatList url={`/chat/${chat.id}`} key={chat?.id} chat={chat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
