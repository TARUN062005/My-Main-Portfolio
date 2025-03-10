"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TechStackProps {
  techStack: {
    category: string
    items: {
      name: string
      icon: string
      url: string // Added url property
    }[]
  }[]
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {techStack.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.items.map((tech, techIndex) => (
              <a key={techIndex} href={tech.url} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm border"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                >
                  <div className="relative w-12 h-12 mb-2">
                    <Image
                      src={tech.icon || "/placeholder.svg?height=48&width=48"}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-center">{tech.name}</span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}