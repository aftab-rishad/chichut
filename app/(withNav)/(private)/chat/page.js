import EmptyChat from "@/components/chat/EmptyChat";
import ChatList from "@/components/chat/ChatList";
import me from "@/graphql/query/me";
import getRooms from "@/graphql/query/rooms";
export const dynamic = "force-dynamic";
async function ChatPage() {
  const session = await me("id");
  const chats = await getRooms(
    { id: session?.id, roomFor: "client" },
    "vendorId clientId id"
  );

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
              {chats &&
                Array.isArray(chats) &&
                chats.map((chat) => (
                  <ChatList
                    listOf="vendor"
                    url={`/chat/${chat.id}`}
                    key={chat?.id}
                    chat={chat}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
