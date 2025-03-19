"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertTriangle, Calendar, User, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export type TaskPriority = "high" | "medium" | "low"
export type TaskStatus = "pending" | "in_progress" | "completed" | "blocked"
export type TaskType = "discovery" | "validation" | "outreach" | "documentation" | "settlement" | "administrative"

export interface Task {
  id: string
  title: string
  description: string
  caseId?: string
  caseName?: string
  assignedTo?: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus
  type: TaskType
  createdAt: string
  updatedAt: string
}

interface TaskCardProps {
  task: Task
  onSelect: (task: Task) => void
  isSelected: boolean
}

function TaskCard({ task, onSelect, isSelected }: TaskCardProps) {
  const getStatusBadge = (status: TaskStatus) => {
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

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div
      className={`
        cursor-pointer rounded-md border p-3 transition-colors hover:bg-muted
        ${isSelected ? "border-primary bg-muted/50" : ""}
      `}
      onClick={() => onSelect(task)}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{task.title}</h4>
        {getStatusBadge(task.status)}
      </div>

      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{task.dueDate}</span>
        </div>
        {getPriorityBadge(task.priority)}
      </div>

      {task.caseName && (
        <div className="mt-2 flex items-center space-x-2">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{task.caseName}</span>
        </div>
      )}

      {task.assignedTo && (
        <div className="mt-2 flex items-center space-x-2">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[10px]">
              {task.assignedTo
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{task.assignedTo}</span>
        </div>
      )}
    </div>
  )
}

export function TaskManager() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [activeTab, setActiveTab] = useState("my-tasks")
  const [taskStatus, setTaskStatus] = useState<TaskStatus | "all">("all")

  const filteredTasks = mockTasks.filter((task) => {
    if (activeTab === "my-tasks" && task.assignedTo !== "Michael Rodriguez") return false
    if (taskStatus !== "all" && task.status !== taskStatus) return false
    return true
  })

  const updateTaskStatus = (status: TaskStatus) => {
    if (!selectedTask) return

    // In a real app, you would update the task in your backend
    // For this demo, we'll just update the local state
    const updatedTask = { ...selectedTask, status }
    setSelectedTask(updatedTask)

    // This would be replaced with an actual API call
    console.log(`Updated task ${updatedTask.id} status to ${status}`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="col-span-3">
        <CardHeader className="space-y-0 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
          <CardDescription>Manage and track case-related tasks</CardDescription>

          <div className="mt-2 flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tasks..." className="pl-8" />
            </div>
            <Select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as TaskStatus | "all")}
              className="w-[180px]"
              options={[
                { value: "all", label: "All Statuses" },
                { value: "pending", label: "Pending" },
                { value: "in_progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
                { value: "blocked", label: "Blocked" },
              ]}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="my-tasks" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
              <TabsTrigger value="team-tasks">Team Tasks</TabsTrigger>
              <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-2 pt-2">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onSelect={setSelectedTask}
                      isSelected={selectedTask?.id === task.id}
                    />
                  ))
                ) : (
                  <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No tasks found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>View and update task information</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedTask ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
                <p className="text-sm text-muted-foreground">Task ID: {selectedTask.id}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  {selectedTask.status === "pending" && (
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                  )}
                  {selectedTask.status === "in_progress" && (
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" /> In Progress
                    </Badge>
                  )}
                  {selectedTask.status === "completed" && (
                    <Badge>
                      <CheckCircle className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                  {selectedTask.status === "blocked" && (
                    <Badge variant="destructive">
                      <AlertTriangle className="mr-1 h-3 w-3" /> Blocked
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Priority</p>
                  {selectedTask.priority === "high" && <Badge variant="destructive">High</Badge>}
                  {selectedTask.priority === "medium" && <Badge variant="secondary">Medium</Badge>}
                  {selectedTask.priority === "low" && <Badge variant="outline">Low</Badge>}
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Due Date</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedTask.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Description</p>
                <p className="rounded-md bg-muted p-3 text-sm">{selectedTask.description}</p>
              </div>

              {selectedTask.caseName && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Related Case</p>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedTask.caseName}</span>
                    <span className="text-xs text-muted-foreground">({selectedTask.caseId})</span>
                  </div>
                </div>
              )}

              {selectedTask.assignedTo && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Assigned To</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {selectedTask.assignedTo
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedTask.assignedTo}</span>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm font-medium">Activity</p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 rounded-md bg-muted p-2 text-sm">
                    <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p>
                        <span className="font-medium">Michael Rodriguez</span> created this task
                      </p>
                      <p className="text-xs text-muted-foreground">{selectedTask.createdAt}</p>
                    </div>
                  </div>

                  {selectedTask.updatedAt !== selectedTask.createdAt && (
                    <div className="flex items-start space-x-2 rounded-md bg-muted p-2 text-sm">
                      <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>
                          <span className="font-medium">Jennifer Martinez</span> updated the status to{" "}
                          {selectedTask.status}
                        </p>
                        <p className="text-xs text-muted-foreground">{selectedTask.updatedAt}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">No task selected</p>
                <p className="text-sm text-muted-foreground">Select a task from the list to view details</p>
              </div>
            </div>
          )}
        </CardContent>
        {selectedTask && (
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Reassign
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <div className="flex space-x-2">
              {selectedTask.status !== "in_progress" && (
                <Button size="sm" onClick={() => updateTaskStatus("in_progress")}>
                  Start Task
                </Button>
              )}
              {selectedTask.status !== "completed" && (
                <Button size="sm" onClick={() => updateTaskStatus("completed")}>
                  Complete Task
                </Button>
              )}
              {selectedTask.status !== "blocked" && (
                <Button variant="destructive" size="sm" onClick={() => updateTaskStatus("blocked")}>
                  Block Task
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const mockTasks: Task[] = [
  {
    id: "TASK-2023-001",
    title: "Review medical records for Sarah Johnson",
    description:
      "Review and validate medical records for the Johnson v. PharmaCorp case. Check for evidence of XYZ Hip Implant complications.",
    caseId: "CASE-2023-001",
    caseName: "Johnson v. PharmaCorp",
    assignedTo: "Michael Rodriguez",
    dueDate: "2023-10-25",
    priority: "high",
    status: "in_progress",
    type: "validation",
    createdAt: "2023-10-18 09:30",
    updatedAt: "2023-10-18 14:45",
  },
  {
    id: "TASK-2023-002",
    title: "Schedule interview with Robert Smith",
    description: "Contact Robert Smith to schedule an initial interview for the Smith v. TechGiant case.",
    caseId: "CASE-2023-002",
    caseName: "Smith v. TechGiant",
    assignedTo: "Jennifer Martinez",
    dueDate: "2023-10-26",
    priority: "medium",
    status: "pending",
    type: "discovery",
    createdAt: "2023-10-18 10:15",
    updatedAt: "2023-10-18 10:15",
  },
  {
    id: "TASK-2023-003",
    title: "Draft outreach email campaign",
    description: "Create email templates for the Garcia v. AutoManufacturer outreach campaign.",
    caseId: "CASE-2023-003",
    caseName: "Garcia v. AutoManufacturer",
    assignedTo: "Michael Rodriguez",
    dueDate: "2023-10-24",
    priority: "medium",
    status: "pending",
    type: "outreach",
    createdAt: "2023-10-17 15:30",
    updatedAt: "2023-10-17 15:30",
  },
  {
    id: "TASK-2023-004",
    title: "Follow up on missing medical records",
    description: "Contact James Williams to request the missing medical records needed for claim validation.",
    caseId: "CASE-2023-004",
    caseName: "Williams v. InsuranceCo",
    assignedTo: "Emily Chen",
    dueDate: "2023-10-23",
    priority: "high",
    status: "blocked",
    type: "documentation",
    createdAt: "2023-10-16 11:20",
    updatedAt: "2023-10-18 09:15",
  },
  {
    id: "TASK-2023-005",
    title: "Prepare settlement proposal",
    description: "Draft initial settlement proposal for the Brown v. RetailCorp case based on damage calculations.",
    caseId: "CASE-2023-005",
    caseName: "Brown v. RetailCorp",
    assignedTo: "Michael Rodriguez",
    dueDate: "2023-10-27",
    priority: "high",
    status: "pending",
    type: "settlement",
    createdAt: "2023-10-18 13:45",
    updatedAt: "2023-10-18 13:45",
  },
  {
    id: "TASK-2023-006",
    title: "Generate final case report",
    description: "Create comprehensive case report for the completed Miller v. HealthProvider case.",
    caseId: "CASE-2023-006",
    caseName: "Miller v. HealthProvider",
    assignedTo: "Jennifer Martinez",
    dueDate: "2023-10-30",
    priority: "low",
    status: "completed",
    type: "documentation",
    createdAt: "2023-10-15 14:30",
    updatedAt: "2023-10-17 16:20",
  },
]
