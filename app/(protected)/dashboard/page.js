"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Leads from "@/app/(protected)/dashboard/Leads/page"
import Outreach from "@/app/(protected)/dashboard/Outreach/page"
import FollowUps from "@/app/(protected)/dashboard/FollowUps/page"
import Insights from "@/app/(protected)/dashboard/Insights/page"
import CRM from "@/app/(protected)/dashboard/CRM/page"
import Scripts from "@/app/(protected)/dashboard/Scripts/page"
import Slack from "@/app/(protected)/dashboard/Slack/page"
import Campaigns from "@/app/(protected)/dashboard/Campaigns/page"
import DashboardSidebar, { MobileMenuButton } from "../../../components/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

// Custom hook to detect screen size
function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

export default function DashboardPage() {
  const pathname = usePathname()
  const { isMobile, isTablet } = useScreenSize()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state for components
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname])

  const featureMap = {
    "/dashboard": <Leads />,
    "/dashboard/outreach": <Outreach />,
    "/dashboard/followups": <FollowUps />,
    "/dashboard/insights": <Insights />,
    "/dashboard/crm": <CRM />,
    "/dashboard/scripts": <Scripts />,
    "/dashboard/slack": <Slack />,
    "/dashboard/campaigns": <Campaigns />,
  }

  // Get current feature name from pathname
  const getCurrentFeatureName = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length === 1) return "Leads"
    return path[1].charAt(0).toUpperCase() + path[1].slice(1)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen overflow-hidden bg-black">
        <DashboardSidebar />
        <MobileMenuButton />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="p-4 sm:p-6 md:p-8 pb-0 sm:pb-0 md:pb-0">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {isMobile || isTablet ? getCurrentFeatureName() : "Your Sales"}{" "}
                {!isMobile && !isTablet && (
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    Dashboard
                  </span>
                )}
              </h1>
              {(isMobile || isTablet) && (
                <p className="text-zinc-400 text-sm md:text-base">AI-powered sales management</p>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 pt-4">
            <div
              className="h-full transition-opacity duration-300 bg-zinc-900/50 rounded-xl shadow-lg border border-zinc-800"
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              <div className="p-4 sm:p-6 md:p-8 h-full text-white">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-zinc-800"></div>
                      <div className="h-4 w-32 bg-zinc-800 rounded"></div>
                    </div>
                  </div>
                ) : (
                  featureMap[pathname] || <Leads />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
