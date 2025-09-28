import Messages from "@/components/chat/id/Messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import me from "@/graphql/query/me";
import getRoomById from "@/graphql/query/roomById";
import brand from "@/graphql/query/brand";
import getUser from "@/graphql/query/user";
export const dynamic = "force-dynamic";
async function ChatRoomPage({ params: { id } }) {
  const session = await me("id");
  const chat = await getRoomById({ id }, "clientId vendorId");
  const user = await getUser({ id: chat?.clientId }, "id firstName lastName");
  const store = await brand(
    { id: chat?.vendorId },
    "id userId name image description"
  );

  const chatInfo = {
    id: user?.id,
    name: store?.name,
    image: store?.image,
    description: store?.description,
    vendor: {
      id: store?.id,
      userId: store?.userId,
      name: store?.name,
      image: store?.image,
    },
    client: {
      id: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      image: undefined,
    },
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);
  };
  if (chat?.clientId !== session?.id) return <ChatNotFound />;
  return (
    <div className={`min-h-screen transition-colors duration-200`}>
      <div className="h-screen flex flex-col bg-background text-foreground">
        <div className="flex fixed top-0 z-50 w-full items-center justify-between p-4 border-b border-border bg-background">
          <div className="flex items-center space-x-3">
            <Link prefetch href="/chat">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Avatar className="w-10 h-10">
              <AvatarImage src={store?.image} alt={`${store?.name} Logo`} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(store?.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-foreground">{store?.name}</h1>
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
        <Messages roomId={id} chat={chatInfo} chatFor="client" />
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
        <Link prefetch href="/chat">
          <Button variant="outline">Back to Messages</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ChatRoomPage;
