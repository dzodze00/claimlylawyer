"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

// Fix: Use proper type definition instead of importing non-existent type
export function ThemeProvider({
  children,
  ...props
}: {
  children: ReactNode
  [key: string]: any
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

