import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, RefreshCcw } from "lucide-react";

import { SendModal } from "@/components/modals/SendModal";
import { ReceiveModal } from "@/components/modals/ReceiveModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="gradient" className="w-full justify-start" onClick={() => setSendOpen(true)}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Send assets
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => setReceiveOpen(true)}>
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Receive assets
        </Button>
        <Button variant="secondary" className="w-full justify-start" disabled>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Swap (coming soon)
        </Button>
      </CardContent>
      <SendModal open={sendOpen} onOpenChange={setSendOpen} />
      <ReceiveModal open={receiveOpen} onOpenChange={setReceiveOpen} />
    </Card>
  );
}
