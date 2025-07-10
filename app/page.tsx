import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartHome } from "@/components/smart-home"
import { Calendar } from "@/components/calendar"
import { ExpenseTracker } from "@/components/expense-tracker"
import { TodoList } from "@/components/todo-list"
import { MealPlanner } from "@/components/meal-planner"
import { Inventory } from "@/components/inventory"
import { DashboardHeader } from "@/components/dashboard-header"
import { HomeIcon, CalendarDays, CheckSquare, DollarSign, UtensilsCrossed, Package, Wind } from "lucide-react"
import { AirQualityMonitor } from "@/components/air-quality-monitor"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-fixed">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      <DashboardHeader />
      <main className="relative flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 z-10">
        <Tabs defaultValue="smart-home" className="space-y-4">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 md:grid-cols-7 bg-white/10 backdrop-blur-md rounded-full p-1">
            <TabsTrigger value="smart-home" className="rounded-full flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Home</span>
            </TabsTrigger>
            <TabsTrigger value="air-quality" className="rounded-full flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <span className="hidden sm:inline">Air Quality</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-full flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="todo" className="rounded-full flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Todo</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="rounded-full flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="rounded-full flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">Meals</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-full flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="smart-home" className="space-y-4">
            <SmartHome />
          </TabsContent>
          <TabsContent value="air-quality" className="space-y-4">
            <AirQualityMonitor />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <Calendar />
          </TabsContent>
          <TabsContent value="todo" className="space-y-4">
            <TodoList />
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <ExpenseTracker />
          </TabsContent>
          <TabsContent value="meals" className="space-y-4">
            <MealPlanner />
          </TabsContent>
          <TabsContent value="inventory" className="space-y-4">
            <Inventory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
