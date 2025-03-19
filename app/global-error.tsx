"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Something went wrong!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We apologize for the inconvenience. Please try again.
            </p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  )
}

