"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  title: string
  status: string
  completed: boolean
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review discovery documents", status: "In Progress", completed: false },
    { id: "2", title: "Prepare client interview questions", status: "Pending", completed: false },
    { id: "3", title: "File motion for extension", status: "Completed", completed: true },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const addTask = () => {
    if (newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: "Pending",
      completed: false,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const updateTaskStatus = (id: string, status: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = statusFilter === "All" ? tasks : tasks.filter((task) => task.status === statusFilter)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
        <CardDescription>Manage your case-related tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button onClick={addTask}>Add</Button>
        </div>

        <div className="mb-4">
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={[
              { value: "All", label: "All Tasks" },
              { value: "Pending", label: "Pending" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </div>

        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={task.status}
                  onChange={(value) => updateTaskStatus(task.id, value)}
                  options={[
                    { value: "Pending", label: "Pending" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Completed", label: "Completed" },
                  ]}
                  className="w-32"
                />
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
        </div>
      </CardFooter>
    </Card>
  )
}
