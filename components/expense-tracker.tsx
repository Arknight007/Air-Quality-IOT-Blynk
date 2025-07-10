"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

type Expense = {
  id: string
  amount: number
  description: string
  category: string
  date: Date
}

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 120.5,
      description: "Grocery shopping",
      category: "groceries",
      date: new Date(2025, 2, 10),
    },
    {
      id: "2",
      amount: 45.0,
      description: "Electricity bill",
      category: "utilities",
      date: new Date(2025, 2, 5),
    },
    {
      id: "3",
      amount: 25.99,
      description: "Household supplies",
      category: "home",
      date: new Date(2025, 2, 8),
    },
  ])

  const [newExpense, setNewExpense] = useState({
    amount: "",
    description: "",
    category: "groceries",
  })

  const [period, setPeriod] = useState("month")

  const handleAddExpense = () => {
    if (newExpense.amount === "" || newExpense.description === "") return

    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        amount: Number.parseFloat(newExpense.amount),
        description: newExpense.description,
        category: newExpense.category,
        date: new Date(),
      },
    ])

    setNewExpense({
      amount: "",
      description: "",
      category: "groceries",
    })
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const getFilteredExpenses = () => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())

    if (period === "week") {
      return expenses.filter((expense) => expense.date >= startOfWeek)
    } else if (period === "month") {
      return expenses.filter((expense) => expense.date >= startOfMonth)
    }
    return expenses
  }

  const filteredExpenses = getFilteredExpenses()

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const expensesByCategory = filteredExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "groceries":
        return "Groceries"
      case "utilities":
        return "Utilities"
      case "rent":
        return "Rent/Mortgage"
      case "entertainment":
        return "Entertainment"
      case "home":
        return "Home"
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription className="text-gray-300">Track your household expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this expense for?"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger id="category" className="bg-white/10 border-gray-700 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="rent">Rent/Mortgage</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddExpense} className="w-full bg-lime-400 text-black hover:bg-lime-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Expense Summary</CardTitle>
              <Tabs value={period} onValueChange={setPeriod} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                  <TabsTrigger value="week" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="month" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">
                    Month
                  </TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">
                    All
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription className="text-gray-300">
              {period === "week"
                ? "This week's expenses"
                : period === "month"
                  ? "This month's expenses"
                  : "All expenses"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <div className="mt-4 space-y-2">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span>{getCategoryLabel(category)}</span>
                  <span className="font-medium">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <div className="flex h-[100px] items-center justify-center rounded-md border border-gray-700 border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">No expenses recorded</p>
                  </div>
                </div>
              ) : (
                filteredExpenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 bg-white/5 p-3"
                  >
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-xs text-gray-400">
                        {getCategoryLabel(expense.category)} • {format(expense.date, "MMM d, yyyy")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${expense.amount.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense(expense.id)}
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
