"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Mail, MousePointer, Clock, Users } from "lucide-react"

const metrics = [
  {
    title: "Open Rate",
    value: "42.8%",
    change: "+2.5%",
    icon: Mail,
    positive: true,
  },
  {
    title: "Click Rate",
    value: "18.2%",
    change: "+1.2%",
    icon: MousePointer,
    positive: true,
  },
  {
    title: "Response Time",
    value: "3.4 days",
    change: "-0.8 days",
    icon: Clock,
    positive: true,
  },
  {
    title: "Active Plaintiffs",
    value: "78%",
    change: "-2.1%",
    icon: Users,
    positive: false,
  },
]

export function EngagementMetrics() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.positive ? "text-green-500" : "text-red-500"} flex items-center`}>
              {metric.positive ? (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

