import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import brand from "@/graphql/query/brand";
import getUser from "@/graphql/query/user";
import Link from "next/link";
import UnreadForList from "./UnreadForList";

async function ChatList({ chat, url = "#", listOf }) {
  const store = await brand(
    { id: chat?.vendorId },
    "id name image description"
  );
  const user = await getUser(
    { id: chat?.clientId },
    "id firstName lastName email"
  );

  const data =
    listOf === "vendor"
      ? store
      : {
          id: user?.id,
          name: `${user?.firstName} ${user?.lastName}`,
          image: undefined,
          description: user?.email,
        };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);
  };

  return (
    <Link key={chat.id} href={url}>
      <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={data?.image} alt="Chat Logo" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(data?.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-foreground truncate">
                {data?.name}
              </h3>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {data?.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate flex-1">
                {data?.description}
              </p>
            </div>
          </div>
          <UnreadForList
            id={listOf === "vendor" ? chat?.clientId : chat?.vendorId}
            listOf={listOf === "vendor" ? "client" : "vendor"}
            roomId={chat?.id}
          />
        </div>
      </Card>
    </Link>
  );
}

export default ChatList;
