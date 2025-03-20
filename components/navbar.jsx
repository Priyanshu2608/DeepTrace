"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, FileText, Image, Database, BarChart3, Home } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2 " /> },
    { name: "Text Analysis", path: "/text-analysis", icon: <FileText className="h-4 w-4 mr-2 " /> },
    { name: "Image Analysis", path: "/image-analysis", icon: <Image className="h-4 w-4 mr-2" /> },
    { name: "Metadata Analysis", path: "/metadata-analysis", icon: <Database className="h-4 w-4 mr-2" /> },
    { name: "Behavioral Analysis", path: "/behavioral-analysis", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 ">
              <img src="/images/LOGO.png" alt="Logo" className="h-[50px] w-[70px]" />
              <span className="text-xl font-bold">DEEPTRACE</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? "default" : "ghost"}
                asChild
                className="flex items-center rounded-[20px] "
              >
                <Link href={route.path}>
                  {route.icon}
                  {route.name}
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-4  ">
            <ModeToggle />
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-2 space-y-1">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? "default" : "ghost"}
                asChild
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link href={route.path}>
                  {route.icon}
                  {route.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}