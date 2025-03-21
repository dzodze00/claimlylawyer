"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, Code, Wand2 } from "lucide-react"

// Sample variable options
const variableOptions = [
  { value: "{{plaintiff.firstName}}", label: "First Name" },
  { value: "{{plaintiff.lastName}}", label: "Last Name" },
  { value: "{{plaintiff.fullName}}", label: "Full Name" },
  { value: "{{case.number}}", label: "Case Number" },
  { value: "{{case.type}}", label: "Case Type" },
  { value: "{{case.status}}", label: "Case Status" },
  { value: "{{case.filingDate}}", label: "Filing Date" },
  { value: "{{attorney.name}}", label: "Attorney Name" },
  { value: "{{attorney.email}}", label: "Attorney Email" },
  { value: "{{attorney.phone}}", label: "Attorney Phone" },
]

export function EmailTemplateEditor() {
  const [template, setTemplate] = useState({
    name: "",
    subject: "",
    category: "Onboarding",
    content: "",
  })

  const [previewData, setPreviewData] = useState({
    "plaintiff.firstName": "John",
    "plaintiff.lastName": "Doe",
    "plaintiff.fullName": "John Doe",
    "case.number": "PL-2023-0042",
    "case.type": "Personal Injury",
    "case.status": "Discovery",
    "case.filingDate": "January 15, 2023",
    "attorney.name": "Sarah Johnson",
    "attorney.email": "sjohnson@claimlylawyer.com",
    "attorney.phone": "(555) 123-4567",
  })

  const handleInsertVariable = (variable: string) => {
    setTemplate({
      ...template,
      content: template.content + " " + variable,
    })
  }

  const renderPreview = () => {
    let previewContent = template.content

    Object.entries(previewData).forEach(([key, value]) => {
      previewContent = previewContent.replace(new RegExp(`{{${key}}}`, "g"), value)
    })

    return previewContent
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                placeholder="e.g., Initial Contact"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-category">Category</Label>
              <Select
                value={template.category}
                onChange={(value) => setTemplate({ ...template, category: value })}
                options={[
                  { value: "Onboarding", label: "Onboarding" },
                  { value: "Documentation", label: "Documentation" },
                  { value: "Updates", label: "Updates" },
                  { value: "Settlement", label: "Settlement" },
                  { value: "Reminders", label: "Reminders" },
                  { value: "Engagement", label: "Engagement" },
                ]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-subject">Email Subject</Label>
            <Input
              id="template-subject"
              value={template.subject}
              onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
              placeholder="e.g., Welcome to Your Case Portal"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="template-content">Email Content</Label>
              <div className="flex items-center space-x-2">
                <Select
                  value=""
                  onChange={(value) => handleInsertVariable(value)}
                  options={variableOptions}
                  className="w-48"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Insert variable..." />
                  </SelectTrigger>
                  <SelectContent>
                    {variableOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Improve
                </Button>
              </div>
            </div>
            <Textarea
              id="template-content"
              value={template.content}
              onChange={(e) => setTemplate({ ...template, content: e.target.value })}
              placeholder="Write your email content here..."
              className="min-h-[300px]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="h-4 w-4 mr-2" />
                HTML
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    From: Sarah Johnson &lt;sjohnson@claimlylawyer.com&gt;
                  </div>
                  <div className="text-sm text-muted-foreground">To: John Doe &lt;john.doe@example.com&gt;</div>
                  <div className="text-sm text-muted-foreground">Subject: {template.subject || "(No subject)"}</div>
                </div>
                <div className="border-t pt-4 whitespace-pre-line">{renderPreview() || "(No content)"}</div>
              </div>
            </TabsContent>
            <TabsContent value="code" className="border rounded-md p-4 min-h-[400px]">
              <pre className="text-xs overflow-auto">
                {`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${template.subject}</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    ${template.content.replace(/\n/g, "\n    ")}
  </div>
</body>
</html>`}
              </pre>
            </TabsContent>
          </Tabs>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Preview Data</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(previewData).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{`{{${key}}}`}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>
    </div>
  )
}

