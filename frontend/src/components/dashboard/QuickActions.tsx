import { useState } from "react";

import { SendModal } from "@/components/modals/SendModal";
import { ReceiveModal } from "@/components/modals/ReceiveModal";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

export function QuickActions() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  return (
    <GlassCard className="space-y-4 p-6">
      <p className="text-sm text-white/60">Quick actions</p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setSendOpen(true)}>Send</Button>
        <Button variant="outline" onClick={() => setReceiveOpen(true)}>
          Receive
        </Button>
      </div>
      <SendModal open={sendOpen} onOpenChange={setSendOpen} />
      <ReceiveModal open={receiveOpen} onOpenChange={setReceiveOpen} />
    </GlassCard>
  );
}
