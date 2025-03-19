"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertTriangle, ArrowRight, FileCheck, UserPlus, Briefcase } from "lucide-react"
import Link from "next/link"

export type WorkflowStage = "discovery" | "validation" | "outreach" | "documentation" | "settlement" | "completed"

export type WorkflowStatus = "pending" | "in_progress" | "completed" | "blocked"

export interface WorkflowCase {
  id: string
  name: string
  plaintiff: string
  stage: WorkflowStage
  stageStatus: WorkflowStatus
  progress: number
  dateCreated: string
  lastUpdated: string
  priority: "high" | "medium" | "low"
  assignedTo?: string
  notes?: string
}

interface WorkflowStageConfig {
  label: string
  description: string
  icon: React.ElementType
  nextStage: WorkflowStage | null
  actions: {
    label: string
    href: string
    description: string
  }[]
}

const workflowStages: Record<WorkflowStage, WorkflowStageConfig> = {
  discovery: {
    label: "Plaintiff Discovery",
    description: "Identify and verify potential plaintiffs",
    icon: UserPlus,
    nextStage: "validation",
    actions: [
      {
        label: "Run AI Discovery",
        href: "/dashboard/discovery",
        description: "Use AI to identify potential plaintiffs from data sources",
      },
      {
        label: "Review Candidates",
        href: "/dashboard/discovery",
        description: "Review and approve discovered plaintiff candidates",
      },
    ],
  },
  validation: {
    label: "Claim Validation",
    description: "Validate plaintiff claims and documentation",
    icon: FileCheck,
    nextStage: "outreach",
    actions: [
      {
        label: "Validate Claims",
        href: "/dashboard/claims",
        description: "Use AI to validate plaintiff claims and detect potential fraud",
      },
      {
        label: "Request Documentation",
        href: "/dashboard/claims",
        description: "Request additional documentation from plaintiffs",
      },
    ],
  },
  outreach: {
    label: "Plaintiff Outreach",
    description: "Contact and engage with validated plaintiffs",
    icon: UserPlus,
    nextStage: "documentation",
    actions: [
      {
        label: "Launch Campaign",
        href: "/dashboard/marketing",
        description: "Launch outreach campaign to validated plaintiffs",
      },
      {
        label: "Schedule Interviews",
        href: "/dashboard/marketing",
        description: "Schedule interviews with responsive plaintiffs",
      },
    ],
  },
  documentation: {
    label: "Case Documentation",
    description: "Collect and organize case documentation",
    icon: FileCheck,
    nextStage: "settlement",
    actions: [
      {
        label: "Collect Documents",
        href: "/dashboard/claims",
        description: "Collect and organize plaintiff documentation",
      },
      {
        label: "Prepare Case File",
        href: "/dashboard/claims",
        description: "Prepare comprehensive case file for settlement",
      },
    ],
  },
  settlement: {
    label: "Settlement Negotiation",
    description: "Negotiate settlement terms",
    icon: Briefcase,
    nextStage: "completed",
    actions: [
      {
        label: "Calculate Damages",
        href: "/dashboard/analytics",
        description: "Calculate potential damages and settlement range",
      },
      {
        label: "Negotiate Terms",
        href: "/dashboard/analytics",
        description: "Negotiate settlement terms with defendant",
      },
    ],
  },
  completed: {
    label: "Case Completed",
    description: "Case has been settled or resolved",
    icon: CheckCircle,
    nextStage: null,
    actions: [
      {
        label: "View Settlement",
        href: "/dashboard/analytics",
        description: "View settlement details and distribution",
      },
      {
        label: "Generate Report",
        href: "/dashboard/analytics",
        description: "Generate comprehensive case report",
      },
    ],
  },
}

