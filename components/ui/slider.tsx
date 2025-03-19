"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    { defaultValue = [0], value, min = 0, max = 100, step = 1, onValueChange, className, disabled = false, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(value || defaultValue)
    const [dragging, setDragging] = React.useState(false)
    const trackRef = React.useRef<HTMLDivElement>(null)
    const thumbRefs = React.useRef<(HTMLDivElement | null)[]>([])

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        setInternalValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange],
    )

    const getValueFromPosition = (position: number) => {
      if (!trackRef.current) return min

      const trackRect = trackRef.current.getBoundingClientRect()
      const trackWidth = trackRect.width
      const offset = position - trackRect.left

      let percent = offset / trackWidth
      percent = Math.min(Math.max(percent, 0), 1)

      const rawValue = min + percent * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      return Math.min(Math.max(steppedValue, min), max)
    }

    const handleMouseDown = (e: React.MouseEvent, index: number) => {
      if (disabled) return
      e.preventDefault()
      setDragging(true)

      const handleMouseMove = (e: MouseEvent) => {
        const newValue = [...internalValue]
        newValue[index] = getValueFromPosition(e.clientX)
        handleValueChange(newValue)
      }

      const handleMouseUp = () => {
        setDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return
      const newValue = getValueFromPosition(e.clientX)

      // Find the closest thumb to update
      const closestThumbIndex = internalValue.reduce((closest, value, index) => {
        const distance = Math.abs(value - newValue)
        if (distance < Math.abs(internalValue[closest] - newValue)) {
          return index
        }
        return closest
      }, 0)

      const updatedValue = [...internalValue]
      updatedValue[closestThumbIndex] = newValue
      handleValueChange(updatedValue)
    }

    const getThumbPosition = (value: number) => {
      return ((value - min) / (max - min)) * 100
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
          onClick={handleTrackClick}
        >
          <div
            className="absolute h-full bg-primary"
            style={{
              left: `${getThumbPosition(Math.min(...internalValue))}%`,
              width: `${getThumbPosition(Math.max(...internalValue)) - getThumbPosition(Math.min(...internalValue))}%`,
            }}
          />
        </div>
        {internalValue.map((value, index) => (
          <div
            key={index}
            ref={(el) => {
              thumbRefs.current[index] = el
              return undefined
            }}
            className={cn(
              "absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              dragging && "cursor-grabbing",
              !dragging && !disabled && "cursor-grab",
            )}
            style={{
              left: `${getThumbPosition(value)}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (disabled) return
              const increment = e.shiftKey ? step * 10 : step

              const newValue = [...internalValue]
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                newValue[index] = Math.min(newValue[index] + increment, max)
                handleValueChange(newValue)
              } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                newValue[index] = Math.max(newValue[index] - increment, min)
                handleValueChange(newValue)
              } else if (e.key === "Home") {
                newValue[index] = min
                handleValueChange(newValue)
              } else if (e.key === "End") {
                newValue[index] = max
                handleValueChange(newValue)
              }
            }}
          />
        ))}
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }

