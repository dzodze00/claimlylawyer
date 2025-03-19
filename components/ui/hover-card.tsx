"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverCardProps {
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

const HoverCard = ({ children, openDelay = 300, closeDelay = 100 }: HoverCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (!isOpen && !openTimeoutRef.current) {
      openTimeoutRef.current = setTimeout(() => {
        setIsOpen(true)
        openTimeoutRef.current = null
      }, openDelay)
    }
  }

  const handleClose = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }

    if (isOpen && !closeTimeoutRef.current) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false)
        closeTimeoutRef.current = null
      }, closeDelay)
    }
  }

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
            onFocus: handleOpen,
            onBlur: handleClose,
          })
        }
        return child
      })}
    </>
  )
}

const HoverCardTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onFocus?: () => void
    onBlur?: () => void
    asChild?: boolean
  }
>(({ className, isOpen, onMouseEnter, onMouseLeave, onFocus, onBlur, asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props,
    })
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      data-hover-card-trigger="true"
      {...props}
    >
      {children}
    </div>
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, isOpen, onMouseEnter, onMouseLeave, align = "center", sideOffset = 4, ...props }, ref) => {
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
        const trigger = element.parentElement?.querySelector('[data-hover-card-trigger="true"]') as HTMLElement
        if (trigger) {
          triggerRef.current = trigger

          const triggerRect = trigger.getBoundingClientRect()
          const contentRect = element.getBoundingClientRect()

          const top = triggerRect.bottom + sideOffset + window.scrollY
          let left = 0

          // Adjust alignment
          if (align === "start") {
            left = triggerRect.left + window.scrollX
          } else if (align === "end") {
            left = triggerRect.right - contentRect.width + window.scrollX
          } else {
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2 + window.scrollX
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
        onMouseLeave?.()
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
  }, [isOpen, ref, setRefs, onMouseLeave])

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    />
  )
})
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }

