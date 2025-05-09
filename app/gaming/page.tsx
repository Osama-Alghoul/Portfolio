import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import GameCard from "@/components/game-card"
import DiscordInvite from "@/components/discord-invite"
import { CustomButton } from "@/components/custom-button"

interface Game {
  id: number
  title: string
  image: string
  genre: string
  platform: string
  hoursPlayed?: number
  rating?: number
}

export default function GamingPage() {
  const games: Game[] = [
    {
      id: 1,
      title: "Valorant",
      image: "/Valorant.png?height=200&width=300",
      genre: "FPS",
      platform: "PC",
      hoursPlayed: 45,
      rating: 3,
    },
    {
      id: 2,
      title: "Minecraft",
      image: "/minecraft.png?height=200&width=300",
      genre: "Sandbox",
      platform: "PC",
      hoursPlayed: 30,
      rating: 3.9,
    },
    {
      id: 10,
      title: "Counter-Strike 2",
      image: "/cs2.png?height=200&width=300",
      genre: "FPS",
      platform: "PC",
      hoursPlayed: 120,
      rating: 4.5,
    },
    {
      id: 3,
      title: "PAYDAY 2",
      image: "/payday2.png?height=200&width=300",
      genre: "Co-op FPS",
      platform: "PC",
      hoursPlayed: 300,
      rating: 5,
    },
    {
      id: 4,
      title: "Dying Light",
      image: "/dl.png?height=200&width=300",
      genre: "First-person survival",
      platform: "PC",
      hoursPlayed: 60,
      rating: 5,
    },
    {
      id: 5,
      title: "Black Mesa",
      image: "/blackmesa.png?height=200&width=300",
      genre: "First-person shooter",
      platform: "PC",
      hoursPlayed: 20,
      rating: 5,
    },
    {
      id: 6,
      title: "Borderlands",
      image: "/borderlands.png?height=200&width=300",
      genre: "Co-op FPS",
      platform: "PC",
      hoursPlayed: 150,
      rating: 4.5,
    },
    {
      id: 7,
      title: "Zombie Army Trilogy",
      image: "/zombiearmy.png?height=200&width=300",
      genre: "Co-op shooter",
      platform: "PC",
      hoursPlayed: 60,
      rating: 4.8,
    },
    {
      id: 8,
      title: "Half-Life 2",
      image: "/halflife2.png?height=200&width=300",
      genre: "First-person shooter",
      platform: "PC",
      hoursPlayed: 20,
      rating: 5,
    },
    {
      id: 9,
      title: "Portal 2",
      image: "/portal2.png?height=200&width=300",
      genre: "First-person puzzle",
      platform: "PC",
      hoursPlayed: 15,
      rating: 5,
    },
    {
      id: 11,
      title: "Left 4 Dead 2",
      image: "/l4d2.png?height=200&width=300",
      genre: "Co-op FPS",
      platform: "PC",
      hoursPlayed: 20,
      rating: 4.4,
    },
    {
      id: 12,
      title: "Rogue company",
      image: "/roguecompany.png?height=200&width=300",
      genre: "PvP TPS",
      platform: "PC",
      hoursPlayed: 100,
      rating: 3.9,
    },
    {
      id: 13,
      title: "GTA V",
      image: "/GTAV.png?height=200&width=300",
      genre: "Co-op Open-world",
      platform: "PC",
      hoursPlayed: 15,
      rating: 4.9,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gold">Gaming</h1>
            <p className="text-xl text-blue-400">My passion for gaming, favorite titles, and gaming community</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Why I Game */}
          <div className="mb-20">
            <Card className="bg-blue-950/50 border-blue-800 overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image src="/games.png?height=400&width=1200" alt="Gaming Setup" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-gold text-black mb-2">Gaming Passion</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Why I Game</h2>
                </div>
              </div>
              <CardContent className="p-6 md:p-8">
                <div className="max-w-3xl">
                  <p className="text-gray-300 mb-4 text-lg">
                    Gaming has always been more than just a hobby for me - it&apos;s a passion, an escape, and a way to connect
                    with people around the world. From story-driven single-player experiences to competitive multiplayer
                    games, I love the diversity and creativity of the gaming world.
                  </p>
                  <p className="text-gray-300 text-lg">
                    Through gaming, I&apos;ve made lifelong friends, learned problem-solving skills, and found inspiration
                    for my work as a software developer. It&apos;s the perfect blend of technology, art, and social
                    interaction that keeps me coming back for more.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Collection */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gold">My Game Collection</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Discord Community */}
          <div className="bg-blue-950/20 rounded-lg p-6 md:p-8 border border-blue-800">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gold">Join Section Zero</h2>
                <p className="text-lg text-gray-300">
                  Section Zero is my gaming community where we connect, play together, and share our gaming experiences.
                  Whether you&apos;re a casual gamer or a competitive player, you&apos;ll find a welcoming place in our server.
                </p>
                <div className="space-y-3">
                  <p className="text-gray-300">What you&apos;ll find in our Discord:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span className="text-gray-300">Game-specific channels for coordination and discussion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span className="text-gray-300">Weekly community game nights and events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span className="text-gray-300">Voice channels for gaming sessions and hanging out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span className="text-gray-300">Updates on my latest content and streams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span className="text-gray-300">A friendly community of gamers from around the world</span>
                    </li>
                  </ul>
                </div>
                <DiscordInvite />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/gaming.png?height=300&width=500"
                  alt="Discord Community"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                    <span className="text-xl font-bold text-white">Section Zero</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <CustomButton href="/">Back to Home</CustomButton>
          </div>
        </div>
      </section>
    </main>
  )
}
