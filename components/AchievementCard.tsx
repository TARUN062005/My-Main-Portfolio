"use client"

import { motion } from "framer-motion"
import { Award, Calendar } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AchievementCardProps {
  achievement: {
    id: string
    title: string
    date: string
    description: string
    icon?: string
  }
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{achievement.title}</CardTitle>
            <Award className="h-6 w-6 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{achievement.date}</span>
          </div>
          <p className="text-sm">{achievement.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}