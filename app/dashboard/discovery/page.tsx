"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, UserPlus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function DiscoveryPage() {
  const [selectedTab, setSelectedTab] = useState("automated")
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [discoveredPlaintiffs, setDiscoveredPlaintiffs] = useState<any[]>([])

  const startScan = () => {
    setScanning(true)
    setScanProgress(0)
    setDiscoveredPlaintiffs([])

    // Simulate progress updates
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 5

        // Add discovered plaintiffs at certain milestones
        if (newProgress === 20) {
          setDiscoveredPlaintiffs((prev) => [...prev, mockPlaintiffs[0]])
        } else if (newProgress === 40) {
          setDiscoveredPlaintiffs((prev) => [...prev, mockPlaintiffs[1]])
        } else if (newProgress === 60) {
          setDiscoveredPlaintiffs((prev) => [...prev, mockPlaintiffs[2]])
        } else if (newProgress === 80) {
          setDiscoveredPlaintiffs((prev) => [...prev, mockPlaintiffs[3]])
        } else if (newProgress === 95) {
          setDiscoveredPlaintiffs((prev) => [...prev, mockPlaintiffs[4]])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setScanning(false)
          return 100
        }
        return newProgress
      })
    }, 500)

    return () => clearInterval(interval)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Plaintiff Discovery</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={startScan} disabled={scanning}>
            <Search className="mr-2 h-4 w-4" />
            {scanning ? "Scanning..." : "Start Discovery"}
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="automated">Automated Discovery</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="import">Batch Import</TabsTrigger>
        </TabsList>

        <TabsContent value="automated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Plaintiff Discovery</CardTitle>
              <CardDescription>
                Our AI scans public data sources to identify potential plaintiffs for your case
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="case-type">Case Type</Label>
                  <Input id="case-type" defaultValue="Product Liability - Defective Medical Device" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input id="keywords" defaultValue="XYZ Hip Implant, joint pain, revision surgery" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Data Sources</Label>
                  <Button variant="ghost" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Sources
                  </Button>
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  {[
                    "Social Media",
                    "Consumer Complaints",
                    "Medical Forums",
                    "News Articles",
                    "Court Records",
                    "Product Reviews",
                    "Support Groups",
                    "Public Records",
                  ].map((source) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox id={`source-${source}`} defaultChecked />
                      <label htmlFor={`source-${source}`} className="text-sm">
                        {source}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {scanning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scanning data sources...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Discovered Potential Plaintiffs</CardTitle>
                <CardDescription>AI-identified individuals who may qualify for your case</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {discoveredPlaintiffs.length > 0 ? (
                    <div className="space-y-4">
                      {discoveredPlaintiffs.map((plaintiff, index) => (
                        <div key={index} className="flex items-start space-x-4 rounded-md border p-4">
                          <Avatar>
                            <AvatarFallback>
                              {plaintiff.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">{plaintiff.name}</h4>
                              <Badge variant={plaintiff.matchScore > 80 ? "default" : "secondary"}>
                                {plaintiff.matchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{plaintiff.location}</p>
                            <div className="text-sm">
                              <span className="font-semibold">Source:</span> {plaintiff.source}
                            </div>
                            <p className="text-sm">{plaintiff.context}</p>
                            <div className="flex items-center space-x-2 pt-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add to Case
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[300px] items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground">No plaintiffs discovered yet</p>
                        <p className="text-sm text-muted-foreground">
                          Start a discovery scan to find potential plaintiffs
                        </p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Discovery Insights</CardTitle>
                <CardDescription>AI analysis of potential plaintiff pool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Geographic Distribution</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">California</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <Progress value={32} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Florida</span>
                        <span className="text-sm font-medium">24%</span>
                      </div>
                      <Progress value={24} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Texas</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <Progress value={18} />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-semibold">Common Keywords</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">revision surgery</Badge>
                      <Badge variant="outline">hip pain</Badge>
                      <Badge variant="outline">metal poisoning</Badge>
                      <Badge variant="outline">implant failure</Badge>
                      <Badge variant="outline">mobility issues</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-semibold">Sentiment Analysis</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Negative</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="bg-muted" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Neutral</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <Progress value={15} className="bg-muted" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Positive</span>
                        <span className="text-sm font-medium">7%</span>
                      </div>
                      <Progress value={7} className="bg-muted" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Plaintiff Entry</CardTitle>
              <CardDescription>Add plaintiff information manually to your case</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-details">Case Details</Label>
                  <textarea
                    id="case-details"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={4}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Add Plaintiff</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Batch Import</CardTitle>
              <CardDescription>Import multiple plaintiffs from a CSV or Excel file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-dashed p-10">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-6 w-6"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports CSV and Excel files</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Template</h4>
                <p className="text-sm text-muted-foreground">
                  Download our template file to ensure your data is formatted correctly
                </p>
                <Button variant="outline" size="sm">
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data for discovered plaintiffs
const mockPlaintiffs = [
  {
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    matchScore: 92,
    source: "Medical Forum",
    context: "Discussed XYZ Hip Implant failure and revision surgery in medical support group.",
  },
  {
    name: "Michael Rodriguez",
    location: "Miami, FL",
    matchScore: 87,
    source: "Consumer Complaint Database",
    context: "Filed complaint about severe pain and mobility issues after XYZ Hip Implant.",
  },
  {
    name: "Emily Chen",
    location: "Houston, TX",
    matchScore: 78,
    source: "Social Media",
    context: "Posted about ongoing legal consultation regarding failed medical device.",
  },
  {
    name: "Robert Williams",
    location: "Chicago, IL",
    matchScore: 85,
    source: "Patient Advocacy Group",
    context: "Shared experience with metal poisoning symptoms after hip replacement.",
  },
  {
    name: "Jennifer Martinez",
    location: "Phoenix, AZ",
    matchScore: 91,
    source: "News Article Comment",
    context: "Commented on news article about class action lawsuit against medical device manufacturer.",
  },
]
