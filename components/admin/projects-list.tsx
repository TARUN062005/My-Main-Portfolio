"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Edit, Plus, Trash2 } from "lucide-react"
import Typed from "react-typed"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { addProject, deleteProject } from "@/lib/actions"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  longDescription: z.string().optional(),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  tags: z.string().min(1, {
    message: "Please enter at least one tag.",
  }),
  demoUrl: z
    .string()
    .url({
      message: "Please enter a valid URL for the demo.",
    })
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url({
      message: "Please enter a valid URL for the GitHub repository.",
    })
    .optional()
    .or(z.literal("")),
  category: z.string({
    required_error: "Please select a category.",
  }),
})

interface ProjectsListProps {
  projects: {
    id: string
    title: string
    description: string
    longDescription?: string
    image: string
    tags: string[]
    demoUrl?: string
    githubUrl?: string
    category: string
  }[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      image: "",
      tags: "",
      demoUrl: "",
      githubUrl: "",
      category: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      await addProject(formData)

      toast({
        title: "Project added",
        description: "Your project has been added successfully.",
      })

      form.reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your project couldn't be added. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteProject(id: string) {
    setIsDeleting(id)

    try {
      await deleteProject(id)

      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your project couldn't be deleted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Add a new project to your portfolio</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web">Web</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="desktop">Desktop</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of your project" {...field} />
                      </FormControl>
                      <FormDescription>A short summary that will appear in the project card.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of your project"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description that will appear when viewing project details.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL of project image" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="demoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="URL of live demo (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="URL of GitHub repository (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="React, TypeScript, Tailwind CSS" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list of technologies used in the project.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="relative group overflow-hidden rounded-lg border bg-background">
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={isDeleting === project.id}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting === project.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
            <div className="relative h-48">
              <Image
                src={project.image || "/placeholder.svg?height=200&width=400"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{project.description}</p>
              {project.longDescription && (
                <Typed
                  strings={[project.longDescription]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop={false}
                  className="text-sm text-muted-foreground mb-2"
                />
              )}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Category: {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </div>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-4">
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}