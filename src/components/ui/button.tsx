import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors font-mono",
          variant === 'default' && "bg-hl-cyan text-hl-bg hover:bg-cyan-300",
          variant === 'outline' && "border border-hl-cyan/50 text-hl-cyan hover:bg-hl-cyan/10",
          size === 'default' && "h-10 px-4 py-2",
          size === 'sm' && "h-8 px-3 text-xs",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
