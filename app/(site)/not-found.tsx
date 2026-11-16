import { CustomButton } from "@/components/custom-button";
import ElectronicBackground from "@/components/electronic-background";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-6 overflow-hidden px-5 text-center">
      <ElectronicBackground />
      <p className="kicker relative">Error 404 · area not found</p>
      <h1 className="relative font-serif text-5xl tracking-tight text-fg sm:text-6xl">
        You wandered <span className="italic text-dim">off the map.</span>
      </h1>
      <CustomButton href="/" variant="outline" className="relative">
        <ArrowLeft aria-hidden className="h-4 w-4" /> Back to spawn
      </CustomButton>
    </div>
  );
}
