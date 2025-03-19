"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

const RadioGroupContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string>(value || defaultValue || "")

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setInternalValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange],
    )

    return (
      <RadioGroupContext.Provider
        value={{
          value: internalValue,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={cn("grid gap-2", className)} role="radiogroup" {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  },
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, children, ...props }, ref) => {
    const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
    const checked = value === groupValue

    const handleClick = () => {
      onValueChange(value)
    }

    return (
      <div ref={ref} className={cn("flex items-center space-x-2", className)} onClick={handleClick} {...props}>
        <div
          className={cn(
            "h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            checked && "bg-primary",
          )}
          aria-checked={checked}
          role="radio"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault()
              onValueChange(value)
            }
          }}
        >
          {checked && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          )}
        </div>
        {children}
      </div>
    )
  },
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

