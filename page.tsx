import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 ">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Plaintiff Discovery & Claim Validation System
        </h1>
        <p className="text-center text-lg text-gray-600">
          AI-powered legal case management for efficient plaintiff discovery and claim validation
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg">Enter Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

