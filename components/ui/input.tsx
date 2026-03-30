import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "warm-focus flex h-11 w-full rounded-full border border-border bg-card/94 px-4 py-2 text-sm text-foreground shadow-[var(--shadow-soft)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
