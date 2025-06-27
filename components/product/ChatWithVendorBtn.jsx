"use client";

import { Button } from "@/components/ui/button";
import createRoom from "@/graphql/mutation/createRoom";
import getRoomByIds from "@/graphql/query/roomByIds";
import { MessageCircleIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

function ChatWithVendorBtn({ vendor, myBrand, session }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    setLoading(true);
    const createdRoom = await createRoom({ vendorId: vendor?.id }, "id");
    const rooms = await getRoomByIds(
      {
        vendorId: vendor?.id,
        clientId: session?.id,
      },
      "id"
    );
    if (rooms?.id) {
      router.push(`/chat/${rooms?.id}`);
      setLoading(false);
    } else {
      if (createdRoom?.error) {
        toast.error(createdRoom?.error);
        setLoading(false);
      } else {
        toast.success("Room created successfully.");
        router.push(`/chat/${createdRoom?.id}`);
        setLoading(false);
      }
    }
  };

  return (
    <Button
      onClick={handleCreateRoom}
      disabled={vendor?.name === myBrand?.name || !session?.id || loading}
      className="w-full"
      variant="outline"
    >
      {loading ? (
        <>
          <LoaderIcon className="mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        <>
          {" "}
          <MessageCircleIcon className="mr-2 h-4 w-4" />
          Chat with Vendor
        </>
      )}
    </Button>
  );
}

export default ChatWithVendorBtn;
