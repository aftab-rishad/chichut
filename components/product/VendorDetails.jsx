import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Verified } from "../common/Svg";
import brand from "@/graphql/query/brand";
import me from "@/graphql/query/me";
import ChatWithVendorBtn from "./ChatWithVendorBtn";

async function VendorDetails({ vendor = {} }) {
  const session = await me("id");
  const myBrand = await brand({ userId: Number(session?.id) }, "name");

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
          <div>
            <ChatWithVendorBtn
              myBrand={myBrand}
              vendor={vendor}
              session={session}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default VendorDetails;
