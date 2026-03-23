import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-primary/10 text-primary border border-primary/20",
      secondary: "bg-secondary-container/20 text-secondary border border-secondary/20",
      tertiary: "bg-tertiary/10 text-tertiary border border-tertiary/20",
      outline: "border border-outline-variant/15 text-on-surface-variant",
    }
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center rounded px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-widest", variants[variant], className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
