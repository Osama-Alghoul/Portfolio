import { Card, CardContent } from "./ui/card"
import { MessageSquare } from "lucide-react"
import SocialLinks from "./social-links"

export default function Contact() {
    return (
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
    )
}