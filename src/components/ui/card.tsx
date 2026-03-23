import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'glass' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-surface-container-low rounded-xl",
      glass: "glass-effect rounded-2xl shadow-2xl shadow-black/60 border border-white/5",
    }
    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }
