"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import {
  BarChart3,
  BookText,
  Calendar,
  ChevronRight,
  LogOut,
  Menu,
  MessageSquare,
  Phone,
  PieChart,
  Slack,
  UserRound,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Icon colors for each feature
const iconColors = {
  Leads: "#4ade80", // green
  Outreach: "#60a5fa", // blue
  "Follow-Ups": "#f472b6", // pink
  Insights: "#a78bfa", // purple
  CRM: "#fbbf24", // yellow
  Scripts: "#fb923c", // orange
  Slack: "#38bdf8", // light blue
  Campaigns: "#fb7185", // red
}

// Mobile menu button component (within the sidebar context)
export function MobileMenuButton() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 bg-zinc-900/80 backdrop-blur-sm text-white hover:bg-zinc-800 hover:text-white"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}

// Mobile sidebar controller
function MobileSidebarController() {
  const { isMobile, setOpenMobile } = useSidebar()

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = (e) => {
      const sidebarEl = document.querySelector('[data-sidebar="sidebar"]')
      const triggerEl = document.querySelector('[data-sidebar="trigger"]')

      if (sidebarEl && !sidebarEl.contains(e.target) && triggerEl && !triggerEl.contains(e.target)) {
        setOpenMobile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, setOpenMobile])

  return null
}

export default function DashboardSidebar() {
  const { data: session } = useSession()
  const [selectedFeature, setSelectedFeature] = useState(null)
  const { data: integrations } = useSWR("/api/integrations", fetcher, {
    refreshInterval: 5000,
  })

  const features = [
    { name: "Leads", path: "/dashboard", requires: "gemini", icon: Users },
    { name: "Outreach", path: "/dashboard/Outreach", requires: "gemini", icon: Phone },
    { name: "Follow-Ups", path: "/dashboard/FollowUps", requires: "gemini", icon: Calendar },
    { name: "Insights", path: "/dashboard/Insights", requires: "gemini", icon: PieChart },
    { name: "CRM", path: "/dashboard/crm", requires: "zapier", icon: UserRound },
    { name: "Scripts", path: "/dashboard/scripts", requires: "gemini", icon: BookText },
    { name: "Slack", path: "/dashboard/slack", requires: "slack", icon: Slack },
    { name: "Campaigns", path: "/dashboard/campaigns", requires: "gemini", icon: BarChart3 },
  ]

  const handleFeatureClick = (feature) => {
    if (feature.requires && integrations) {
      const isIntegrated = integrations.some((int) => int.type === feature.requires)
      if (!isIntegrated) {
        setSelectedFeature(feature)
        return false
      }
    }
    setSelectedFeature(null)
    return true
  }

  const getInitials = (name) => {
    if (!name) return "AI"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <>
      <MobileSidebarController />
      <Sidebar className="border-r border-zinc-800 bg-black text-white shadow-lg z-50" collapsible="offcanvas">
        <SidebarHeader className="p-5 bg-black">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-md shadow-purple-500/20">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              AI Sales
            </h2>
          </div>
          <SidebarTrigger className="absolute right-3 top-5 text-white/90 hover:text-white md:hidden" />
        </SidebarHeader>

        {session && (
          <div className="mx-4 mb-6 flex items-center gap-3 rounded-xl bg-zinc-800/40 p-3 backdrop-blur-sm shadow-inner border border-zinc-700/30">
            <Avatar className="border-2 border-purple-500/30 ring-2 ring-purple-500/10">
              <AvatarImage src={session.user.image || "/logo.png"} alt={session.user.name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                {getInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="truncate font-medium text-white">{session.user.name}</p>
              <p className="truncate text-xs text-zinc-400">{session.user.email}</p>
            </div>
          </div>
        )}

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <TooltipProvider>
                  {features.map((feature) => {
                    const isIntegrated =
                      !feature.requires || (integrations && integrations.some((int) => int.type === feature.requires))
                    const iconColor = iconColors[feature.name] || "#ffffff"

                    return (
                      <SidebarMenuItem key={feature.name}>
                        {isIntegrated ? (
                          <SidebarMenuButton asChild className="transition-all hover:bg-zinc-800 group">
                            <Link href={feature.path}>
                              <feature.icon className="h-5 w-5" style={{ color: iconColor }} />
                              <span className="text-zinc-200 group-hover:text-white transition-colors">
                                {feature.name}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton
                                className="opacity-70 hover:opacity-90 transition-all hover:bg-zinc-800/70 group"
                                onClick={() => handleFeatureClick(feature)}
                              >
                                <feature.icon className="h-5 w-5" style={{ color: iconColor, opacity: 0.6 }} />
                                <span className="text-zinc-400 group-hover:text-zinc-300">{feature.name}</span>
                                <Badge
                                  variant="destructive"
                                  className="ml-auto text-xs font-medium py-0 px-2 bg-red-500/80"
                                >
                                  Locked
                                </Badge>
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                              <p>Requires {feature.requires} integration</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </SidebarMenuItem>
                    )
                  })}
                </TooltipProvider>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto bg-zinc-900/30">
          <Button
            variant="destructive"
            className="w-full transition-all hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium shadow-md"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <IntegrationDialog
        feature={selectedFeature}
        open={!!selectedFeature}
        onOpenChange={() => setSelectedFeature(null)}
      />
    </>
  )
}

function IntegrationDialog({ feature, open, onOpenChange }) {
  if (!feature) return null

  const iconColor = iconColors[feature?.name] || "#ffffff"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white max-w-[90vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Integration Required</DialogTitle>
          <DialogDescription className="text-zinc-400">
            To access{" "}
            <span className="font-medium" style={{ color: iconColor }}>
              {feature?.name}
            </span>
            , you need to integrate with {feature?.requires}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-zinc-800 p-4 border border-zinc-700">
            <p className="text-sm text-zinc-300">
              The{" "}
              <span className="font-medium" style={{ color: iconColor }}>
                {feature?.name}
              </span>{" "}
              feature requires {feature?.requires} integration to function properly. Please set up this integration to
              unlock this feature.
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              className="text-white border-zinc-700 hover:bg-zinc-800 hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button className="gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              Set up Integration
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
