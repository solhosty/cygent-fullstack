import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ className, children, ...props }: SelectPrimitive.SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 opacity-70" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectContent = ({ className, children, ...props }: SelectPrimitive.SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content className={cn("z-50 rounded-md border border-white/10 bg-[#11111a] p-1", className)} {...props}>
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectItem = ({ className, children, ...props }: SelectPrimitive.SelectItemProps) => (
  <SelectPrimitive.Item className={cn("relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm", className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
