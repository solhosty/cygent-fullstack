import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn("inline-flex rounded-md bg-white/10 p-1", className)} {...props} />
);
export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger className={cn("rounded px-3 py-1.5 text-sm data-[state=active]:bg-white/15", className)} {...props} />
);
export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn("mt-2", className)} {...props} />
);
