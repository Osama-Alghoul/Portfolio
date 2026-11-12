import { CustomButton } from "@/components/custom-button";
import ElectronicBackground from "@/components/electronic-background";
import { ArrowLeft } from "lucide-react";

export default function notFoundPage() {
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <ElectronicBackground />
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">404 - Page Not Found</h1>
            <CustomButton href="/"><ArrowLeft/> Go Back Home</CustomButton>
        </div>
    )
}