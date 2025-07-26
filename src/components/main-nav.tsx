"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Leaf className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          Emission Audit
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Calculate
        </Link>
        <Link
          href="/result"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/result" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Result
        </Link>
        <Link
          href="/history"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/history" ? "text-foreground" : "text-foreground/60"
          )}
        >
          History
        </Link>
      </nav>
    </div>
  )
}
