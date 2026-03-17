import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn("glass-sm inline-flex rounded-xl p-1", className)} {...props} />
);
export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-lg px-3 py-1.5 text-sm text-white/70 transition data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/40 data-[state=active]:to-accent/30 data-[state=active]:text-white",
      className
    )}
    {...props}
  />
);
export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn("mt-2", className)} {...props} />
);
