"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ children, className }: ChartContainerProps) {
  return <div className={cn("w-full h-full", className)}>{children}</div>
}

interface ChartTooltipProps {
  children: React.ReactNode
  className?: string
}

export function ChartTooltip({ children, className }: ChartTooltipProps) {
  return <div className={cn("pointer-events-none", className)}>{children}</div>
}

interface ChartTooltipContentProps {
  label: string
  value: number
  className?: string
}

export function ChartTooltipContent({ label, value, className }: ChartTooltipContentProps) {
  return (
    <div className={cn("p-2 bg-popover text-popover-foreground rounded-md shadow-md", className)}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs opacity-80">{value}</p>
    </div>
  )
}

interface ChartLegendProps {
  children: React.ReactNode
  className?: string
}

export function ChartLegend({ children, className }: ChartLegendProps) {
  return <div className={cn("flex items-center space-x-2", className)}>{children}</div>
}

interface ChartLegendContentProps {
  label: string
  color: string
  className?: string
}

export function ChartLegendContent({ label, color, className }: ChartLegendContentProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <p className="text-xs">{label}</p>
    </div>
  )
}

interface ChartStyleProps {
  className?: string
}

export function ChartStyle({ className }: ChartStyleProps) {
  return (
    <style jsx>{`
    /* Add any global chart styles here */
  `}</style>
  )
}
