import { Truck } from "lucide-react"
import { Badge } from "../badge"






export const BadgeFreeship = ()=>{
    return <Badge className = "bg-[#d3f3f3] text-[#19c5c5] flex items-end gap-x-1">
        <Truck size = {20}/>
        <span className = "font-bold">Freeship</span>
    </Badge>
}