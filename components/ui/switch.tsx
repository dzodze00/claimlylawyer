"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || defaultChecked || false)

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked
    setIsChecked(newChecked)
    onCheckedChange?.(newChecked)
    props.onChange?.(event)
  }

  return (
    <label className={cn("relative inline-flex items-center cursor-pointer", className)}>
      <input
        type="checkbox"
        ref={ref}
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-primary" : "bg-input",
        )}
        data-state={isChecked ? "checked" : "unchecked"}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            isChecked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </div>
    </label>
  )
})
Switch.displayName = "Switch"

export { Switch }

