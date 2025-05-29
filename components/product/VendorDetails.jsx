"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { Verified } from "../common/Svg";
import ChatWithVendor from "./ChatWithVendor";

function VendorDetails({ vendor = {} }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Vendor Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={vendor?.image} alt={vendor?.name} />
              <AvatarFallback>{vendor?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-medium">{vendor?.name}</h3>
                <span className="text-[#1D9BF0] text-xs">
                  <Verified />
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {vendor?.location || "Location not available"}
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-full"
            variant="outline"
          >
            <MessageCircleIcon className="mr-2 h-4 w-4" />
            Chat with Vendor
          </Button>
        </CardContent>
      </Card>
      <ChatWithVendor
        vendor={vendor}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}

export default VendorDetails;
