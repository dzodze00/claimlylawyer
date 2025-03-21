"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mail, Phone } from "lucide-react"

// Sample data for reminders
const reminderData = [
  {
    id: 1,
    plaintiffName: "John Doe",
    caseId: "PL-2023-0042",
    type: "email",
    subject: "Document submission reminder",
    scheduledFor: "2025-03-22T10:00:00",
    status: "scheduled",
  },
  {
    id: 2,
    plaintiffName: "Sarah Johnson",
    caseId: "PL-2023-0078",
    type: "phone",
    subject: "Case update call",
    scheduledFor: "2025-03-22T14:30:00",
    status: "scheduled",
  },
  {
    id: 3,
    plaintiffName: "Michael Brown",
    caseId: "PL-2023-0103",
    type: "email",
    subject: "Settlement offer details",
    scheduledFor: "2025-03-23T09:15:00",
    status: "scheduled",
  },
  {
    id: 4,
    plaintiffName: "Emily Wilson",
    caseId: "PL-2023-0091",
    type: "email",
    subject: "Court date confirmation",
    scheduledFor: "2025-03-23T16:00:00",
    status: "scheduled",
  },
  {
    id: 5,
    plaintiffName: "Robert Garcia",
    caseId: "PL-2023-0115",
    type: "phone",
    subject: "Initial consultation",
    scheduledFor: "2025-03-24T11:30:00",
    status: "scheduled",
  },
]

interface UpcomingRemindersProps {
  detailed?: boolean
}

export function UpcomingReminders({ detailed = false }: UpcomingRemindersProps) {
  const [reminders, setReminders] = useState(reminderData)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const handleCancel = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const handleSendNow = (id: number) => {
    setReminders(reminders.map((reminder) => (reminder.id === id ? { ...reminder, status: "sent" } : reminder)))
  }

  return (
    <div className="space-y-4">
      {detailed && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upcoming Reminders</h3>
          <Button size="sm">Create New Reminder</Button>
        </div>
      )}

      <div className="space-y-3">
        {reminders.slice(0, detailed ? undefined : 3).map((reminder) => (
          <div key={reminder.id} className="flex items-start justify-between p-3 border rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-muted p-2 rounded-full">{getTypeIcon(reminder.type)}</div>
              <div>
                <div className="font-medium">{reminder.plaintiffName}</div>
                <div className="text-sm text-muted-foreground">{reminder.subject}</div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDate(reminder.scheduledFor)}
                  <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{reminder.caseId}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              {reminder.status === "scheduled" && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => handleSendNow(reminder.id)}>
                    Send Now
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCancel(reminder.id)}>
                    Cancel
                  </Button>
                </>
              )}
              {reminder.status === "sent" && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Sent</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!detailed && reminders.length > 3 && (
        <Button variant="link" className="w-full mt-2">
          View all {reminders.length} reminders
        </Button>
      )}
    </div>
  )
}

