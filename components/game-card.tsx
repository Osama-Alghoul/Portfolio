import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"

interface Game {
  id: number
  title: string
  image: string
  genre: string
  platform: string
  hoursPlayed?: number
  rating?: number
}

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden bg-blue-950/30 border-blue-800 hover:border-gold transition-colors group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-2">
            {game.rating && (
              <div className="flex items-center gap-1 text-gold">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="text-sm font-medium">{game.rating}/5</span>
              </div>
            )}
            {game.hoursPlayed && (
              <div className="flex items-center gap-1 text-blue-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{game.hoursPlayed}h</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-gold mb-1">{game.title}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
            {game.genre}
          </Badge>
          <Badge variant="outline" className="border-blue-700 text-gray-300">
            {game.platform}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
