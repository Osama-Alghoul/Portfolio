import Image from "next/image";
import { CustomButton } from "./custom-button";
export default function Hero() {
    return (
        <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col justify-center gap-0 items-center text-center space-y-4">
                <div className="h-38 w-38 rounded-full border-2 border-gold overflow-hidden mb-4">
                    <Image
                        src="/Me.png?height=150&width=150"
                        alt="Profile"
                        width={150}
                        height={150}
                        className="object-cover"
                    />
                </div>
                <div className="felx">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gold">Hello I&apos;m</h1>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gold">Osama Alghoul</h1>
                    <br />
                    <p className="text-xl md:text-2xl text-blue-400">
                        &lt;Software Engineer | Web Developer /&gt;
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <CustomButton href="#projects">View Projects</CustomButton>
                        <CustomButton href="#contact" variant="outline">
                            Contact Me
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
