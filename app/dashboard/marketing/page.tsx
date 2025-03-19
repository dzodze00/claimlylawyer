"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, MessageSquare, TrendingUp, BarChart2, Send, CheckCircle, Clock } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function MarketingPage() {
  const [selectedTab, setSelectedTab] = useState("campaigns")
  const [campaignRunning, setCampaignRunning] = useState(false)
  const [campaignProgress, setCampaignProgress] = useState(0)

  const startCampaign = () => {
    setCampaignRunning(true)
    setCampaignProgress(0)

    const interval = setInterval(() => {
      setCampaignProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setCampaignRunning(false)
          return 100
        }
        return newProgress
      })
    }, 300)

    return () => clearInterval(interval)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Plaintiff Marketing & Outreach</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={startCampaign} disabled={campaignRunning}>
            <Send className="mr-2 h-4 w-4" />
            {campaignRunning ? "Running Campaign..." : "Launch Campaign"}
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Conversion rates by outreach channel</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    email: {
                      label: "Email",
                      color: "hsl(var(--chart-1))",
                    },
                    social: {
                      label: "Social Media",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="response" name="Response Rate" fill="var(--color-email)" />
                      <Bar dataKey="conversion" name="Conversion Rate" fill="var(--color-social)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outreach Effectiveness</CardTitle>
                <CardDescription>Response trends over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    outreach: {
                      label: "Outreach",
                      color: "hsl(var(--chart-1))",
                    },
                    responses: {
                      label: "Responses",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={outreachEffectivenessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="outreach" stroke="var(--color-outreach)" strokeWidth={2} />
                      <Line type="monotone" dataKey="responses" stroke="var(--color-responses)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Outreach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,842</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.4%</div>
                <p className="text-xs text-muted-foreground">+3.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.7%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Per Acquisition</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42.18</div>
                <p className="text-xs text-muted-foreground">-8.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Current and scheduled outreach campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.description}</p>
                          </div>
                          <Badge
                            variant={
                              campaign.status === "Active"
                                ? "default"
                                : campaign.status === "Scheduled"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Channel</p>
                            <p className="font-medium">{campaign.channel}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Target Audience</p>
                            <p className="font-medium">{campaign.audience}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sent/Total</p>
                            <p className="font-medium">
                              {campaign.sent}/{campaign.total}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((campaign.sent / campaign.total) * 100)}%</span>
                          </div>
                          <Progress value={(campaign.sent / campaign.total) * 100} />
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create New Campaign</Button>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Metrics across all active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Email Campaigns</h4>
                      <Badge>4 Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Open Rate</p>
                        <p className="text-xl font-bold">42.8%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Click Rate</p>
                        <p className="text-xl font-bold">12.3%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-xl font-bold">8.7%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion</p>
                        <p className="text-xl font-bold">3.2%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Social Media Campaigns</h4>
                      <Badge>2 Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Impressions</p>
                        <p className="text-xl font-bold">124.5K</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-xl font-bold">5.8%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Click-through</p>
                        <p className="text-xl font-bold">2.1%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion</p>
                        <p className="text-xl font-bold">0.9%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Direct Mail Campaigns</h4>
                      <Badge>1 Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Delivered</p>
                        <p className="text-xl font-bold">98.2%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response</p>
                        <p className="text-xl font-bold">4.7%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call Rate</p>
                        <p className="text-xl font-bold">2.8%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion</p>
                        <p className="text-xl font-bold">1.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {campaignRunning && (
            <Card>
              <CardHeader>
                <CardTitle>Campaign Execution</CardTitle>
                <CardDescription>Automated outreach in progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Executing campaign: XYZ Hip Implant Awareness</span>
                    <span>{campaignProgress}% complete</span>
                  </div>
                  <Progress value={campaignProgress} />
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-semibold">Campaign Status</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    {campaignProgress >= 20 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Email batch 1 sent (500 recipients)</p>
                          <p className="text-muted-foreground">
                            Personalized outreach to potential plaintiffs in California
                          </p>
                        </div>
                      </div>
                    )}

                    {campaignProgress >= 40 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Social media ads deployed</p>
                          <p className="text-muted-foreground">
                            Targeted Facebook and Instagram ads to users with relevant medical interests
                          </p>
                        </div>
                      </div>
                    )}

                    {campaignProgress >= 60 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Email batch 2 sent (750 recipients)</p>
                          <p className="text-muted-foreground">
                            Personalized outreach to potential plaintiffs in Florida and Texas
                          </p>
                        </div>
                      </div>
                    )}

                    {campaignProgress >= 80 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">SMS notifications sent (250 recipients)</p>
                          <p className="text-muted-foreground">
                            Follow-up messages to high-priority potential plaintiffs
                          </p>
                        </div>
                      </div>
                    )}

                    {campaignProgress < 100 ? (
                      <div className="flex items-start space-x-2">
                        <Clock className="mt-0.5 h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-medium">Automated follow-up scheduling</p>
                          <p className="text-muted-foreground">
                            Preparing follow-up communications based on response patterns
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Campaign completed successfully</p>
                          <p className="text-muted-foreground">All outreach channels deployed, monitoring responses</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {campaignProgress >= 100 && (
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Initial Results</h3>
                    <div className="mt-2 grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Emails Opened</p>
                        <p className="text-lg font-bold">42.3%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                        <p className="text-lg font-bold">12.8%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Form Submissions</p>
                        <p className="text-lg font-bold">68</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call Requests</p>
                        <p className="text-lg font-bold">24</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button>View Detailed Report</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Templates</CardTitle>
              <CardDescription>AI-optimized templates for plaintiff outreach</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email">
                <TabsList className="mb-4">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="direct">Direct Mail</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Initial Outreach - Medical Device</h3>
                      <Badge>High Conversion</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <p className="text-sm">Subject: Important Information About Your XYZ Hip Implant</p>
                      <Separator className="my-2" />
                      <p className="text-sm">Dear [First Name],</p>
                      <br />
                      <p className="text-sm">
                        Our law firm is representing patients who received the XYZ Hip Implant and experienced
                        complications such as pain, swelling, difficulty walking, or required revision surgery.
                      </p>
                      <br />
                      <p className="text-sm">
                        Based on our records, you may have received this implant. If you've experienced any
                        complications, you may be entitled to significant compensation.
                      </p>
                      <br />
                      <p className="text-sm">
                        We're offering free, no-obligation case evaluations to determine if you qualify for the ongoing
                        class action lawsuit against the manufacturer.
                      </p>
                      <br />
                      <p className="text-sm">To learn more about your legal options, please:</p>
                      <p className="text-sm">1. Complete our secure online form: [LINK]</p>
                      <p className="text-sm">2. Call us directly: [PHONE]</p>
                      <p className="text-sm">3. Reply to this email with a convenient time to speak</p>
                      <br />
                      <p className="text-sm">Sincerely,</p>
                      <p className="text-sm">[Attorney Name]</p>
                      <p className="text-sm">[Law Firm]</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="font-medium">Open Rate:</span> 48.2%
                        </div>
                        <div>
                          <span className="font-medium">Response Rate:</span> 12.7%
                        </div>
                        <div>
                          <span className="font-medium">Conversion:</span> 5.3%
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Follow-up - Non-responders</h3>
                      <Badge variant="outline">Medium Conversion</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <p className="text-sm">
                        Subject: [First Name], We're Still Here to Help With Your XYZ Hip Implant Case
                      </p>
                      <Separator className="my-2" />
                      <p className="text-sm">Dear [First Name],</p>
                      <br />
                      <p className="text-sm">
                        We recently reached out about potential complications with your XYZ Hip Implant. We understand
                        you may have questions or concerns about the legal process.
                      </p>
                      <br />
                      <p className="text-sm">
                        Many of our clients initially hesitated but later found the process to be straightforward and
                        worthwhile. On average, qualified plaintiffs have received significant compensation for medical
                        expenses, pain and suffering, and lost wages.
                      </p>
                      <br />
                      <p className="text-sm">
                        Our team is available to answer any questions you might have, with no obligation to proceed.
                      </p>
                      <br />
                      <p className="text-sm">
                        If you've experienced complications with your implant, please contact us through any of these
                        methods:
                      </p>
                      <p className="text-sm">[Contact Methods]</p>
                      <br />
                      <p className="text-sm">Sincerely,</p>
                      <p className="text-sm">[Attorney Name]</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="font-medium">Open Rate:</span> 32.5%
                        </div>
                        <div>
                          <span className="font-medium">Response Rate:</span> 8.3%
                        </div>
                        <div>
                          <span className="font-medium">Conversion:</span> 3.1%
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Initial SMS Contact</h3>
                      <Badge>High Conversion</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <p className="text-sm">
                        [Law Firm]: [First Name], if you received an XYZ Hip Implant and experienced complications, you
                        may qualify for compensation. Free case review: [LINK] Reply STOP to opt out
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="font-medium">Delivery Rate:</span> 98.7%
                        </div>
                        <div>
                          <span className="font-medium">Response Rate:</span> 4.2%
                        </div>
                        <div>
                          <span className="font-medium">Conversion:</span> 2.8%
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Facebook Ad - Awareness</h3>
                      <Badge>High Engagement</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <p className="text-sm font-semibold">
                        Headline: Experienced Complications After Hip Replacement?
                      </p>
                      <p className="mt-2 text-sm">
                        Body: If you received an XYZ Hip Implant and suffered from pain, swelling, or needed revision
                        surgery, you may be entitled to significant compensation. Our law firm is representing patients
                        in a class action lawsuit against the manufacturer. Click to learn if you qualify for a free
                        case evaluation.
                      </p>
                      <p className="mt-2 text-sm">CTA: Check Eligibility Now</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="font-medium">CTR:</span> 3.8%
                        </div>
                        <div>
                          <span className="font-medium">Form Fills:</span> 2.1%
                        </div>
                        <div>
                          <span className="font-medium">Cost per Lead:</span> $42.15
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="direct" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Direct Mail - Comprehensive</h3>
                      <Badge>High Response</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
                      <p className="font-semibold text-center">IMPORTANT LEGAL NOTICE</p>
                      <p className="font-semibold text-center">Regarding XYZ Hip Implant Recipients</p>
                      <br />
                      <p>Dear [First Name],</p>
                      <br />
                      <p>
                        Our records indicate you may have received an XYZ Hip Implant during surgery. The manufacturer
                        of this device is currently facing a class action lawsuit due to reports of complications
                        including:
                      </p>
                      <br />
                      <ul className="list-disc pl-5">
                        <li>Persistent pain and inflammation</li>
                        <li>Difficulty walking or limited mobility</li>
                        <li>Metallosis (metal poisoning)</li>
                        <li>Loosening of the implant</li>
                        <li>Need for revision surgery</li>
                      </ul>
                      <br />
                      <p>
                        If you've experienced any of these symptoms, you may be entitled to significant compensation
                        for:
                      </p>
                      <br />
                      <ul className="list-disc pl-5">
                        <li>Medical expenses</li>
                        <li>Pain and suffering</li>
                        <li>Lost wages</li>
                        <li>Future medical care</li>
                      </ul>
                      <br />
                      <p>
                        Our law firm is representing plaintiffs in this case and has already secured substantial
                        settlements for our clients.
                      </p>
                      <br />
                      <p className="font-semibold text-center">FREE CASE EVALUATION</p>
                      <p className="text-center">Call: [PHONE]</p>
                      <p className="text-center">Visit: [WEBSITE]</p>
                      <br />
                      <p>Sincerely,</p>
                      <p>[Attorney Name]</p>
                      <p>[Law Firm]</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="font-medium">Response Rate:</span> 4.7%
                        </div>
                        <div>
                          <span className="font-medium">Call Rate:</span> 2.8%
                        </div>
                        <div>
                          <span className="font-medium">Conversion:</span> 1.5%
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create New Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Audience Targeting</CardTitle>
              <CardDescription>Precision targeting for potential plaintiffs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Demographic Targeting</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="age-range">Age Range</Label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input id="age-min" type="number" defaultValue="45" className="w-20" />
                      <span>to</span>
                      <Input id="age-max" type="number" defaultValue="75" className="w-20" />
                    </div>
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="gender-male" defaultChecked />
                        <Label htmlFor="gender-male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="gender-female" defaultChecked />
                        <Label htmlFor="gender-female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="gender-other" defaultChecked />
                        <Label htmlFor="gender-other">Other</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Geographic Targeting</Label>
                  <div className="mt-2 grid gap-2 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-ca" defaultChecked />
                      <Label htmlFor="geo-ca">California</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-fl" defaultChecked />
                      <Label htmlFor="geo-fl">Florida</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-tx" defaultChecked />
                      <Label htmlFor="geo-tx">Texas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-ny" defaultChecked />
                      <Label htmlFor="geo-ny">New York</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-il" defaultChecked />
                      <Label htmlFor="geo-il">Illinois</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="geo-other" />
                      <Label htmlFor="geo-other">Other States</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">Behavioral Targeting</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>Medical Interests</Label>
                    <div className="mt-2 grid gap-2 md:grid-cols-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-hip" defaultChecked />
                        <Label htmlFor="med-hip">Hip Replacement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-ortho" defaultChecked />
                        <Label htmlFor="med-ortho">Orthopedic Surgery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-pain" defaultChecked />
                        <Label htmlFor="med-pain">Chronic Pain</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-mobility" defaultChecked />
                        <Label htmlFor="med-mobility">Mobility Issues</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-metal" defaultChecked />
                        <Label htmlFor="med-metal">Metal Allergies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="med-revision" defaultChecked />
                        <Label htmlFor="med-revision">Revision Surgery</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Online Behavior</Label>
                    <div className="mt-2 grid gap-2 md:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="online-forums" defaultChecked />
                        <Label htmlFor="online-forums">Medical Forums</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="online-research" defaultChecked />
                        <Label htmlFor="online-research">Medical Research</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="online-support" defaultChecked />
                        <Label htmlFor="online-support">Support Groups</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="online-legal" defaultChecked />
                        <Label htmlFor="online-legal">Legal Information</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">AI-Recommended Targeting</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on analysis of successful plaintiff acquisition patterns
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-precision">Targeting Precision</Label>
                    <span className="text-sm">High</span>
                  </div>
                  <Progress value={85} id="ai-precision" />
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">High-Value Segments</h4>
                  <div className="rounded-lg bg-muted p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span>Adults 55-70 with recent orthopedic procedures in California, Florida, and Texas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span>Members of hip replacement support groups and forums</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span>Individuals researching "hip implant problems" and "revision surgery"</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span>Patients of specific hospitals and surgical centers known to use XYZ implants</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button>Apply AI Recommendations</Button>
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
const channelPerformanceData = [
  { name: "Email", response: 28.4, conversion: 5.3 },
  { name: "Social Media", response: 12.7, conversion: 2.1 },
  { name: "SMS", response: 18.5, conversion: 4.2 },
  { name: "Direct Mail", response: 4.7, conversion: 1.5 },
]

const outreachEffectivenessData = [
  { month: "Jun", outreach: 850, responses: 178, conversions: 42 },
  { month: "Jul", outreach: 920, responses: 202, conversions: 48 },
  { month: "Aug", outreach: 1050, responses: 252, conversions: 62 },
  { month: "Sep", outreach: 1280, responses: 333, conversions: 85 },
  { month: "Oct", outreach: 1742, responses: 495, conversions: 112 },
]

const messageTypeData = [
  { type: "Educational Content", response: 32.5 },
  { type: "Testimonials", response: 28.7 },
  { type: "Legal Information", response: 24.3 },
  { type: "Compensation Focus", response: 18.9 },
  { type: "Urgency-Based", response: 15.2 },
]

const contentElementData = [
  { element: "Medical Complications List", impact: 8.7 },
  { element: "Settlement Amounts", impact: 7.9 },
  { element: "Case Timeline", impact: 6.2 },
  { element: "Client Testimonials", impact: 5.8 },
  { element: "Attorney Credentials", impact: 4.3 },
]

const channelROIData = [
  { channel: "Email", cpa: 28.45, roi: 4370 },
  { channel: "Social Media", cpa: 52.8, roi: 2360 },
  { channel: "SMS", cpa: 35.2, roi: 3540 },
  { channel: "Direct Mail", cpa: 68.75, roi: 1810 },
]

// Mock data for active campaigns
const activeCampaigns = [
  {
    id: 1,
    name: "XYZ Hip Implant Awareness",
    description: "Educational campaign targeting potential plaintiffs with XYZ implants",
    status: "Active",
    channel: "Multi-channel",
    audience: "55+ with hip surgery",
    sent: 1250,
    total: 2500,
  },
  {
    id: 2,
    name: "Revision Surgery Outreach",
    description: "Targeted campaign for patients who underwent revision surgery",
    status: "Active",
    channel: "Email + SMS",
    audience: "Revision patients",
    sent: 875,
    total: 1000,
  },
  {
    id: 3,
    name: "Medical Forum Engagement",
    description: "Engagement with users in medical forums discussing hip implant issues",
    status: "Active",
    channel: "Social Media",
    audience: "Forum participants",
    sent: 450,
    total: 600,
  },
  {
    id: 4,
    name: "Hospital Patient Outreach",
    description: "Direct mail campaign to patients from hospitals using XYZ implants",
    status: "Scheduled",
    channel: "Direct Mail",
    audience: "Hospital patients",
    sent: 0,
    total: 1500,
  },
  {
    id: 5,
    name: "Support Group Follow-up",
    description: "Follow-up campaign for members of hip replacement support groups",
    status: "Scheduled",
    channel: "Email",
    audience: "Support group members",
    sent: 0,
    total: 750,
  },
]

