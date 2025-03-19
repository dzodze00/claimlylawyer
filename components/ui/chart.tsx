"use client"

import React from "react"
import { cn } from "@/lib/utils"

// Simple chart component that doesn't rely on any external dependencies
export interface ChartProps {
  data: Array<Record<string, any>>
  type?: "line" | "bar" | "area" | "pie"
  xKey?: string
  yKeys?: string[]
  height?: number
  width?: number
  className?: string
}

export function Chart({
  data = [],
  type = "line",
  xKey = "name",
  yKeys = ["value"],
  height = 300,
  width = 500,
  className,
}: ChartProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.font = "bold 16px system-ui"
    ctx.fillStyle = "#1e293b"
    ctx.textAlign = "center"
    ctx.fillText(`${type.charAt(0).toUpperCase() + type.slice(1)} Chart`, width / 2, 30)

    // Draw placeholder chart based on type
    if (type === "pie") {
      drawPieChart(ctx, data, xKey, yKeys[0], width, height)
    } else {
      drawAxisChart(ctx, data, type, xKey, yKeys, width, height)
    }
  }, [data, height, width, type, xKey, yKeys])

  // Function to draw axis-based charts (line, bar, area)
  function drawAxisChart(
    ctx: CanvasRenderingContext2D,
    data: Array<Record<string, any>>,
    type: string,
    xKey: string,
    yKeys: string[],
    width: number,
    height: number,
  ) {
    const padding = { top: 40, right: 20, bottom: 60, left: 60 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#cbd5e1"
    ctx.lineWidth = 1
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // Draw x-axis labels
    ctx.font = "12px system-ui"
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "center"

    const xStep = chartWidth / (data.length - 1 || 1)
    data.forEach((item, i) => {
      const x = padding.left + i * xStep
      ctx.fillText(String(item[xKey] || ""), x, height - padding.bottom + 20)
    })

    // Find max value for y-axis
    let maxValue = 0
    data.forEach((item) => {
      yKeys.forEach((key) => {
        maxValue = Math.max(maxValue, Number(item[key] || 0))
      })
    })
    maxValue = maxValue * 1.1 // Add 10% padding

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight * (5 - i)) / 5
      const value = (maxValue * i) / 5
      ctx.fillText(value.toFixed(0), padding.left - 10, y + 5)

      // Draw grid line
      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Draw data for each y key
    const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"]

    yKeys.forEach((key, keyIndex) => {
      ctx.beginPath()
      ctx.strokeStyle = colors[keyIndex % colors.length]
      ctx.lineWidth = 2

      if (type === "bar") {
        // Draw bars
        const barWidth = xStep / (yKeys.length + 1)
        data.forEach((item, i) => {
          const value = Number(item[key] || 0)
          const x = padding.left + i * xStep - barWidth / 2 + keyIndex * barWidth
          const barHeight = (value / maxValue) * chartHeight
          const y = height - padding.bottom - barHeight

          ctx.fillStyle = colors[keyIndex % colors.length]
          ctx.fillRect(x, y, barWidth, barHeight)
        })
      } else {
        // Draw line or area
        data.forEach((item, i) => {
          const value = Number(item[key] || 0)
          const x = padding.left + i * xStep
          const y = height - padding.bottom - (value / maxValue) * chartHeight

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        if (type === "area") {
          // Fill area under the line
          ctx.lineTo(padding.left + (data.length - 1) * xStep, height - padding.bottom)
          ctx.lineTo(padding.left, height - padding.bottom)
          ctx.closePath()
          ctx.fillStyle = colors[keyIndex % colors.length] + "33" // Add transparency
          ctx.fill()
        }
      }
    })

    // Draw legend
    const legendY = height - 20
    yKeys.forEach((key, i) => {
      const x = padding.left + i * 100

      // Draw color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(x, legendY, 12, 12)

      // Draw label
      ctx.fillStyle = "#64748b"
      ctx.textAlign = "left"
      ctx.fillText(key, x + 16, legendY + 10)
    })
  }

  // Function to draw pie chart
  function drawPieChart(
    ctx: CanvasRenderingContext2D,
    data: Array<Record<string, any>>,
    labelKey: string,
    valueKey: string,
    width: number,
    height: number,
  ) {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Calculate total value
    const total = data.reduce((sum, item) => sum + Number(item[valueKey] || 0), 0)

    // Draw pie slices
    let startAngle = 0
    const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#ec4899", "#06b6d4", "#8b5cf6"]

    data.forEach((item, i) => {
      const value = Number(item[valueKey] || 0)
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.fillStyle = colors[i % colors.length]
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      ctx.font = "bold 12px system-ui"
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(String(item[labelKey] || ""), labelX, labelY)

      startAngle += sliceAngle
    })

    // Draw legend
    const legendY = height - 40
    const itemWidth = width / (data.length + 1)

    data.forEach((item, i) => {
      const x = (i + 1) * itemWidth
      const value = Number(item[valueKey] || 0)
      const percentage = ((value / total) * 100).toFixed(1)

      // Draw color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(x - 50, legendY, 12, 12)

      // Draw label
      ctx.fillStyle = "#64748b"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.font = "12px system-ui"
      ctx.fillText(`${String(item[labelKey] || "")}: ${percentage}%`, x - 34, legendY + 6)
    })
  }

  return (
    <div className={cn("flex justify-center", className)}>
      <canvas ref={canvasRef} width={width} height={height} className="max-w-full" />
    </div>
  )
}

// Simple container for charts
export interface ChartContainerProps {
  children: React.ReactNode
  className?: string
  config?: Record<string, any>
}

export function ChartContainer({ children, className, config }: ChartContainerProps) {
  return <div className={cn("w-full", className)}>{children}</div>
}

// Export other components that might be imported but not used
export function ChartTooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ChartTooltipContent({ label, value }: { label: string; value: number }) {
  return (
    <div>
      {label}: {value}
    </div>
  )
}

export function ChartLegend({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 justify-center mt-4">{children}</div>
}

export function ChartLegendContent({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3" style={{ backgroundColor: color }}></div>
      <span>{label}</span>
    </div>
  )
}

export function ChartStyle() {
  return null
}

