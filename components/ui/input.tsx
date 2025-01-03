import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground hover:!border-primary/25 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/10 focus-visible:!border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
