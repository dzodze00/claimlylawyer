import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"

// Sample data for the charts
const lineChartData = [
  { name: "Jan", visitors: 1000, pageViews: 2400 },
  { name: "Feb", visitors: 1500, pageViews: 3600 },
  { name: "Mar", visitors: 800, pageViews: 1800 },
  { name: "Apr", visitors: 1700, pageViews: 4000 },
  { name: "May", visitors: 1200, pageViews: 2900 },
  { name: "Jun", visitors: 1800, pageViews: 4300 },
]

const barChartData = [
  { name: "Email", value: 45 },
  { name: "Social", value: 27 },
  { name: "Direct", value: 18 },
  { name: "Referral", value: 10 },
]

const pieChartData = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 5 },
]

export default function AnalyticsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Website Traffic</CardTitle>
          <CardDescription>Visitors and page views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={lineChartData} type="line" xKey="name" yKeys={["visitors", "pageViews"]} height={300} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your visitors come from</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={barChartData} type="bar" xKey="name" yKeys={["value"]} height={300} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Device Breakdown</CardTitle>
          <CardDescription>Visitors by device type</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Chart data={pieChartData} type="pie" xKey="name" yKeys={["value"]} height={300} />
        </CardContent>
      </Card>
    </div>
  )
}

