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
  const internalRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    // Find the trigger element (parent of this content)
    if (isOpen && internalRef.current) {
      const trigger = internalRef.current.parentElement?.querySelector('[aria-haspopup="true"]') as HTMLElement
      if (trigger) {
        triggerRef.current = trigger
        calculatePosition()
      }
    }
  }, [isOpen])

  const calculatePosition = () => {
    if (!triggerRef.current || !internalRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = internalRef.current.getBoundingClientRect()

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

  const handleClickOutside = (e: MouseEvent) => {
    if (
      internalRef.current &&
      !internalRef.current.contains(e.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      onOpenChange?.(false)
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      window.addEventListener("resize", calculatePosition)
      window.addEventListener("scroll", calculatePosition)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("resize", calculatePosition)
      window.removeEventListener("scroll", calculatePosition)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={(el) => {
        // Handle the forwarded ref
        if (typeof ref === "function") {
          ref(el)
        } else if (ref) {
          ref.current = el
        }
        // Use our internal ref for positioning calculations
        internalRef.current = el
      }}
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

