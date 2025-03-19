"use client"

import type * as React from "react"
import { Tooltip as RechartsTooltip, type TooltipProps } from "recharts"

// Define a type for the CSS variables
interface CustomCSSProperties extends React.CSSProperties {
  [key: string]: string | number | undefined
}

// Simplest possible implementation
export const ChartContainer: React.FC<
  React.PropsWithChildren<{
    config: Record<string, { color: string; label: string }>
    className?: string
  }>
> = ({ children, config, className }) => {
  // Create CSS variables for colors
  const style: CustomCSSProperties = {}
  Object.entries(config).forEach(([key, value]) => {
    style[`--color-${key}`] = value.color
  })

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

// Simple tooltip wrapper
export const ChartTooltip = (props: TooltipProps<number, string>) => {
  return <RechartsTooltip {...props} />
}

// Simple tooltip content
export const ChartTooltipContent: React.FC<{
  active?: boolean
  payload?: Array<{
    name?: string
    value?: any
    color?: string
  }>
  label?: string
}> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      {label && <p className="font-medium">{label}</p>}
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span>
            {item.name}: {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

