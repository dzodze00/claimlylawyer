"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Wand2, Save, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"

export function EmailTemplateGenerator() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [templateType, setTemplateType] = useState("initial-contact")
  const [tone, setTone] = useState("professional")
  const [generatedTemplate, setGeneratedTemplate] = useState({
    subject: "",
    content: "",
  })

  const handleGenerate = () => {
    setGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const templates = {
        "initial-contact": {
          professional: {
            subject: "Your Case with ClaimlyLawyer - Next Steps",
            content: `Dear {{plaintiff.firstName}},

I hope this email finds you well. My name is {{attorney.name}}, and I will be the lead attorney handling your {{case.type}} case (Case #{{case.number}}).

I wanted to reach out personally to welcome you to ClaimlyLawyer and provide you with some important information about the next steps in your case.

We have received your initial documentation and have begun the process of reviewing your claim. Based on our preliminary assessment, we believe you have a strong case, and we are committed to working diligently to achieve the best possible outcome for you.

In the coming days, you will receive access to our secure client portal where you can:
- Track the progress of your case
- Upload additional documents
- Schedule meetings with our team
- Send secure messages

If you have any questions or concerns in the meantime, please don't hesitate to contact me directly at {{attorney.email}} or {{attorney.phone}}.

Thank you for trusting ClaimlyLawyer with your case. We look forward to working with you.

Best regards,
{{attorney.name}}
ClaimlyLawyer, LLC`,
          },
          friendly: {
            subject: "Welcome to ClaimlyLawyer - We're Here to Help!",
            content: `Hi {{plaintiff.firstName}},

I'm {{attorney.name}}, and I'm thrilled to be working with you on your {{case.type}} case!

First off, I want you to know that you've made a great decision choosing ClaimlyLawyer. We're going to be with you every step of the way as we navigate your case together.

I've already started reviewing the details of your situation (Case #{{case.number}}), and I'm confident we can help you get the outcome you deserve.

Here's what happens next:
- You'll get an email with login details for our client portal
- We'll schedule an initial strategy call to discuss your case in detail
- Our team will start gathering the evidence we need

Feel free to reach out anytime with questions! You can email me at {{attorney.email}} or call/text {{attorney.phone}} - I'm here for you.

Looking forward to working together!

Cheers,
{{attorney.name}}
ClaimlyLawyer`,
          },
        },
        "follow-up": {
          professional: {
            subject: "Follow-up: Your Case #{{case.number}} Status Update",
            content: `Dear {{plaintiff.firstName}},

I am writing to follow up regarding your {{case.type}} case (Case #{{case.number}}) as we have not received a response to our previous communication.

As of {{case.filingDate}}, your case status is currently "{{case.status}}". To continue making progress, we require your attention on several important matters.

Please log in to your client portal at your earliest convenience to:
1. Review and sign the pending documents
2. Provide the additional information we requested
3. Schedule your deposition preparation session

If you are experiencing any difficulties accessing the portal or have questions about the requested items, please contact me directly at {{attorney.email}} or {{attorney.phone}}.

Your timely response is greatly appreciated and will help us maintain momentum in your case.

Sincerely,
{{attorney.name}}
ClaimlyLawyer, LLC`,
          },
          friendly: {
            subject: "Quick check-in on your case - need your input!",
            content: `Hi {{plaintiff.firstName}},

Just checking in about your {{case.type}} case! I noticed we haven't heard back from you recently, and I wanted to make sure everything's okay.

Your case (#{{case.number}}) is currently in the "{{case.status}}" phase, but we need your help to keep things moving forward.

Could you take a few minutes to:
- Sign those documents waiting in your portal
- Fill out the additional info we need
- Pick a time for us to prep for your deposition

If you're having any trouble with the portal or just want to chat about your case, feel free to reach out directly! You can email me at {{attorney.email}} or call/text {{attorney.phone}}.

Looking forward to hearing from you soon!

Best,
{{attorney.name}}
ClaimlyLawyer`,
          },
        },
      }

      // Get the appropriate template based on type and tone
      const template =
        templates[templateType as keyof typeof templates]?.[tone as keyof (typeof templates)["initial-contact"]]

      if (template) {
        setGeneratedTemplate(template)
      } else {
        // Fallback template
        setGeneratedTemplate({
          subject: "Your Case with ClaimlyLawyer",
          content: `Dear {{plaintiff.firstName}},

This is regarding your {{case.type}} case (Case #{{case.number}}).

Please contact {{attorney.name}} at {{attorney.email}} or {{attorney.phone}} for more information.

Regards,
ClaimlyLawyer, LLC`,
        })
      }

      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  const handleSaveTemplate = () => {
    // Logic to save the template would go here
    alert("Template saved successfully!")
  }

  const handleRegenerateTemplate = () => {
    setGenerating(true)

    // Simulate regeneration
    setTimeout(() => {
      // Slightly modify the existing template
      setGeneratedTemplate({
        subject: generatedTemplate.subject,
        content: generatedTemplate.content.replace(
          "I hope this email finds you well.",
          "I trust this email finds you well and in good spirits.",
        ),
      })

      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-type">Template Type</Label>
              <Select value={templateType} onChange={(value) => setTemplateType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial-contact">Initial Contact</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="document-request">Document Request</SelectItem>
                  <SelectItem value="status-update">Status Update</SelectItem>
                  <SelectItem value="settlement-offer">Settlement Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-tone">Tone</Label>
              <Select value={tone} onChange={(value) => setTone(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Additional Instructions (Optional)</Label>
            <Textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Include information about document submission deadlines, mention our satisfaction guarantee..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Template
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {generated ? (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Subject</Label>
                      <div className="font-medium">{generatedTemplate.subject}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Content</Label>
                      <div className="whitespace-pre-line text-sm">{generatedTemplate.content}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Good
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Needs Work
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleRegenerateTemplate} disabled={generating}>
                    {generating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    <span className="ml-2">Regenerate</span>
                  </Button>
                  <Button size="sm" onClick={handleSaveTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-md border-dashed">
              <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">AI Template Generator</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select a template type and tone, then click "Generate Template" to create a personalized email template
                using AI.
              </p>
              <p className="text-xs text-muted-foreground">
                You can provide additional instructions to customize the output.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

