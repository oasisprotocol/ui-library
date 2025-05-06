import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Input 
          className="h-[47px] pr-24 text-[16px] leading-[125%] text-[rgb(49,67,90)]"
          placeholder="0xCB2412a993f406eFf10a74011410a4F35e3549E3"
        />
        <div className="absolute right-0 flex items-center gap-2 pr-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-[47px] w-[47px]"
          >
            <Search className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-[47px]"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
