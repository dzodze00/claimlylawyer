import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Users, FileCheck, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Activity className="mr-2 h-4 w-4" />
            Active Cases
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Plaintiffs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,543</div>
                <p className="text-xs text-muted-foreground">+180 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validated Claims</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,876</div>
                <p className="text-xs text-muted-foreground">73.8% validation rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potential Fraud</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">3.5% of total claims</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estimated Settlement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24.5M</div>
                <p className="text-xs text-muted-foreground">+$2.1M from last estimate</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Active Cases</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CaseList />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest plaintiff discovery and claim validation activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CaseList() {
  const cases = [
    {
      id: "CASE-2023-001",
      name: "Johnson v. PharmaCorp",
      type: "Product Liability",
      plaintiffs: 1245,
      status: "Active",
      progress: 68,
    },
    {
      id: "CASE-2023-002",
      name: "Smith v. TechGiant",
      type: "Data Privacy",
      plaintiffs: 843,
      status: "Active",
      progress: 42,
    },
    {
      id: "CASE-2023-003",
      name: "Garcia v. AutoManufacturer",
      type: "Product Liability",
      plaintiffs: 455,
      status: "Active",
      progress: 87,
    },
  ]

  return (
    <div className="space-y-8">
      {cases.map((c) => (
        <div key={c.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <Link href="/dashboard/discovery" className="text-sm font-medium leading-none hover:underline">
              {c.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {c.type} • {c.plaintiffs} plaintiffs
            </p>
          </div>
          <div className="ml-auto font-medium">{c.status}</div>
        </div>
      ))}
    </div>
  )
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "New plaintiff identified",
      details: "AI discovered potential plaintiff from social media",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Claim validated",
      details: "AI verified purchase records and medical documentation",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Potential fraud detected",
      details: "Duplicate claim submission with inconsistent details",
      time: "Yesterday",
    },
    {
      id: 4,
      action: "Settlement estimate updated",
      details: "Based on 150 new validated claims",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.action}</p>
            <p className="text-sm text-muted-foreground">{activity.details}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

