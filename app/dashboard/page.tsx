import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex items-center space-x-2">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>Configure your case details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-name">Case Name</Label>
                <Input id="case-name" defaultValue="Johnson v. PharmaCorp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-type">Case Type</Label>
                <Input id="case-type" defaultValue="Product Liability - Defective Medical Device" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-description">Case Description</Label>
                <textarea
                  id="case-description"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={4}
                  defaultValue="Class action lawsuit against PharmaCorp for defective XYZ Hip Implant causing metallosis, tissue damage, and requiring revision surgeries."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Display more information in less space</p>
                </div>
                <Switch id="compact-view" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Auto-Refresh Data</Label>
                  <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                </div>
                <Switch id="auto-refresh" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Discovery Settings</CardTitle>
              <CardDescription>Configure AI plaintiff discovery parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Discovery Keywords</Label>
                <Input id="keywords" defaultValue="XYZ Hip Implant, joint pain, revision surgery, metallosis" />
                <p className="text-sm text-muted-foreground">
                  Comma-separated keywords for AI to search for potential plaintiffs
                </p>
              </div>

              <div className="space-y-2">
                <Label>Data Sources</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="social-media" defaultChecked />
                    <Label htmlFor="social-media">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="medical-forums" defaultChecked />
                    <Label htmlFor="medical-forums">Medical Forums</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="consumer-complaints" defaultChecked />
                    <Label htmlFor="consumer-complaints">Consumer Complaints</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="news-articles" defaultChecked />
                    <Label htmlFor="news-articles">News Articles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="court-records" defaultChecked />
                    <Label htmlFor="court-records">Court Records</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="product-reviews" defaultChecked />
                    <Label htmlFor="product-reviews">Product Reviews</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-match">Minimum Match Score</Label>
                <div className="flex items-center space-x-2">
                  <Input id="min-match" type="number" defaultValue="70" className="w-20" />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum confidence score for AI to identify a potential plaintiff
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Validation Settings</CardTitle>
              <CardDescription>Configure AI claim validation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="validation-threshold">Validation Threshold</Label>
                <div className="flex items-center space-x-2">
                  <Input id="validation-threshold" type="number" defaultValue="85" className="w-20" />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-sm text-muted-foreground">Minimum confidence score for AI to validate a claim</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fraud-threshold">Fraud Detection Threshold</Label>
                <div className="flex items-center space-x-2">
                  <Input id="fraud-threshold" type="number" defaultValue="75" className="w-20" />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum risk score for AI to flag a claim for potential fraud
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-validation">Automatic Validation</Label>
                  <p className="text-sm text-muted-foreground">Automatically validate claims that meet the threshold</p>
                </div>
                <Switch id="auto-validation" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-flagging">Automatic Fraud Flagging</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically flag claims that exceed the fraud threshold
                  </p>
                </div>
                <Switch id="auto-flagging" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch id="sms-notifications" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Notification Events</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="new-plaintiff" defaultChecked />
                    <Label htmlFor="new-plaintiff">New plaintiff discovered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="claim-validated" defaultChecked />
                    <Label htmlFor="claim-validated">Claim validated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="fraud-detected" defaultChecked />
                    <Label htmlFor="fraud-detected">Potential fraud detected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="settlement-update" defaultChecked />
                    <Label htmlFor="settlement-update">Settlement estimate updated</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Integrations</CardTitle>
              <CardDescription>Connect to external data sources and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Document Management System</h3>
                    <p className="text-sm text-muted-foreground">Connect to your document storage system</p>
                  </div>
                  <Switch id="dms-integration" defaultChecked />
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="dms-provider">Provider</Label>
                      <Input id="dms-provider" defaultValue="SharePoint" />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="dms-url">URL</Label>
                      <Input id="dms-url" defaultValue="https://lawfirm.sharepoint.com/sites/classaction" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">CRM Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect to your client relationship management system
                    </p>
                  </div>
                  <Switch id="crm-integration" defaultChecked />
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="crm-provider">Provider</Label>
                      <Input id="crm-provider" defaultValue="Salesforce" />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="crm-instance">Instance URL</Label>
                      <Input id="crm-instance" defaultValue="https://lawfirm.my.salesforce.com" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Court Records API</h3>
                    <p className="text-sm text-muted-foreground">Connect to court records database</p>
                  </div>
                  <Switch id="court-integration" />
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="court-provider">Provider</Label>
                      <Input id="court-provider" defaultValue="PACER" />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="court-api-key">API Key</Label>
                      <Input id="court-api-key" type="password" defaultValue="••••••••••••••••" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
