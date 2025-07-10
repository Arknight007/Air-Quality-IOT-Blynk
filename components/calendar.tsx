"use client"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type Event = {
  id: string
  title: string
  description: string
  date: Date
}

export function Calendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Family Dinner",
      description: "Weekly family dinner at home",
      date: new Date(2025, 2, 15, 18, 0),
    },
    {
      id: "2",
      title: "Home Maintenance",
      description: "Check smoke detectors and replace filters",
      date: new Date(2025, 2, 20, 10, 0),
    },
  ])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: new Date(),
  })

  const handleAddEvent = () => {
    if (newEvent.title.trim() === "") return

    setEvents([...events, { ...newEvent, id: crypto.randomUUID() }])
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
    })
  }

  const eventsForSelectedDate = events.filter((event) => event.date.toDateString() === date.toDateString())

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription className="text-gray-300">View and manage your schedule</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border-0"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-300">{format(date, "PPP")}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription className="text-gray-400">Create a new event for your calendar</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="bg-white/10 border-gray-700 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="bg-white/10 border-gray-700 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-gray-700 text-white",
                          !newEvent.date && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEvent.date ? format(newEvent.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <CalendarComponent
                        mode="single"
                        selected={newEvent.date}
                        onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddEvent} className="bg-lime-400 text-black hover:bg-lime-500">
                  Save Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card className="col-span-1 md:col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Events for {format(date, "MMMM d, yyyy")}</CardTitle>
          <CardDescription className="text-gray-300">
            {eventsForSelectedDate.length === 0
              ? "No events scheduled for this day"
              : `${eventsForSelectedDate.length} event(s) scheduled`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventsForSelectedDate.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No events</h3>
                  <p className="text-sm text-gray-400">Add an event to get started</p>
                </div>
              </div>
            ) : (
              eventsForSelectedDate.map((event) => (
                <div key={event.id} className="rounded-lg border border-gray-700 bg-white/5 p-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-300">{event.description}</p>
                  <p className="mt-2 text-xs text-gray-400">{format(event.date, "h:mm a")}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
