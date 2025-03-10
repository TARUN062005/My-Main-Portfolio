"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth-utils"

// Contact form action
export async function sendContactForm(formData: {
  name: string
  email: string
  message: string
}) {
  // In a real app, you would send an email or store in database
  console.log("Contact form submission:", formData)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

// Admin actions
export async function updatePortfolioSection(section: string, data: any) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  // In a real app, you would update the database
  console.log(`Updating ${section}:`, data)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  revalidatePath("/")
  revalidatePath("/admin")

  return { success: true }
}

export async function addProject(formData: FormData) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const image = formData.get("image") as string
  const demoUrl = formData.get("demoUrl") as string
  const githubUrl = formData.get("githubUrl") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  // In a real app, you would add to the database
  console.log("Adding project:", {
    title,
    description,
    category,
    image,
    demoUrl,
    githubUrl,
    tags,
  })

  revalidatePath("/admin/projects")
  revalidatePath("/")

  return { success: true }
}

export async function deleteProject(id: string) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  // In a real app, you would delete from the database
  console.log("Deleting project:", id)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  revalidatePath("/admin/projects")
  revalidatePath("/")

  return { success: true }
}

export async function addAchievement(formData: FormData) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const date = formData.get("date") as string
  const description = formData.get("description") as string

  // In a real app, you would add to the database
  console.log("Adding achievement:", {
    title,
    date,
    description,
  })

  revalidatePath("/admin/achievements")
  revalidatePath("/")

  return { success: true }
}

export async function deleteAchievement(id: string) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  // In a real app, you would delete from the database
  console.log("Deleting achievement:", id)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  revalidatePath("/admin/achievements")
  revalidatePath("/")

  return { success: true }
}

