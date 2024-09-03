import { LucideGithub } from "lucide-react"
import { Badge } from "../components/ui/badge"

export default function Footer() {
    return (
        <div className="flex fixed bottom-3 w-screen items-center justify-center">
            <a href="https://github.com" target="_blank">
                <Badge className="rounded-full cursor-pointer" >
                    <div className="flex gap-2">
                        <LucideGithub size={17} />
                        Made by OnlyCoders
                    </div>
                </Badge>
            </a>
        </div >
    )
}