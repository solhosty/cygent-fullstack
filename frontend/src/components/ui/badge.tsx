import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", {
  variants: {
    variant: {
      default: "border-emerald-400/20 bg-emerald-400/15 text-emerald-200",
      secondary: "border-white/15 bg-white/10 text-white/90",
      outline: "border-white/20 bg-transparent text-white/80",
      warning: "border-amber-300/20 bg-amber-400/15 text-amber-100",
      destructive: "border-red-300/20 bg-red-500/15 text-red-200"
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
