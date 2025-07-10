"use client"

import { useState } from "react"
import { Plus, Trash2, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Meal = {
  id: string
  name: string
  ingredients: string
  mealType: string
  day: string
}

export function MealPlanner() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "1",
      name: "Spaghetti Bolognese",
      ingredients: "Ground beef, tomatoes, pasta, onions, garlic",
      mealType: "dinner",
      day: "Monday",
    },
    {
      id: "2",
      name: "Chicken Salad",
      ingredients: "Chicken breast, lettuce, tomatoes, cucumber, olive oil",
      mealType: "lunch",
      day: "Tuesday",
    },
  ])

  const [newMeal, setNewMeal] = useState({
    name: "",
    ingredients: "",
    mealType: "dinner",
    day: "Monday",
  })

  const handleAddMeal = () => {
    if (newMeal.name.trim() === "") return

    setMeals([
      ...meals,
      {
        id: crypto.randomUUID(),
        ...newMeal,
      },
    ])

    setNewMeal({
      name: "",
      ingredients: "",
      mealType: "dinner",
      day: "Monday",
    })
  }

  const deleteMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const getMealsByDay = (day: string) => {
    return meals.filter((meal) => meal.day === day)
  }

  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case "breakfast":
        return "Breakfast"
      case "lunch":
        return "Lunch"
      case "dinner":
        return "Dinner"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400/20">
              <UtensilsCrossed className="h-4 w-4 text-lime-400" />
            </div>
            <div>
              <CardTitle>Meal Planner</CardTitle>
              <CardDescription className="text-gray-300">Plan your weekly meals</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                placeholder="Enter meal name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                placeholder="List ingredients"
                value={newMeal.ingredients}
                onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="meal-type">Meal Type</Label>
                <Select value={newMeal.mealType} onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value })}>
                  <SelectTrigger id="meal-type" className="bg-white/10 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="day">Day</Label>
                <Select value={newMeal.day} onValueChange={(value) => setNewMeal({ ...newMeal, day: value })}>
                  <SelectTrigger id="day" className="bg-white/10 border-gray-700 text-white">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddMeal} className="w-full bg-lime-400 text-black hover:bg-lime-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Meal
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Weekly Plan</CardTitle>
          <CardDescription className="text-gray-300">Your meal schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {days.map((day) => {
              const dayMeals = getMealsByDay(day)
              return (
                <div key={day} className="rounded-lg border border-gray-700 bg-white/5 p-3">
                  <h3 className="font-medium">{day}</h3>
                  {dayMeals.length === 0 ? (
                    <p className="text-sm text-gray-400 mt-2">No meals planned</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {dayMeals.map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between rounded-md bg-white/5 p-2">
                          <div>
                            <div className="font-medium">{meal.name}</div>
                            <div className="text-xs text-gray-400">{getMealTypeLabel(meal.mealType)}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMeal(meal.id)}
                            className="text-gray-400 hover:text-white hover:bg-white/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
