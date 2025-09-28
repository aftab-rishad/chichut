import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";
import getRoomById from "@/graphql/query/roomById";
import getUser from "@/graphql/query/user";
import brand from "@/graphql/query/brand";
import dynamicImport from "next/dynamic";

const Messages = dynamicImport(() => import("@/components/chat/id/Messages"), {
  ssr: false,
});

export const dynamic = "force-dynamic";

async function ChatRoomPageForVendor({ params: { roomId, id } }) {
  const chat = await getRoomById({ id: roomId }, "clientId vendorId");
  const user = await getUser(
    { id: chat?.clientId },
    "id firstName lastName email"
  );
  const store = await brand({ id: chat?.vendorId }, "id userId name image");

  const chatInfo = {
    id: store?.id,
    name: `${user?.firstName} ${user?.lastName}`,
    image: undefined,
    description: user?.email,
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
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  if (chat?.vendorId !== id) return <ChatNotFound id={id} />;
  return (
    <div
      className={`min-h-screen transition-colors duration-200 bg-background`}
    >
      <div className="h-screen gap-4 flex flex-col bg-background text-foreground">
        <div className="flex sticky top-0 z-50 items-center w-full justify-between p-4 border-b border-border bg-background">
          <div className="flex items-center space-x-3">
            <Link
              prefetch
              href={`/seller/${id}/dashboard/chat`}
              className="flex md:hidden"
            >
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
                {getInitials(`${user.firstName} ${user?.lastName}`)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-foreground">
                {user.firstName} {user?.lastName}
              </h1>
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
        <Messages roomId={roomId} chat={chatInfo} chatFor="vendor" />
      </div>
    </div>
  );
}

const ChatNotFound = ({ id }) => {
  return (
    <div className="h-[80vh] bg-background text-foreground flex items-center justify-center">
      <Card className="p-8 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Chat not found
        </h2>
        <p className="text-muted-foreground mb-4">
          This conversation doesn't exist.
        </p>
        <Link prefetch href={`/seller/${id}/dashboard/chat`}>
          <Button variant="outline">Back to Messages</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ChatRoomPageForVendor;
