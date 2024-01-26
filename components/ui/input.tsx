import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftDecorator?: React.ReactNode;
  rightDecorator?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftDecorator, rightDecorator, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftDecorator && (
          <span className="bg-muted p-2 absolute left-0 top-0 rounded-l font-bold text-muted-foreground">
            {leftDecorator}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            leftDecorator && "pl-14",
            rightDecorator && "pr-14",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightDecorator && (
          <span className="bg-muted p-2 absolute right-0 top-0 rounded-r font-bold text-muted-foreground">
            {rightDecorator}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
