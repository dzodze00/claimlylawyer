"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Copy, Trash, Mail } from "lucide-react"

// Sample template data
const templateData = [
  {
    id: 1,
    name: "Initial Contact",
    description: "First outreach to new plaintiffs",
    category: "Onboarding",
    lastModified: "2025-03-15",
    usageCount: 245,
  },
  {
    id: 2,
    name: "Document Request",
    description: "Request for supporting documentation",
    category: "Documentation",
    lastModified: "2025-03-10",
    usageCount: 189,
  },
  {
    id: 3,
    name: "Case Status Update",
    description: "Regular update on case progress",
    category: "Updates",
    lastModified: "2025-03-18",
    usageCount: 312,
  },
  {
    id: 4,
    name: "Settlement Offer",
    description: "Details of settlement offer",
    category: "Settlement",
    lastModified: "2025-03-05",
    usageCount: 78,
  },
  {
    id: 5,
    name: "Court Date Reminder",
    description: "Reminder of upcoming court appearance",
    category: "Reminders",
    lastModified: "2025-03-12",
    usageCount: 156,
  },
]

export function EmailTemplateList() {
  const [templates, setTemplates] = useState(templateData)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="border rounded-md">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Template Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Usage
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTemplates.map((template) => (
              <tr key={template.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{template.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{template.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 text-xs bg-muted rounded-full">{template.category}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{template.lastModified}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{template.usageCount} times</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(template.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

