import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Youtube, MessageSquare, Instagram } from "lucide-react"
import ProjectCard from "@/components/project-card"
import SocialLinks from "@/components/social-links"
import ElectronicBackground from "@/components/electronic-background"
import { CustomButton } from "@/components/custom-button"
import SkillsSet from "@/components/skills"
import Hero from "@/components/hero"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  live: string
}

export default function Home() {
  // Sample projects data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 7,
      title: "Next Level Food",
      description: "Yummy Food recepies !",
      image: "/nlfood.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "Next JS", 'sqlite'],
      link: "https://github.com/Osama-Alghoul/Next-Level-Food",
      live: "https://next-level-food-lovat.vercel.app/",
    },
    {
      id: 1,
      title: "Moviedux",
      description: "Moives website built using React",
      image: "/moviedux.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "React"],
      link: "https://github.com/Osama-Alghoul/Moviedux-React",
      live: "https://moviedux-react-34a6yw6ng-osama-alghouls-projects.vercel.app/",
    },
    {
      id: 2,
      title: "Posting Section",
      description: "Posts website built using React and Node.js",
      image: "/posts.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      link: "https://github.com/Osama-Alghoul/Simple-Posts-section",
      live: "https://v0-new-project-vmuldoj9rhe.vercel.app/",
    },
    {
      id: 3,
      title: "Local Market and a map",
      description: " local market website built with pure code",
      image: "/marketmap.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Market---Map",
      live: "https://osama-alghoul.github.io/Market---Map/",
    },
    {
      id: 4,
      title: "Shipping company",
      description: "A HTML, CSS & JS website built with single page",
      image: "/shipping.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Shipping_company",
      live: "https://osama-alghoul.github.io/Shipping_company/",
    },
    {
      id: 5,
      title: "Book shelves by JS",
      description: "A simple book shelves website built with HTML, CSS & JS",
      image: "/book shelves.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Book-shelves-by-JS",
      live: "https://osama-alghoul.github.io/Book-shelves-by-JS/",
    },
    {
      id: 6,
      title: "Elzero Web School",
      description: "All Elzero Web School Tasks, Assignments and challenges",
      image: "/elzero.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Elzero-web-school",
      live: "https://osama-alghoul.github.io/Elzero-web-school/",
    },
    
  ]

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <ElectronicBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>
        <Hero />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-blue-400 hover:text-gold transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">About Me</h2>
          <div className="grid md:grid-cols-2 gap-9 md:gap-0 items-center">
            <div>
              <svg className="mx-auto" width="359" height="236" viewBox="0 0 359 236" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="126.335" y="22.832" width="26" height="154.102" rx="13" transform="rotate(55 126.335 22.832)" fill="#F3AC39" />
                <rect x="142" y="6.10544" width="26" height="235.937" rx="13" transform="rotate(-13.5813 142 6.10544)" fill="#F3AC39" />
                <rect x="134.761" y="196.055" width="26" height="154.102" rx="13" transform="rotate(130 134.761 196.055)" fill="#F3AC39" />
                <rect width="26" height="154.102" rx="13" transform="matrix(-0.573576 0.819152 0.819152 0.573576 231.913 21)" fill="#F3AC39" />
                <rect width="26" height="154.102" rx="13" transform="matrix(0.642788 0.766044 0.766044 -0.642788 223.487 194.223)" fill="#F3AC39" />
              </svg>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-300">
                Hello! I&apos;m a passionate software engineer and web developer with expertise in modern web technologies. I
                specialize in building responsive, user-friendly applications using React, Next.js, and TypeScript with 5 years of experience and 4
                monthes of internship. Here is my
                full programming skills:
              </p>
              {/* <p className="text-lg text-gray-300">
                When I&apos;m not coding, I&apos;m an avid gamer and content creator. I run a Discord community where I connect
                with fellow gamers and tech enthusiasts. I&apos;m also passionate about creating content related to
                programming and gaming.
              </p> */}
              <SkillsSet />
              <div className="flex flex-wrap gap-4 pt-4">
                <CustomButton href="#contact">Get In Touch</CustomButton>
                {/* <CustomButton href="/gaming" variant="outline">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Gaming Profile
                </CustomButton> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/95">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <CustomButton href="https://github.com/yourusername" variant="outline" external>
              <Github className="mr-2 h-4 w-4" />
              View More on GitHub
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Content Creator Section */}
      <section id="content" className="py-20 bg-black">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">Content Creator</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video rounded-lg overflow-hidden border border-blue-600/30">
                <Image
                  src="/placeholder.svg?width=560&height=315"
                  alt="Content Creator"
                  width={560}
                  height={315}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">My Content</h3>
              <p className="text-lg text-gray-300">
                I planning to create content about software development, web technologies. Subscribe to my channels to
                stay updated to videos, tutorials, and live streams.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <CustomButton href="https://www.youtube.com/channel/UC4w0lxr1YonewXpbUeOH5Vw" variant="red" external>
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </CustomButton>
                <CustomButton href="https://www.instagram.com/osssghoul/" variant="purple" external>
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/95">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <Card className="bg-blue-950/30 border-blue-800">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gold">Contact Me</h3>
                  <p className="text-gray-300">
                    Feel free to reach out for collaborations, questions, or just to say hello!
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-400" />
                    <a href="mailto:osamalghoul2@gmail.com" className="text-blue-400">osamalghoul2@gmail.com</a>
                  </div>
                  <SocialLinks />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gold font-bold">Osama Alghoul</span>
              <span className="text-gray-400">© {new Date().getFullYear()}</span>
            </div>
            <div className="mt-4 md:mt-0">
              <SocialLinks size="sm" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
