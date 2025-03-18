import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">User</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

