import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay({ className, ...props }: DialogPrimitive.DialogOverlayProps) {
  return <DialogPrimitive.Overlay className={cn("fixed inset-0 z-40 bg-black/60", className)} {...props} />;
}

function DialogContent({ className, ...props }: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#0f0f16] p-6",
          className
        )}
        {...props}
      />
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

const DialogTitle = DialogPrimitive.Title;

export { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
