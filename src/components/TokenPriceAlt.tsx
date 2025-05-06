import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function TokenPriceAlt() {
  return (
    <Card className="p-6 flex flex-col items-start gap-4 bg-background shadow-lg">
      <Search className="w-6 h-6 text-foreground" />
      
      <div className="w-full flex flex-col gap-2">
        <p className="text-[32px] font-bold text-primary text-center leading-tight">
          61,609
        </p>
        
        <div className="flex items-center gap-1.5">
          <p className="text-base font-bold text-foreground">
            Delegators
          </p>
        </div>
      </div>
    </Card>
  )
}
