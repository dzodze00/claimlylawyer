"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  delayDuration?: number
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  className?: string
  sideOffset?: number
}

const Tooltip = ({
  children,
  content,
  delayDuration = 300,
  side = "top",
  align = "center",
  className,
  sideOffset = 4,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true)
      // Calculate position on next tick after the tooltip is rendered
      setTimeout(calculatePosition, 0)
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    // Calculate position based on side
    switch (side) {
      case "top":
        top = -tooltipRect.height - sideOffset
        break
      case "bottom":
        top = triggerRect.height + sideOffset
        break
      case "left":
        left = -tooltipRect.width - sideOffset
        top = (triggerRect.height - tooltipRect.height) / 2
        break
      case "right":
        left = triggerRect.width + sideOffset
        top = (triggerRect.height - tooltipRect.height) / 2
        break
    }

    // Adjust alignment
    if ((side === "top" || side === "bottom") && align !== "center") {
      if (align === "start") {
        left = 0
      } else if (align === "end") {
        left = triggerRect.width - tooltipRect.width
      } else {
        left = (triggerRect.width - tooltipRect.width) / 2
      }
    } else if ((side === "left" || side === "right") && align !== "center") {
      if (align === "start") {
        top = 0
      } else if (align === "end") {
        top = triggerRect.height - tooltipRect.height
      }
    } else if (side === "top" || side === "bottom") {
      left = (triggerRect.width - tooltipRect.width) / 2
    }

    setPosition({ top, left })
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div ref={triggerRef}>{children}</div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className={cn(
            "absolute z-50 max-w-xs px-2 py-1 text-xs font-medium text-popover-foreground bg-popover rounded-md shadow-md animate-in fade-in-0 zoom-in-95",
            className,
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  )
}

// For compatibility with existing code
const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      })
    }

    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    )
  },
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    sideOffset?: number
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
  }
>(({ className, sideOffset, side, align, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-50 max-w-xs px-2 py-1 text-xs font-medium text-popover-foreground bg-popover rounded-md shadow-md animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

