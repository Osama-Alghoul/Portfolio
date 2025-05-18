import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare} from "lucide-react"
import SocialLinks from "@/components/social-links"
import ElectronicBackground from "@/components/electronic-background"
import Hero from "@/components/hero"
import About from "@/components/aboutSection"
import Projects from "@/components/Projects"
import Content from "@/components/Content"

export default function Home() {

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
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Content Creator Section */}
      <Content />

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
