import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-utils"
import { getAboutData } from "@/lib/portfolio"

import AboutForm from "@/components/admin/about-form"

export default async function AboutPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const aboutData = await getAboutData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Section</h1>
        <p className="text-muted-foreground">Manage your personal information and skills</p>
      </div>

      <AboutForm initialData={aboutData} />
    </div>
  )
}

