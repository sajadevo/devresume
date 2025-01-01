import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-all duration-300 [text-shadow:0_0.5px_1px_#02061766]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-primary to-primary-dark text-primary-foreground ring ring-primary-dark inset-shadow-2xs inset-shadow-white/20 hover:brightness-125 hover:saturate-125 active:brightness-100 active:saturate-100",
        github:
          "bg-github text-white ring ring-black inset-shadow-2xs inset-shadow-white/30 hover:brightness-150 hover:saturate-150 active:brightness-100 active:saturate-100",
        linkedin:
          "bg-linkedin text-white ring ring-linkedin-dark inset-shadow-2xs inset-shadow-white/20 hover:brightness-110 hover:saturate-110 active:brightness-100 active:saturate-100",
        destructive:
          "bg-gradient-to-t from-destructive to-destructive-dark text-destructive-foreground ring ring-destructive-dark inset-shadow-2xs inset-shadow-white/20 hover:brightness-110 hover:saturate-110 active:brightness-100 active:saturate-100",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white text-black ring ring-border [text-shadow:none]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs [text-shadow:0_0.5px_1px_#02061733]",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
