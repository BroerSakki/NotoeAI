import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:border-[color:var(--color-ring)] focus-visible:ring-[3px] focus-visible:ring-[color-mix(in oklch, var(--color-ring), transparent 50%)] aria-invalid:ring-[color-mix(in oklch, var(--color-destructive), transparent 20%)] dark:aria-invalid:ring-[color-mix(in oklch, var(--color-destructive), transparent 40%)] aria-invalid:border-[color:var(--color-destructive)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35 font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/25 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-destructive/35 font-semibold",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary/20 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 font-semibold",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/25 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/35 font-semibold",
        ghost:
          "bg-transparent text-foreground hover:bg-accent/20 hover:text-accent transform hover:-translate-y-0.5 font-semibold",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 font-semibold",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
