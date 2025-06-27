import EmptyChat from "@/components/chat/EmptyChat";
import ChatList from "@/components/chat/ChatList";
import getRooms from "@/graphql/query/rooms";

export const dynamic = "force-dynamic";

async function ChatPageForVendor({ params: { id } }) {
  const chats = await getRooms(
    { id, roomFor: "vendor" },
    "clientId vendorId id"
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
              Stay connected with your buyers. Respond promptly to inquiries
              about your products to improve customer satisfaction and boost
              your sales.
            </p>
          </div>
        </div>
        <div className="p-4">
          {chats?.length <= 0 ? (
            <EmptyChat />
          ) : (
            <div className="flex flex-col gap-2">
              {chats.map((chat) => (
                <ChatList
                  listOf="client"
                  key={chat?.id}
                  url={`/seller/${id}/dashboard/chat/${chat?.id}`}
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

export default ChatPageForVendor;
