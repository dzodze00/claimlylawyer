import {
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Users,
  UserPlus,
  CheckCircle,
  Briefcase,
  CheckSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/workflow">
              <Briefcase className="mr-2 h-4 w-4" />
              Case Workflow
            </Link>
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
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+180</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validated Claims</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,876</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1 mb-1">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "73.8%" }}></div>
                  </div>
                  <span className="ml-1">73.8% validation rate</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potential Fraud</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-red-500 transform rotate-180" />
                  <span className="text-green-500 font-medium">-0.8%</span>
                  <span className="ml-1">from last month (3.5% of total)</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estimated Settlement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24.5M</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+$2.1M</span>
                  <span className="ml-1">from last estimate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>End-to-End Workflow</CardTitle>
              <CardDescription>Complete case management pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-6 gap-4">
                  {[
                    {
                      title: "Plaintiff Discovery",
                      icon: UserPlus,
                      description: "Identify potential plaintiffs",
                      link: "/dashboard/discovery",
                      count: 578,
                      status: "Active",
                    },
                    {
                      title: "Claim Validation",
                      icon: FileCheck,
                      description: "Validate plaintiff claims",
                      link: "/dashboard/claims",
                      count: 423,
                      status: "Active",
                    },
                    {
                      title: "Plaintiff Outreach",
                      icon: Users,
                      description: "Contact validated plaintiffs",
                      link: "/dashboard/marketing",
                      count: 312,
                      status: "Active",
                    },
                    {
                      title: "Case Documentation",
                      icon: FileCheck,
                      description: "Collect & organize documents",
                      link: "/dashboard/claims",
                      count: 245,
                      status: "Active",
                    },
                    {
                      title: "Settlement",
                      icon: Briefcase,
                      description: "Negotiate settlement terms",
                      link: "/dashboard/analytics",
                      count: 128,
                      status: "Active",
                    },
                    {
                      title: "Case Completion",
                      icon: CheckCircle,
                      description: "Finalize & close cases",
                      link: "/dashboard/workflow",
                      count: 87,
                      status: "Completed",
                    },
                  ].map((stage, i) => (
                    <div key={i} className="relative">
                      {i > 0 && (
                        <div className="absolute left-0 top-8 -ml-[calc(50%+8px)] w-full border-t border-muted-foreground/20" />
                      )}
                      <Link href={stage.link}>
                        <div className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-muted">
                          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <stage.icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-sm font-medium">{stage.title}</h3>
                          <p className="text-xs text-muted-foreground">{stage.description}</p>
                          <div className="mt-2 flex items-center justify-center space-x-2">
                            <Badge variant={stage.status === "Active" ? "default" : "outline"}>{stage.count}</Badge>
                            <span className="text-xs text-muted-foreground">{stage.status}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/dashboard/workflow">
                      <Briefcase className="mr-2 h-4 w-4" />
                      View Case Workflow
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Review medical records for Sarah Johnson",
                      dueDate: "Oct 25, 2023",
                      priority: "High",
                      case: "Johnson v. PharmaCorp",
                    },
                    {
                      title: "Schedule interview with Robert Smith",
                      dueDate: "Oct 26, 2023",
                      priority: "Medium",
                      case: "Smith v. TechGiant",
                    },
                    {
                      title: "Draft outreach email campaign",
                      dueDate: "Oct 24, 2023",
                      priority: "Medium",
                      case: "Garcia v. AutoManufacturer",
                    },
                    {
                      title: "Follow up on missing medical records",
                      dueDate: "Oct 23, 2023",
                      priority: "High",
                      case: "Williams v. InsuranceCo",
                    },
                  ].map((task, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                        <CheckSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{task.title}</p>
                          <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Due: {task.dueDate}</span>
                          <span className="mx-2">•</span>
                          <span>{task.case}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/tasks">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        View All Tasks
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
                <CardDescription>Key milestones and upcoming deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    {
                      date: "Nov 15, 2023",
                      title: "Initial Plaintiff Discovery Phase",
                      description: "Complete identification of potential plaintiffs through AI-powered discovery",
                      status: "Completed",
                    },
                    {
                      date: "Dec 10, 2023",
                      title: "Claim Validation Deadline",
                      description: "Finalize validation of all submitted claims",
                      status: "In Progress",
                    },
                    {
                      date: "Jan 15, 2024",
                      title: "Class Certification Filing",
                      description: "Submit motion for class certification with validated plaintiffs",
                      status: "Upcoming",
                    },
                    {
                      date: "Feb 28, 2024",
                      title: "Settlement Conference",
                      description: "Initial settlement conference with defendant representatives",
                      status: "Upcoming",
                    },
                    {
                      date: "Apr 15, 2024",
                      title: "Expert Witness Disclosures",
                      description: "Deadline for expert witness disclosures and reports",
                      status: "Upcoming",
                    },
                  ].map((event, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full border border-primary bg-background"></div>
                      {i !== 4 && (
                        <div className="absolute left-[7px] top-5 h-[calc(100%-16px)] w-[2px] bg-muted"></div>
                      )}
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{event.date}</div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                        <div className="flex items-center pt-1">
                          <Badge
                            variant={
                              event.status === "Completed"
                                ? "default"
                                : event.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Statistics</CardTitle>
                <CardDescription>Key metrics for Johnson v. PharmaCorp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Case Type</p>
                      <p className="font-medium">Product Liability</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Filing Date</p>
                      <p className="font-medium">October 5, 2023</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Jurisdiction</p>
                      <p className="font-medium">Northern District of California</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Judge</p>
                      <p className="font-medium">Hon. Maria Rodriguez</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Plaintiff Demographics</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Age Distribution</p>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span>45-65</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gender</p>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span>Female</span>
                          <span className="font-medium">57%</span>
                        </div>
                        <Progress value={57} className="h-1" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Claim Severity</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-md border p-2 text-center">
                        <p className="text-xs text-muted-foreground">Mild</p>
                        <p className="text-lg font-bold">28%</p>
                      </div>
                      <div className="rounded-md border p-2 text-center">
                        <p className="text-xs text-muted-foreground">Moderate</p>
                        <p className="text-lg font-bold">42%</p>
                      </div>
                      <div className="rounded-md border p-2 text-center">
                        <p className="text-xs text-muted-foreground">Severe</p>
                        <p className="text-lg font-bold">30%</p>
                      </div>
                    </div>
                  </div>
                </div>
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
            <Link href="/dashboard/workflow" className="text-sm font-medium leading-none hover:underline">
              {c.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {c.type} • {c.plaintiffs} plaintiffs
            </p>
            <div className="mt-2 flex w-full items-center">
              <Progress value={c.progress} className="h-2 w-[120px]" />
              <span className="ml-2 text-xs text-muted-foreground">{c.progress}%</span>
            </div>
          </div>
          <div className="ml-auto font-medium">
            <Badge variant={c.status === "Active" ? "default" : "outline"}>{c.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

