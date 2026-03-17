import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="w-2.5 p-[1px]">
        <ScrollAreaPrimitive.Thumb className="rounded-full bg-white/20" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
