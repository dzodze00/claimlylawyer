import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">LegalAI</CardTitle>
          <CardDescription className="text-center">Plaintiff Discovery & Claim Validation System</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Link href="/dashboard" passHref>
              <Button className="w-full">Log in as Demo User</Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            This is a demo application showcasing AI-powered plaintiff discovery and claim validation for law firms.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

