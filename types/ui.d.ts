// Common types used across UI components
declare namespace UI {
  type Align = "start" | "center" | "end"
  type Side = "top" | "right" | "bottom" | "left"

  interface AsChildProps {
    asChild?: boolean
  }

  interface OpenProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }

  interface ValueProps<T> {
    value?: T
    defaultValue?: T
    onValueChange?: (value: T) => void
  }
}

