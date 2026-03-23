import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary' | 'ghost' | 'outline' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/20 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98]",
      secondary: "bg-surface-container-high hover:bg-surface-container-highest text-on-surface",
      ghost: "hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface",
      outline: "border border-outline-variant/15 hover:bg-surface-container-highest text-on-surface",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