export function WorkflowManager({ caseData }: { caseData: WorkflowCase }) {
  const [activeCase, setActiveCase] = useState<WorkflowCase>(caseData)
  const currentStage = workflowStages[activeCase.stage]

  const advanceStage = () => {
    if (currentStage.nextStage) {
      const updatedCase = {
        ...activeCase,
        stage: currentStage.nextStage,
        stageStatus: "pending" as WorkflowStatus,
        progress: Math.min(activeCase.progress + 20, 100),
        lastUpdated: new Date().toISOString().split("T")[0],
      }
      setActiveCase(updatedCase)
      // In a real app, you would save this to your backend
    }
  }

  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge>
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="mr-1 h-3 w-3" /> Blocked
          </Badge>
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{activeCase.name}</CardTitle>
            <CardDescription>
              Case ID: {activeCase.id} | Plaintiff: {activeCase.plaintiff}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                activeCase.priority === "high"
                  ? "destructive"
                  : activeCase.priority === "medium"
                    ? "secondary"
                    : "outline"
              }
            >
              {activeCase.priority.charAt(0).toUpperCase() + activeCase.priority.slice(1)} Priority
            </Badge>
            {getStatusBadge(activeCase.stageStatus)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Case Progress</span>
            <span>{activeCase.progress}%</span>
          </div>
          <Progress value={activeCase.progress} />
        </div>

        <div className="grid grid-cols-6 gap-2">
          {(Object.keys(workflowStages) as WorkflowStage[]).map((stage, index) => {
            const stageConfig = workflowStages[stage]
            const isActive = activeCase.stage === stage
            const isCompleted =
              (Object.keys(workflowStages) as WorkflowStage[]).indexOf(activeCase.stage) >
              (Object.keys(workflowStages) as WorkflowStage[]).indexOf(stage)

            return (
              <div key={stage} className="relative">
                {index > 0 && (
                  <div className="absolute left-0 top-4 -ml-[calc(50%+8px)] w-full border-t border-muted-foreground/20" />
                )}
                <div
                  className={`
                  relative flex flex-col items-center p-2 text-center
                  ${isActive ? "text-primary" : isCompleted ? "text-primary/70" : "text-muted-foreground"}
                `}
                >
                  <div
                    className={`
                    flex h-8 w-8 items-center justify-center rounded-full border
                    ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-primary/70 bg-primary/20 text-primary"
                          : "border-muted-foreground/20 text-muted-foreground"
                    }
                  `}
                  >
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <stageConfig.icon className="h-4 w-4" />}
                  </div>
                  <span className="mt-1 text-xs font-medium">{stageConfig.label}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <currentStage.icon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{currentStage.label}</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{currentStage.description}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {currentStage.actions.map((action, i) => (
              <Link href={action.href} key={i} className="block">
                <div className="rounded-md border p-3 transition-colors hover:bg-muted">
                  <h4 className="font-medium">{action.label}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Tabs defaultValue="timeline">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-4 py-2">
              <div className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div className="absolute top-8 h-full w-px bg-border" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Plaintiff Discovered</h4>
                    <span className="text-xs text-muted-foreground">Oct 15, 2023</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI identified potential plaintiff from social media data
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <div className="absolute top-8 h-full w-px bg-border" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Claim Validated</h4>
                    <span className="text-xs text-muted-foreground">Oct 18, 2023</span>
                  </div>
                  <p className="text-sm text-muted-foreground">AI validated claim with 94% confidence score</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-muted text-muted-foreground">
                    <UserPlus className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Initial Outreach</h4>
                    <span className="text-xs text-muted-foreground">Pending</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Scheduled for next outreach campaign</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="documents">
            <div className="space-y-2 py-2">
              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Medical Records.pdf</span>
                  </div>
                  <Badge variant="outline">Verified</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Uploaded Oct 16, 2023</p>
              </div>

              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Purchase Receipt.pdf</span>
                  </div>
                  <Badge variant="outline">Verified</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Uploaded Oct 17, 2023</p>
              </div>

              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Insurance Claim.pdf</span>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Requested Oct 18, 2023</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notes">
            <div className="space-y-2 py-2">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Case Manager Note</span>
                  <span className="text-xs text-muted-foreground">Oct 18, 2023</span>
                </div>
                <p className="mt-1 text-sm">
                  Plaintiff has strong supporting documentation. Medical records confirm product usage and complications
                  consistent with our case criteria.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">AI Analysis</span>
                  <span className="text-xs text-muted-foreground">Oct 17, 2023</span>
                </div>
                <p className="mt-1 text-sm">
                  Timeline analysis shows plaintiff received implant within the affected manufacturing period. High
                  confidence match with case criteria.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Full Case Details</Button>
        {currentStage.nextStage && (
          <Button onClick={advanceStage}>
            Advance to {workflowStages[currentStage.nextStage].label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

