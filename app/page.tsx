import About from "@/components/aboutSection"
import Projects from "@/components/Projects"
import Content from "@/components/Content"
import HeroSection from "@/components/heroSection"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Services from "@/components/services"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <HeroSection />
      <About />
      <Services />
      <Projects />
      <Content />
      <Contact />
      <Footer />
    </main>
  )
}
