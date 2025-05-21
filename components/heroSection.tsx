import ElectronicBackground from "./electronic-background"
import Hero from "./hero"

export default function HeroSection() {
    return (
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
    )
}