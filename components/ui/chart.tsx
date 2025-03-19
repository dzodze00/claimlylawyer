"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ className, children, config, ...props }, ref) => {
  // Create CSS variables for colors
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, value]) => {
      vars[`--color-${key}`] = value.color
    })
    return vars
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn("flex aspect-video justify-center", className)} style={cssVars} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

// Simple tooltip that works with any data
const ChartTooltip = (props: RechartsPrimitive.TooltipProps<any, any>) => {
  return <RechartsPrimitive.Tooltip {...props} />
}

// Simple tooltip content component
const ChartTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <p className="font-medium">{label}</p>
      {payload.map((item: any, index: number) => (
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

export { ChartContainer, ChartTooltip, ChartTooltipContent }

