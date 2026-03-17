import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({ className, ...props }: DialogPrimitive.DialogOverlayProps) {
  return <DialogPrimitive.Overlay className={cn("fixed inset-0 z-40 bg-black/65 backdrop-blur-sm", className)} {...props} />;
}

function SheetContent({
  side = "right",
  className,
  ...props
}: DialogPrimitive.DialogContentProps & { side?: "left" | "right" | "bottom" }) {
  const placement = side === "left" ? "left-0 top-0" : side === "bottom" ? "bottom-0 left-0 right-0" : "right-0 top-0";
  const sizing = side === "bottom" ? "max-h-[78vh] w-full" : "h-full w-80";
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          `glass fixed ${placement} z-50 ${sizing} p-6 data-[state=open]:animate-in data-[state=closed]:animate-out`,
          side === "left" && "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          side === "right" && "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          side === "bottom" && "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          className
        )}
        {...props}
      />
    </SheetPortal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetOverlay, SheetPortal, SheetTrigger };
