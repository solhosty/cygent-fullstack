import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({ className, ...props }: DialogPrimitive.DialogOverlayProps) {
  return <DialogPrimitive.Overlay className={cn("fixed inset-0 z-40 bg-black/60", className)} {...props} />;
}

function SheetContent({ side = "right", className, ...props }: DialogPrimitive.DialogContentProps & { side?: "left" | "right" }) {
  const placement = side === "left" ? "left-0" : "right-0";
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(`fixed ${placement} top-0 z-50 h-full w-80 border-white/10 bg-[#0f0f16] p-6`, className)}
        {...props}
      />
    </SheetPortal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetOverlay, SheetPortal, SheetTrigger };
