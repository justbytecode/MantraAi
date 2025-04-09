import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }) {
  const session = await getSession()
  if (!session) redirect("/signin")

  return (
    <div className="min-h-screen w-screen bg-gray-800">
      {children}
    </div>
  )
}