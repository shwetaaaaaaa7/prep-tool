"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login form submitted", { email, password: "***" })
    setIsLoading(true)
    setError("")

    // Simulate authentication - in real app, this would call your auth API
    try {
      console.log("[v0] Starting authentication simulation")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password
      if (email && password) {
        console.log("[v0] Email and password provided, creating user session")
        // Store user session (in real app, use proper auth)
        const userData = {
          id: "1",
          email,
          name: "John Wholesaler",
          company: "ABC Wholesale Co.",
        }

        localStorage.setItem("wholesaler_user", JSON.stringify(userData))
        console.log("[v0] User data stored in localStorage", userData)

        console.log("[v0] Attempting to navigate to dashboard")
        router.push("/dashboard")
        console.log("[v0] Navigation command sent")
      } else {
        console.log("[v0] Missing email or password")
        setError("Please enter both email and password")
      }
    } catch (err) {
      console.log("[v0] Authentication error:", err)
      setError("Login failed. Please try again.")
    } finally {
      console.log("[v0] Setting loading to false")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
