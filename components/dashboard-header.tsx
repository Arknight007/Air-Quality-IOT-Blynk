import { Bell, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b border-white/10 bg-white/5 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-3">
        
        <div>
          <p className="text-xs text-lime-400">Good Morning </p>
          <h1 className="text-xl font-semibold text-white">{"Air Quality Monitoring [Blynk]"}</h1>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-full bg-white/10 pl-10 pr-4 text-sm text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-lime-400/50 md:w-60"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </header>
  )
}
