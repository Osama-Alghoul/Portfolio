'use client'

import Image from "next/image"
import { Youtube, Instagram } from "lucide-react"
import { CustomButton } from "./custom-button"
import { useInView } from "react-intersection-observer"

export default function Content() {
    const [ref, inView] = useInView({
        triggerOnce: true,
    })
    return (
        <section id="content" className="py-20 bg-black">
            <div ref={ref} className={`container px-4 md:px-6 mx-auto${inView ? ' fade-in' : 'opacity-0'}`}>
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
    )
}