"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Github, Linkedin, Mail, Save, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { PortfolioData } from "@/lib/portfolio"
import { updatePortfolioSection } from "@/lib/actions"

const formSchema = z.object({
  github: z
    .string()
    .url({
      message: "Please enter a valid URL for GitHub.",
    })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({
      message: "Please enter a valid URL for LinkedIn.",
    })
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .url({
      message: "Please enter a valid URL for Twitter.",
    })
    .optional()
    .or(z.literal("")),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

interface ContactSettingsProps {
  data: PortfolioData
}

export default function ContactSettings({ data }: ContactSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      github: data.socialLinks.github || "",
      linkedin: data.socialLinks.linkedin || "",
      twitter: data.socialLinks.twitter || "",
      email: data.socialLinks.email || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updatePortfolioSection("socialLinks", values)

      toast({
        title: "Contact information updated",
        description: "Your contact information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your contact information couldn't be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Information</h1>
        <p className="text-muted-foreground">Update your contact information and social links</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Your email address" className="border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormDescription>Your primary contact email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <Github className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Your GitHub profile URL" className="border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormDescription>Your GitHub profile URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <Linkedin className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Your LinkedIn profile URL"
                      className="border-0 focus-visible:ring-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Your LinkedIn profile URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <Twitter className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Your Twitter profile URL"
                      className="border-0 focus-visible:ring-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Your Twitter profile URL.</FormDescription>
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

