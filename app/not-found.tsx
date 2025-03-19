import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-lg text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}

