"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Users, BarChart3, Calendar, Settings, Package } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  company: string
}

const navigation = [
  { name: "Customers", href: "/dashboard", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Meetings", href: "/meetings", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log("[v0] DashboardLayout useEffect triggered")
    try {
      const userData = localStorage.getItem("wholesaler_user")
      console.log("[v0] Retrieved user data from localStorage:", userData)

      if (!userData) {
        console.log("[v0] No user data found, redirecting to login")
        router.push("/")
        return
      }

      const parsedUser = JSON.parse(userData)
      console.log("[v0] Parsed user data:", parsedUser)
      setUser(parsedUser)
    } catch (error) {
      console.log("[v0] Error parsing user data:", error)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    console.log("[v0] Logging out user")
    localStorage.removeItem("wholesaler_user")
    router.push("/")
  }

  if (isLoading) {
    console.log("[v0] Dashboard still loading...")
    return <div>Loading...</div>
  }

  if (!user) {
    console.log("[v0] No user found, should redirect")
    return <div>Redirecting...</div>
  }

  console.log("[v0] Rendering dashboard for user:", user.name)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-card-foreground">Sales Prep Tool</h1>
          </div>
          <nav className="flex items-center space-x-6 ml-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || (item.href === "/dashboard" && pathname.startsWith("/customer"))
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => router.push(item.href)}
                  className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.company}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
