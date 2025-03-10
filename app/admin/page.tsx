import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-utils"
import { getPortfolioData } from "@/lib/portfolio"

import AdminDashboard from "@/components/admin/dashboard"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const data = await getPortfolioData()

  return <AdminDashboard data={data} />
}

