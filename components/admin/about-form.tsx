"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { PortfolioData } from "@/lib/portfolio"
import { updatePortfolioSection } from "@/lib/actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  tagline: z.string().min(10, {
    message: "Tagline must be at least 10 characters.",
  }),
  profileImage: z.string().url({
    message: "Please enter a valid URL for the profile image.",
  }),
  about: z.string().min(50, {
    message: "About section must be at least 50 characters.",
  }),
})

interface AboutFormProps {
  data: PortfolioData
}

export default function AboutForm({ data }: AboutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      tagline: data.tagline,
      profileImage: data.profileImage,
      about: data.about,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updatePortfolioSection("about", values)

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your profile information couldn't be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-muted-foreground">Update your personal information and bio</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="Your professional tagline" {...field} />
                  </FormControl>
                  <FormDescription>A short description of your professional role.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className="grid gap-4">
                    <Input placeholder="Image URL" {...field} />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                      <Image
                        src={field.value || "/placeholder.svg?height=128&width=128"}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Enter the URL of your profile image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write about yourself, your skills, and experience"
                    className="min-h-[200px] text-shadow-animation"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Use paragraphs separated by blank lines for better readability.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}