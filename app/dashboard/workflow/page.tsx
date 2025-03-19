"use client"

import { useState } from "react"
import { WorkflowManager, type WorkflowCase } from "@/components/workflow-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, Search, Filter, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WorkflowPage() {
  const [selectedCase, setSelectedCase] = useState<WorkflowCase | null>(mockCases[0])
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Case Workflow</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-2">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Cases</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Manage your active cases</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search cases..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2 pt-2">
                  {mockCases
                    .filter((c) => {
                      if (activeTab === "active") return c.stageStatus === "in_progress"
                      if (activeTab === "pending") return c.stageStatus === "pending"
                      if (activeTab === "completed") return c.stage === "completed"
                      return true
                    })
                    .map((caseItem) => (
                      <div
                        key={caseItem.id}
                        className={`
                          cursor-pointer rounded-md border p-3 transition-colors hover:bg-muted
                          ${selectedCase?.id === caseItem.id ? "border-primary bg-muted/50" : ""}
                        `}
                        onClick={() => setSelectedCase(caseItem)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{caseItem.name}</h4>
                          {caseItem.stageStatus === "in_progress" && (
                            <Badge variant="secondary">
                              <Clock className="mr-1 h-3 w-3" /> In Progress
                            </Badge>
                          )}
                          {caseItem.stageStatus === "pending" && (
                            <Badge variant="outline">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </Badge>
                          )}
                          {caseItem.stageStatus === "completed" && (
                            <Badge>
                              <CheckCircle className="mr-1 h-3 w-3" /> Completed
                            </Badge>
                          )}
                          {caseItem.stageStatus === "blocked" && (
                            <Badge variant="destructive">
                              <AlertTriangle className="mr-1 h-3 w-3" /> Blocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Plaintiff: {caseItem.plaintiff}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span>Case ID: {caseItem.id}</span>
                          <span>Updated: {caseItem.lastUpdated}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        <div className="col-span-5">
          {selectedCase ? (
            <WorkflowManager caseData={selectedCase} />
          ) : (
            <Card className="flex h-full items-center justify-center">
              <CardContent className="py-12 text-center">
                <h3 className="text-lg font-medium">No Case Selected</h3>
                <p className="text-sm text-muted-foreground">Select a case from the list to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const mockCases: WorkflowCase[] = [
  {
    id: "CASE-2023-001",
    name: "Johnson v. PharmaCorp",
    plaintiff: "Sarah Johnson",
    stage: "validation",
    stageStatus: "in_progress",
    progress: 35,
    dateCreated: "2023-10-15",
    lastUpdated: "2023-10-18",
    priority: "high",
    assignedTo: "Michael Rodriguez",
    notes: "Strong case with clear evidence of product defect.",
  },
  {
    id: "CASE-2023-002",
    name: "Smith v. TechGiant",
    plaintiff: "Robert Smith",
    stage: "discovery",
    stageStatus: "pending",
    progress: 15,
    dateCreated: "2023-10-17",
    lastUpdated: "2023-10-17",
    priority: "medium",
    assignedTo: "Jennifer Martinez",
  },
  {
    id: "CASE-2023-003",
    name: "Garcia v. AutoManufacturer",
    plaintiff: "Maria Garcia",
    stage: "outreach",
    stageStatus: "in_progress",
    progress: 45,
    dateCreated: "2023-10-10",
    lastUpdated: "2023-10-16",
    priority: "high",
    assignedTo: "David Wilson",
  },
  {
    id: "CASE-2023-004",
    name: "Williams v. InsuranceCo",
    plaintiff: "James Williams",
    stage: "documentation",
    stageStatus: "blocked",
    progress: 60,
    dateCreated: "2023-10-05",
    lastUpdated: "2023-10-15",
    priority: "high",
    assignedTo: "Emily Chen",
    notes: "Waiting for additional medical records from plaintiff.",
  },
  {
    id: "CASE-2023-005",
    name: "Brown v. RetailCorp",
    plaintiff: "Jennifer Brown",
    stage: "settlement",
    stageStatus: "in_progress",
    progress: 85,
    dateCreated: "2023-09-20",
    lastUpdated: "2023-10-14",
    priority: "medium",
    assignedTo: "Michael Rodriguez",
  },
  {
    id: "CASE-2023-006",
    name: "Miller v. HealthProvider",
    plaintiff: "Thomas Miller",
    stage: "completed",
    stageStatus: "completed",
    progress: 100,
    dateCreated: "2023-09-10",
    lastUpdated: "2023-10-12",
    priority: "low",
    assignedTo: "Jennifer Martinez",
    notes: "Case settled for $175,000.",
  },
]

