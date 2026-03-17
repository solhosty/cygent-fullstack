import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm ring-offset-background",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primarySoft focus-visible:ring-offset-0",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";
