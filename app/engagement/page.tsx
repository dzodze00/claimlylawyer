import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EngagementMetrics } from "@/components/engagement/engagement-metrics"
import { EmailPerformance } from "@/components/engagement/email-performance"
import { UpcomingReminders } from "@/components/engagement/upcoming-reminders"
import { RecentActivity } from "@/components/engagement/recent-activity"

export default function EngagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Engagement Dashboard</h1>
        <p className="text-muted-foreground">Monitor and improve plaintiff engagement with your communications.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="email-performance">Email Performance</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <EngagementMetrics />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
                <CardDescription>Recent email campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <EmailPerformance />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Scheduled follow-ups and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingReminders />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email-performance">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Email Performance</CardTitle>
              <CardDescription>Comprehensive view of all email campaigns</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <EmailPerformance detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Management</CardTitle>
              <CardDescription>View and manage all scheduled reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingReminders detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Plaintiff Activity</CardTitle>
              <CardDescription>Recent engagement from plaintiffs</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

