import SocialLinks from "./social-links"

export default function Footer() {
    return (
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
    )
}