"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/ui/chart"

// Sample data for email performance
const emailPerformanceData = [
  { name: "Initial Contact", sent: 250, opened: 175, clicked: 82, responded: 45 },
  { name: "Follow-up #1", sent: 205, opened: 160, clicked: 95, responded: 62 },
  { name: "Document Request", sent: 180, opened: 155, clicked: 110, responded: 85 },
  { name: "Status Update", sent: 175, opened: 140, clicked: 88, responded: 70 },
  { name: "Reminder", sent: 150, opened: 125, clicked: 75, responded: 55 },
]

interface EmailPerformanceProps {
  detailed?: boolean
}

export function EmailPerformance({ detailed = false }: EmailPerformanceProps) {
  const [timeRange, setTimeRange] = useState("30days")

  const chartData = emailPerformanceData.map((item) => ({
    name: item.name,
    "Open Rate": Math.round((item.opened / item.sent) * 100),
    "Click Rate": Math.round((item.clicked / item.opened) * 100),
    "Response Rate": Math.round((item.responded / item.clicked) * 100),
  }))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={timeRange} onChange={(value) => setTimeRange(value)} className="w-40">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        {detailed && (
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        )}
      </div>

      <Chart
        data={chartData}
        type="bar"
        xKey="name"
        yKeys={["Open Rate", "Click Rate", "Response Rate"]}
        height={detailed ? 400 : 300}
        width={detailed ? 800 : 500}
      />

      {detailed && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Detailed Metrics</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Opened
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Clicked
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Responded
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Click Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {emailPerformanceData.map((item, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.sent}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.opened}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.clicked}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{item.responded}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {Math.round((item.opened / item.sent) * 100)}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {Math.round((item.clicked / item.opened) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

