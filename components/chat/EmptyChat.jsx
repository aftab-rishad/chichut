import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
function EmptyChat() {
  return (
    <div className="bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Chat Found
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {
              "There are no conversations available at the moment. Start a new chat to begin messaging."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmptyChat;
