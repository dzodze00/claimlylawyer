"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, FileText, Phone, Calendar, Clock, ExternalLink } from "lucide-react"

// Sample data for recent activity
const activityData = [
  {
    id: 1,
    plaintiffName: "John Doe",
    caseId: "PL-2023-0042",
    type: "email_opened",
    subject: "Document submission reminder",
    timestamp: "2025-03-21T14:32:00",
  },
  {
    id: 2,
    plaintiffName: "Sarah Johnson",
    caseId: "PL-2023-0078",
    type: "document_viewed",
    subject: "Settlement agreement",
    timestamp: "2025-03-21T13:15:00",
  },
  {
    id: 3,
    plaintiffName: "Michael Brown",
    caseId: "PL-2023-0103",
    type: "link_clicked",
    subject: "Evidence submission portal",
    timestamp: "2025-03-21T11:47:00",
  },
  {
    id: 4,
    plaintiffName: "Emily Wilson",
    caseId: "PL-2023-0091",
    type: "email_replied",
    subject: "Court date confirmation",
    timestamp: "2025-03-21T10:22:00",
  },
  {
    id: 5,
    plaintiffName: "Robert Garcia",
    caseId: "PL-2023-0115",
    type: "call_scheduled",
    subject: "Initial consultation",
    timestamp: "2025-03-21T09:05:00",
  },
]

export function RecentActivity() {
  const [activities] = useState(activityData)

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email_opened":
      case "email_replied":
        return <Mail className="h-4 w-4" />
      case "document_viewed":
        return <FileText className="h-4 w-4" />
      case "link_clicked":
        return <ExternalLink className="h-4 w-4" />
      case "call_scheduled":
        return <Phone className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getActivityText = (activity: (typeof activityData)[0]) => {
    switch (activity.type) {
      case "email_opened":
        return `opened email "${activity.subject}"`
      case "email_replied":
        return `replied to "${activity.subject}"`
      case "document_viewed":
        return `viewed document "${activity.subject}"`
      case "link_clicked":
        return `clicked link to "${activity.subject}"`
      case "call_scheduled":
        return `scheduled a call for "${activity.subject}"`
      default:
        return `interacted with "${activity.subject}"`
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            <div className="mt-0.5 bg-muted p-2 rounded-full">{getTypeIcon(activity.type)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{activity.plaintiffName}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatTime(activity.timestamp)}
                </div>
              </div>
              <div className="text-sm">{getActivityText(activity)}</div>
              <div className="mt-1">
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{activity.caseId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="link" className="w-full mt-2">
        View all activity
      </Button>
    </div>
  )
}

