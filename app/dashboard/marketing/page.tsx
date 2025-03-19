import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"

// Sample data for the charts
const campaignData = [
  { name: "Email", clicks: 120, conversions: 18 },
  { name: "Social", clicks: 240, conversions: 32 },
  { name: "Display", clicks: 180, conversions: 24 },
  { name: "Search", clicks: 320, conversions: 48 },
]

const conversionData = [
  { name: "Jan", rate: 2.4 },
  { name: "Feb", rate: 3.2 },
  { name: "Mar", rate: 2.8 },
  { name: "Apr", rate: 3.8 },
  { name: "May", rate: 4.1 },
  { name: "Jun", rate: 3.6 },
]

const channelData = [
  { name: "Facebook", value: 35 },
  { name: "Instagram", value: 25 },
  { name: "Twitter", value: 15 },
  { name: "LinkedIn", value: 25 },
]

export default function MarketingPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Clicks and conversions by campaign type</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={campaignData} type="bar" xKey="name" yKeys={["clicks", "conversions"]} height={300} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate</CardTitle>
          <CardDescription>Monthly conversion rate (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={conversionData} type="line" xKey="name" yKeys={["rate"]} height={300} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Social Media Breakdown</CardTitle>
          <CardDescription>Traffic by social channel</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Chart data={channelData} type="pie" xKey="name" yKeys={["value"]} height={300} />
        </CardContent>
      </Card>
    </div>
  )
}

