"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children?: React.ReactNode
}

const AccordionContext = React.createContext<{
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  type: "single" | "multiple"
  collapsible: boolean
}>({
  value: "",
  onValueChange: () => {},
  type: "single",
  collapsible: false,
})

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    { type = "single", collapsible = false, defaultValue, value, onValueChange, className, children, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      value || defaultValue || (type === "multiple" ? [] : ""),
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        const newValue = (() => {
          if (type === "single") {
            if (itemValue === internalValue) {
              return collapsible ? "" : internalValue
            }
            return itemValue
          }

          // Multiple
          const currentValues = Array.isArray(internalValue) ? internalValue : []
          if (currentValues.includes(itemValue)) {
            return currentValues.filter((v) => v !== itemValue)
          }
          return [...currentValues, itemValue]
        })()

        setInternalValue(newValue)
        onValueChange?.(newValue)
      },
      [internalValue, type, collapsible, onValueChange],
    )

    return (
      <AccordionContext.Provider
        value={{
          value: internalValue,
          onValueChange: handleValueChange as (value: string | string[]) => void,
          type,
          collapsible,
        }}
      >
        <div ref={ref} className={cn("space-y-1", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    return <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
  },
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }
>(({ className, children, value, ...props }, ref) => {
  const { value: contextValue, onValueChange, type } = React.useContext(AccordionContext)
  const isExpanded =
    type === "single"
      ? contextValue === value
      : Array.isArray(contextValue) && value
        ? contextValue.includes(value)
        : false

  const handleClick = () => {
    if (value) {
      onValueChange(value)
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      onClick={handleClick}
      aria-expanded={isExpanded}
      data-state={isExpanded ? "open" : "closed"}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: string }>(
  ({ className, children, value, ...props }, ref) => {
    const { value: contextValue, type } = React.useContext(AccordionContext)
    const isExpanded =
      type === "single"
        ? contextValue === value
        : Array.isArray(contextValue) && value
          ? contextValue.includes(value)
          : false

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm",
          isExpanded ? "animate-accordion-down" : "animate-accordion-up",
          !isExpanded && "hidden",
          className,
        )}
        data-state={isExpanded ? "open" : "closed"}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    )
  },
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
