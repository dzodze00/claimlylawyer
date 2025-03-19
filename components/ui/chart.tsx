"use client"

import type * as React from "react"
import { Tooltip as RechartsTooltip, type TooltipProps } from "recharts"

// Simplest possible implementation
export const ChartContainer: React.FC<
  React.PropsWithChildren<{
    config: Record<string, { color: string; label: string }>
    className?: string
  }>
> = ({ children, config, className }) => {
  // Create CSS variables for colors
  const style: React.CSSProperties = {}
  Object.entries(config).forEach(([key, value]) => {
    style[`--color-${key}` as any] = value.color
  })

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

// Simple tooltip wrapper
export const ChartTooltip = (props: TooltipProps<any, any>) => {
  return <RechartsTooltip {...props} />
}

// Simple tooltip content
export const ChartTooltipContent: React.FC<{
  active?: boolean
  payload?: any[]
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

