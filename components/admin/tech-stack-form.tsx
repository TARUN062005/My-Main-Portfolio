"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { PortfolioData } from "@/lib/portfolio"
import { updatePortfolioSection } from "@/lib/actions"

const techItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().url("Please enter a valid URL"),
})

const categorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  items: z.array(techItemSchema),
})

const formSchema = z.object({
  techStack: z.array(categorySchema),
})

interface TechStackFormProps {
  data: PortfolioData
}

export default function TechStackForm({ data }: TechStackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techStack: data.techStack,
    },
  })

  const {
    fields: categories,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "techStack",
    control: form.control,
  })

  const techItemsFields = categories.map((category, categoryIndex) => {
    return useFieldArray({
      name: `techStack.${categoryIndex}.items`,
      control: form.control,
    })
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await updatePortfolioSection("techStack", values.techStack)

      toast({
        title: "Tech stack updated",
        description: "Your tech stack has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your tech stack couldn't be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tech Stack</h1>
        <p className="text-muted-foreground">Manage the technologies and tools you work with</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            {categories.map((category, categoryIndex) => {
              const {
                fields: techItems,
                append: appendTechItem,
                remove: removeTechItem,
              } = techItemsFields[categoryIndex]

              return (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Category</CardTitle>
                        <CardDescription>Group your tech stack by categories</CardDescription>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeCategory(categoryIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`techStack.${categoryIndex}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Frontend, Backend, Tools" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Technologies</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendTechItem({ name: "", icon: "" })}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Technology
                        </Button>
                      </div>

                      {techItems.map((item, itemIndex) => (
                        <div key={item.id} className="grid gap-4 md:grid-cols-2 items-end">
                          <FormField
                            control={form.control}
                            name={`techStack.${categoryIndex}.items.${itemIndex}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Technology name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`techStack.${categoryIndex}.items.${itemIndex}.icon`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>Icon URL</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Icon URL" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="mt-8"
                              onClick={() => removeTechItem(itemIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button type="button" variant="outline" onClick={() => appendCategory({ category: "", items: [] })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>

          <div className="flex justify-end">
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
          </div>
        </form>
      </Form>
    </div>
  )
}

