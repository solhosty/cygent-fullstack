import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-emerald-500/20 text-emerald-300",
      destructive: "bg-red-500/20 text-red-300"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: Props) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
