"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const NavigationMenuContext = React.createContext<{
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
}>({
  activeIndex: null,
  setActiveIndex: () => {},
})

const NavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    viewportClassName?: string
  }
>(({ className, children, viewportClassName, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [viewportItems, setViewportItems] = React.useState<React.ReactNode[]>([])

  return (
    <NavigationMenuContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div ref={ref} className={cn("relative z-10 flex flex-1 items-center justify-center", className)} {...props}>
        <div className="group flex flex-1 items-center justify-center space-x-1">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === NavigationMenuList) {
              return React.cloneElement(child as React.ReactElement, {
                onUpdateViewport: (items: React.ReactNode[]) => setViewportItems(items),
              })
            }
            return child
          })}
          <div className={cn("absolute left-0 top-full flex justify-center", viewportClassName)}>
            <div className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]">
              {activeIndex !== null && viewportItems[activeIndex]}
            </div>
          </div>
        </div>
      </div>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    onUpdateViewport?: (items: React.ReactNode[]) => void
  }
>(({ className, onUpdateViewport, ...props }, ref) => {
  const viewportItems: React.ReactNode[] = []

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child) && child.type === NavigationMenuItem) {
      const content = React.Children.toArray(child.props.children).find(
        (c) => React.isValidElement(c) && c.type === NavigationMenuContent,
      )

      if (content) {
        viewportItems.push(content)
      } else {
        viewportItems.push(null)
      }
    }
    return child
  })

  React.useEffect(() => {
    onUpdateViewport?.(viewportItems)
  }, [viewportItems, onUpdateViewport])

  return (
    <ul
      ref={ref}
      className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
      {...props}
    >
      {childrenWithProps}
    </ul>
  )
})
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    index?: number
  }
>(({ className, index, ...props }, ref) => {
  const { activeIndex, setActiveIndex } = React.useContext(NavigationMenuContext)
  const isActive = activeIndex === index

  return (
    <li
      ref={ref}
      className={cn(className)}
      onMouseEnter={() => setActiveIndex(index ?? null)}
      onMouseLeave={() => setActiveIndex(null)}
      data-state={isActive ? "open" : "closed"}
      {...props}
    />
  )
})
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  ),
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
        className,
      )}
      {...props}
    />
  ),
)
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
)
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  ),
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </div>
  ),
)
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
