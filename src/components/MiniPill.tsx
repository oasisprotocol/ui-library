import { PlayCircle } from "lucide-react"

export default function MiniPill() {
  return (
    <div className="inline-flex items-center gap-2.5 bg-secondary px-3 py-0.5 rounded-md border border-border">
      <p className="text-xs leading-[150%] text-primary">Pause auto-updates</p>
      <PlayCircle className="h-[30px] w-[30px] text-primary" />
    </div>
  )
}
