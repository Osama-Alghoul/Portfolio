import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { CustomButton } from "./custom-button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  live: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-blue-950/30 border-blue-800 hover:border-gold transition-colors">
      <div className="aspect-video relative">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gold">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-900/50 text-blue-200">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <CustomButton href={project.link} external variant="outline" className="text-blue-400 hover:text-gold">
            <Github className="h-4 w-4 mr-1" />
            <span>View Code</span>
          </CustomButton>
          <CustomButton href={project.live} external variant="outline" className="text-blue-400 hover:text-gold">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Live Demo</span>
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  )
}
