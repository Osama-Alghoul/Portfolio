"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { CustomButton } from "./custom-button"

export default function DiscordInvite() {
  const [copied, setCopied] = useState(false)
  const discordInviteLink = "https://discord.gg/vaGaSmntjY"
  const serverName = "Section Zero"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discordInviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-[#5865F2]/10 border-[#5865F2]/30 mt-4">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#5865F2]" />
          <span className="text-gray-300 font-medium">
            Join <span className="text-gold font-bold">{serverName}</span>
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <CustomButton
            onClick={copyToClipboard}
            variant="outline"
            className="border-[#5865F2]/50 text-[#5865F2] hover:bg-[#5865F2]/10"
          >
            {copied ? "Copied!" : "Copy Invite"}
          </CustomButton>
          <CustomButton
            href={discordInviteLink}
            external
            className="bg-[#5865F2] hover:bg-[#5865F2]/90 w-full sm:w-auto"
          >
            Join Now
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  )
}
