"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover = ({ children, open, onOpenChange }: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onOpenChange: handleOpenChange,
          })
        }
        return child
      })}
    </>
  )
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
    asChild?: boolean
  }
>(({ className, isOpen, onOpenChange, asChild, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onOpenChange?.(!isOpen)
    props.onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      onClick: handleClick,
      "aria-expanded": isOpen,
      "aria-haspopup": true,
      ...props,
    })
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup={true}
      {...props}
    >
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, isOpen, onOpenChange, align = "center", sideOffset = 4, ...props }, ref) => {
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const triggerRef = React.useRef<HTMLElement | null>(null)

  // Create a callback ref function
  const setRefs = React.useCallback(
    (element: HTMLDivElement | null) => {
      // Forward the ref
      if (typeof ref === "function") {
        ref(element)
      } else if (ref) {
        ref.current = element
      }

      // If element exists, find the trigger and calculate position
      if (element && isOpen) {
        const trigger = element.parentElement?.querySelector('[aria-haspopup="true"]') as HTMLElement
        if (trigger) {
          triggerRef.current = trigger

          const triggerRect = trigger.getBoundingClientRect()
          const contentRect = element.getBoundingClientRect()

          const top = triggerRect.bottom + sideOffset
          let left = 0

          // Adjust alignment
          if (align === "start") {
            left = triggerRect.left
          } else if (align === "end") {
            left = triggerRect.right - contentRect.width
          } else {
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          }

          setPosition({ top, left })
        }
      }
    },
    [ref, isOpen, align, sideOffset],
  )

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        e.target instanceof Node &&
        ref &&
        "current" in ref &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      window.addEventListener("resize", () => setRefs(ref && "current" in ref ? ref.current : null))
      window.addEventListener("scroll", () => setRefs(ref && "current" in ref ? ref.current : null))
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("resize", () => setRefs(ref && "current" in ref ? ref.current : null))
      window.removeEventListener("scroll", () => setRefs(ref && "current" in ref ? ref.current : null))
    }
  }, [isOpen, ref, setRefs, onOpenChange])

  if (!isOpen) return null

  return (
    <div
      ref={setRefs}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className,
      )}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      {...props}
    />
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

