import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailTemplateList } from "@/components/templates/email-template-list"
import { EmailTemplateEditor } from "@/components/templates/email-template-editor"
import { EmailTemplateGenerator } from "@/components/templates/email-template-generator"

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
        <p className="text-muted-foreground">Create and manage email templates for plaintiff communications.</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
          <TabsTrigger value="editor">Template Editor</TabsTrigger>
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage your saved email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailTemplateList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Template Editor</CardTitle>
              <CardDescription>Create or edit email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailTemplateEditor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>AI Template Generator</CardTitle>
              <CardDescription>Generate personalized email templates with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailTemplateGenerator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

