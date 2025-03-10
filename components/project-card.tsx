"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    demoUrl?: string
    githubUrl?: string
    category: string
    longDescription?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg?height=200&width=400"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
              Details
            </Button>
            <div className="flex gap-2">
              {project.githubUrl && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Live Demo</span>
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap gap-2 my-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="relative h-64 my-4">
            <Image
              src={project.image || "/placeholder.svg?height=300&width=600"}
              alt={project.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="space-y-4">
            <p>{project.longDescription || project.description}</p>
            <div className="flex gap-4">
              {project.demoUrl && (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

