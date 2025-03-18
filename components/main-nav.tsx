"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { type LucideIcon, Home, FileCheck, BarChart2, Settings, Search } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Plaintiff Discovery",
    href: "/dashboard/discovery",
    icon: Search,
  },
  {
    title: "Claim Management",
    href: "/dashboard/claims",
    icon: FileCheck,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">LegalAI</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="mr-1 h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

