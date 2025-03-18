"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plaintiffs">Plaintiffs</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="settlement">Settlement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Discovery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">Compared to previous month</p>
                <div className="mt-4 h-[80px]">
                  <ChartContainer
                    config={{
                      discovery: {
                        label: "Discovery Rate",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={discoveryRateData}>
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="var(--color-discovery)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73.8%</div>
                <p className="text-xs text-muted-foreground">+2.4% from previous month</p>
                <div className="mt-4 h-[80px]">
                  <ChartContainer
                    config={{
                      validation: {
                        label: "Validation Rate",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={validationRateData}>
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="var(--color-validation)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fraud Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5%</div>
                <p className="text-xs text-muted-foreground">-0.8% from previous month</p>
                <div className="mt-4 h-[80px]">
                  <ChartContainer
                    config={{
                      fraud: {
                        label: "Fraud Rate",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fraudRateData}>
                        <Line type="monotone" dataKey="rate" stroke="var(--color-fraud)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 min</div>
                <p className="text-xs text-muted-foreground">-0.5 min from previous month</p>
                <div className="mt-4 h-[80px]">
                  <ChartContainer
                    config={{
                      time: {
                        label: "Processing Time",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={processingTimeData}>
                        <Line type="monotone" dataKey="time" stroke="var(--color-time)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Plaintiff Discovery Trends</CardTitle>
                <CardDescription>Monthly plaintiff discovery by source</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    social: {
                      label: "Social Media",
                      color: "hsl(var(--chart-1))",
                    },
                    forums: {
                      label: "Medical Forums",
                      color: "hsl(var(--chart-2))",
                    },
                    complaints: {
                      label: "Consumer Complaints",
                      color: "hsl(var(--chart-3))",
                    },
                    news: {
                      label: "News Articles",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={plaintiffDiscoveryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="social" fill="var(--color-social)" />
                      <Bar dataKey="forums" fill="var(--color-forums)" />
                      <Bar dataKey="complaints" fill="var(--color-complaints)" />
                      <Bar dataKey="news" fill="var(--color-news)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Claim Validation Results</CardTitle>
                <CardDescription>Distribution of claim validation outcomes</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    validated: {
                      label: "Validated",
                      color: "hsl(var(--chart-1))",
                    },
                    pending: {
                      label: "Pending",
                      color: "hsl(var(--chart-2))",
                    },
                    flagged: {
                      label: "Flagged",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={validationResultsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {validationResultsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plaintiffs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plaintiff Demographics</CardTitle>
              <CardDescription>Demographic breakdown of identified plaintiffs</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-sm font-semibold">Age Distribution</h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={ageDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Gender Distribution</h3>
                  <ChartContainer
                    config={{
                      male: {
                        label: "Male",
                        color: "hsl(var(--chart-1))",
                      },
                      female: {
                        label: "Female",
                        color: "hsl(var(--chart-2))",
                      },
                      other: {
                        label: "Other",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={genderDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        >
                          {genderDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Geographic Distribution</h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={geographicDistributionData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="state" type="category" width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Income Distribution</h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={incomeDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim Analysis</CardTitle>
              <CardDescription>Detailed analysis of claim validation and processing</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-sm font-semibold">Validation Rate Over Time</h3>
                  <ChartContainer
                    config={{
                      rate: {
                        label: "Validation Rate",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={validationRateTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Fraud Detection by Type</h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={fraudTypeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="type" type="category" width={150} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Processing Time Improvement</h3>
                  <ChartContainer
                    config={{
                      manual: {
                        label: "Manual Processing",
                        color: "hsl(var(--chart-1))",
                      },
                      ai: {
                        label: "AI Processing",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={processingTimeComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="task" />
                        <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="manual" fill="var(--color-manual)" />
                        <Bar dataKey="ai" fill="var(--color-ai)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Validation Confidence Distribution</h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={confidenceDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settlement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settlement Projections</CardTitle>
              <CardDescription>AI-powered settlement analysis and forecasting</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="col-span-2">
                  <h3 className="mb-4 text-sm font-semibold">Estimated Settlement Range</h3>
                  <ChartContainer
                    config={{
                      estimate: {
                        label: "Estimated Settlement",
                        color: "hsl(var(--chart-1))",
                      },
                      min: {
                        label: "Minimum",
                        color: "hsl(var(--chart-2))",
                      },
                      max: {
                        label: "Maximum",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={settlementProjectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="min"
                          stroke="var(--color-min)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line type="monotone" dataKey="estimate" stroke="var(--color-estimate)" strokeWidth={3} />
                        <Line
                          type="monotone"
                          dataKey="max"
                          stroke="var(--color-max)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Settlement by Claim Severity</h3>
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Average Settlement",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={settlementBySeverityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="severity" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="var(--color-amount)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold">Comparable Case Settlements</h3>
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Settlement Amount",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={comparableCaseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="case" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="var(--color-amount)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data for charts
const discoveryRateData = [
  { month: "Jun", rate: 8.2 },
  { month: "Jul", rate: 9.1 },
  { month: "Aug", rate: 10.3 },
  { month: "Sep", rate: 11.2 },
  { month: "Oct", rate: 12.5 },
]

const validationRateData = [
  { month: "Jun", rate: 68.5 },
  { month: "Jul", rate: 70.2 },
  { month: "Aug", rate: 71.4 },
  { month: "Sep", rate: 72.6 },
  { month: "Oct", rate: 73.8 },
]

const fraudRateData = [
  { month: "Jun", rate: 5.2 },
  { month: "Jul", rate: 4.8 },
  { month: "Aug", rate: 4.3 },
  { month: "Sep", rate: 3.9 },
  { month: "Oct", rate: 3.5 },
]

const processingTimeData = [
  { month: "Jun", time: 4.5 },
  { month: "Jul", time: 4.2 },
  { month: "Aug", time: 3.8 },
  { month: "Sep", time: 3.5 },
  { month: "Oct", time: 3.2 },
]

const plaintiffDiscoveryData = [
  { month: "Jun", social: 42, forums: 28, complaints: 18, news: 12 },
  { month: "Jul", social: 45, forums: 30, complaints: 20, news: 15 },
  { month: "Aug", social: 48, forums: 32, complaints: 22, news: 18 },
  { month: "Sep", social: 52, forums: 35, complaints: 24, news: 19 },
  { month: "Oct", social: 55, forums: 38, complaints: 26, news: 21 },
]

const validationResultsData = [
  { name: "Validated", value: 73.8, color: "#4ade80" },
  { name: "Pending", value: 22.7, color: "#facc15" },
  { name: "Flagged", value: 3.5, color: "#f87171" },
]

const ageDistributionData = [
  { age: "18-30", count: 320 },
  { age: "31-40", count: 580 },
  { age: "41-50", count: 720 },
  { age: "51-60", count: 540 },
  { age: "61-70", count: 280 },
  { age: "71+", count: 103 },
]

const genderDistributionData = [
  { name: "Male", value: 42, color: "#60a5fa" },
  { name: "Female", value: 57, color: "#f472b6" },
  { name: "Other", value: 1, color: "#a78bfa" },
]

const geographicDistributionData = [
  { state: "California", count: 420 },
  { state: "Florida", count: 380 },
  { state: "Texas", count: 320 },
  { state: "New York", count: 280 },
  { state: "Illinois", count: 220 },
  { state: "Other", count: 923 },
]

const incomeDistributionData = [
  { range: "<$30k", count: 320 },
  { range: "$30-50k", count: 480 },
  { range: "$50-75k", count: 620 },
  { range: "$75-100k", count: 540 },
  { range: "$100k+", count: 583 },
]

const validationRateTimeData = [
  { month: "May", rate: 67.2 },
  { month: "Jun", rate: 68.5 },
  { month: "Jul", rate: 70.2 },
  { month: "Aug", rate: 71.4 },
  { month: "Sep", rate: 72.6 },
  { month: "Oct", rate: 73.8 },
]

const fraudTypeData = [
  { type: "Duplicate claims", count: 32 },
  { type: "Inconsistent details", count: 24 },
  { type: "False documentation", count: 18 },
  { type: "Identity issues", count: 9 },
  { type: "Timeline discrepancies", count: 6 },
]

const processingTimeComparisonData = [
  { task: "Document Review", manual: 120, ai: 2.5 },
  { task: "Claim Validation", manual: 90, ai: 1.8 },
  { task: "Fraud Detection", manual: 60, ai: 0.5 },
]

const confidenceDistributionData = [
  { range: "50-60%", count: 42 },
  { range: "61-70%", count: 128 },
  { range: "71-80%", count: 320 },
  { range: "81-90%", count: 780 },
  { range: "91-100%", count: 606 },
]

const settlementProjectionData = [
  { month: "Nov", min: 20, estimate: 22, max: 24 },
  { month: "Dec", min: 21, estimate: 23, max: 25 },
  { month: "Jan", min: 22, estimate: 24.5, max: 27 },
  { month: "Feb", min: 23, estimate: 26, max: 29 },
  { month: "Mar", min: 24, estimate: 28, max: 32 },
]

const settlementBySeverityData = [
  { severity: "Mild", amount: 15000 },
  { severity: "Moderate", amount: 45000 },
  { severity: "Severe", amount: 120000 },
  { severity: "Critical", amount: 250000 },
]

const comparableCaseData = [
  { case: "Smith v. MedCo", amount: 18.5 },
  { case: "Jones v. PharmaCorp", amount: 22.3 },
  { case: "Davis v. HealthTech", amount: 26.8 },
  { case: "Wilson v. MedDevice", amount: 19.2 },
]
