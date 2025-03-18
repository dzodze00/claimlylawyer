"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Clock, Search, Filter, FileText } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [validating, setValidating] = useState(false)
  const [validationProgress, setValidationProgress] = useState(0)
  const [validationResult, setValidationResult] = useState<any>(null)

  const startValidation = () => {
    if (!selectedClaim) return

    setValidating(true)
    setValidationProgress(0)
    setValidationResult(null)

    // Simulate validation process
    const interval = setInterval(() => {
      setValidationProgress((prev) => {
        const newProgress = prev + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setValidating(false)

          // Generate validation result based on the selected claim
          if (selectedClaim.id === "CLM-2023-0003") {
            setValidationResult({
              status: "flagged",
              issues: [
                "Duplicate claim detected with different contact information",
                "Inconsistent timeline of events",
                "Missing supporting documentation",
              ],
              riskScore: 78,
            })
          } else {
            setValidationResult({
              status: "validated",
              strengths: [
                "Medical records confirm product usage",
                "Timeline consistent with product recall",
                "Documentation verified by AI",
              ],
              confidenceScore: selectedClaim.id === "CLM-2023-0001" ? 94 : 86,
            })
          }

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
        <h2 className="text-3xl font-bold tracking-tight">Claim Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Claims Database</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search claims..." className="w-[200px] pl-8" />
                </div>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Review and validate plaintiff claims</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Plaintiff</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claimsData.map((claim) => (
                  <TableRow
                    key={claim.id}
                    className={selectedClaim?.id === claim.id ? "bg-muted/50" : ""}
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <TableCell>{claim.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {claim.plaintiff
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{claim.plaintiff}</span>
                      </div>
                    </TableCell>
                    <TableCell>{claim.submitted}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          claim.status === "Validated"
                            ? "default"
                            : claim.status === "Pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {claim.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedClaim(claim)
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Claim Validation</CardTitle>
            <CardDescription>AI-powered validation and fraud detection</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedClaim ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-semibold">{selectedClaim.plaintiff}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClaim.id}</p>

                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Claim Type:</div>
                      <div>{selectedClaim.type}</div>
                      <div className="font-medium">Date of Injury:</div>
                      <div>{selectedClaim.injuryDate}</div>
                      <div className="font-medium">Product:</div>
                      <div>{selectedClaim.product}</div>
                      <div className="font-medium">Location:</div>
                      <div>{selectedClaim.location}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Claim Summary</h4>
                    <p className="mt-1 text-sm">{selectedClaim.summary}</p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      View Documents
                    </Button>
                    <Button size="sm" onClick={startValidation} disabled={validating}>
                      {validating ? "Validating..." : "Validate Claim"}
                    </Button>
                  </div>
                </div>

                {validating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI validation in progress...</span>
                      <span>{validationProgress}%</span>
                    </div>
                    <Progress value={validationProgress} />
                    <div className="text-xs text-muted-foreground">
                      <ul className="space-y-1">
                        {validationProgress >= 20 && <li>✓ Verifying plaintiff identity</li>}
                        {validationProgress >= 40 && <li>✓ Cross-referencing medical records</li>}
                        {validationProgress >= 60 && <li>✓ Analyzing purchase history</li>}
                        {validationProgress >= 80 && <li>✓ Checking for duplicate claims</li>}
                        {validationProgress >= 100 && <li>✓ Generating validation report</li>}
                      </ul>
                    </div>
                  </div>
                )}

                {validationResult && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      {validationResult.status === "validated" ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h3 className="text-sm font-semibold text-green-500">Claim Validated</h3>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <h3 className="text-sm font-semibold text-red-500">Potential Fraud Detected</h3>
                        </>
                      )}
                    </div>

                    <div className="mt-4">
                      {validationResult.status === "validated" ? (
                        <>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Confidence Score</span>
                            <Badge>{validationResult.confidenceScore}%</Badge>
                          </div>
                          <h4 className="text-sm font-semibold">Strengths</h4>
                          <ul className="mt-1 space-y-1 text-sm">
                            {validationResult.strengths.map((strength: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Risk Score</span>
                            <Badge variant="destructive">{validationResult.riskScore}%</Badge>
                          </div>
                          <h4 className="text-sm font-semibold">Issues Detected</h4>
                          <ul className="mt-1 space-y-1 text-sm">
                            {validationResult.issues.map((issue: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                      {validationResult.status === "validated" ? (
                        <Button size="sm" variant="default">
                          Approve Claim
                        </Button>
                      ) : (
                        <Button size="sm" variant="destructive">
                          Flag for Review
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">No claim selected</p>
                  <p className="text-sm text-muted-foreground">Select a claim from the list to validate</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Validation Statistics</CardTitle>
          <CardDescription>AI-powered claim validation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="text-sm font-semibold">Validated Claims</h3>
              </div>
              <div className="text-2xl font-bold">1,876</div>
              <Progress value={74} className="h-2" />
              <p className="text-xs text-muted-foreground">74% of total claims</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-sm font-semibold">Flagged Claims</h3>
              </div>
              <div className="text-2xl font-bold">89</div>
              <Progress value={3.5} className="h-2" />
              <p className="text-xs text-muted-foreground">3.5% of total claims</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="text-sm font-semibold">Pending Validation</h3>
              </div>
              <div className="text-2xl font-bold">578</div>
              <Progress value={22.5} className="h-2" />
              <p className="text-xs text-muted-foreground">22.5% of total claims</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Common Validation Issues</h3>
              <ScrollArea className="h-[200px] mt-2">
                <div className="space-y-2">
                  {[
                    { issue: "Missing or incomplete documentation", percentage: 42 },
                    { issue: "Inconsistent timeline of events", percentage: 28 },
                    { issue: "Unable to verify product purchase", percentage: 18 },
                    { issue: "Duplicate claim submission", percentage: 7 },
                    { issue: "Inconsistent contact information", percentage: 5 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item.issue}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Validation Efficiency</h3>
              <div className="mt-2 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average validation time</span>
                    <span className="text-sm font-medium">3.2 minutes</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reduced from 4.5 hours with manual processing</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fraud detection accuracy</span>
                    <span className="text-sm font-medium">94.8%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Improved from 76% with manual review</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost per validation</span>
                    <span className="text-sm font-medium">$4.20</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reduced from $85 with manual processing</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock claims data
const claimsData = [
  {
    id: "CLM-2023-0001",
    plaintiff: "Sarah Johnson",
    submitted: "Oct 15, 2023",
    status: "Validated",
    type: "Product Liability",
    injuryDate: "Mar 12, 2022",
    product: "XYZ Hip Implant",
    location: "Los Angeles, CA",
    summary:
      "Patient received XYZ Hip Implant in 2021. Experienced severe pain and mobility issues requiring revision surgery in March 2022. Medical records confirm metallosis and device failure.",
  },
  {
    id: "CLM-2023-0002",
    plaintiff: "Michael Rodriguez",
    submitted: "Oct 18, 2023",
    status: "Pending",
    type: "Product Liability",
    injuryDate: "Apr 5, 2022",
    product: "XYZ Hip Implant",
    location: "Miami, FL",
    summary:
      "Patient received XYZ Hip Implant in 2020. Developed pain, inflammation, and elevated metal levels in bloodstream. Scheduled for revision surgery next month.",
  },
  {
    id: "CLM-2023-0003",
    plaintiff: "Emily Chen",
    submitted: "Oct 20, 2023",
    status: "Flagged",
    type: "Product Liability",
    injuryDate: "Feb 28, 2022",
    product: "XYZ Hip Implant",
    location: "Houston, TX",
    summary:
      "Patient claims to have received XYZ Hip Implant in 2021 and experienced complications requiring revision. Limited documentation provided to verify claims.",
  },
  {
    id: "CLM-2023-0004",
    plaintiff: "Robert Williams",
    submitted: "Oct 22, 2023",
    status: "Pending",
    type: "Product Liability",
    injuryDate: "May 17, 2022",
    product: "XYZ Hip Implant",
    location: "Chicago, IL",
    summary:
      "Patient received XYZ Hip Implant in 2019. Experienced pain, swelling, and difficulty walking. Medical tests show elevated metal levels and implant loosening.",
  },
  {
    id: "CLM-2023-0005",
    plaintiff: "Jennifer Martinez",
    submitted: "Oct 25, 2023",
    status: "Validated",
    type: "Product Liability",
    injuryDate: "Jun 3, 2022",
    product: "XYZ Hip Implant",
    location: "Phoenix, AZ",
    summary:
      "Patient received XYZ Hip Implant in 2020. Developed severe complications including tissue damage and bone loss. Underwent revision surgery in June 2022.",
  },
]

