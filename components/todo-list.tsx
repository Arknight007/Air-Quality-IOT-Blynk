"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Todo = {
  id: string
  text: string
  completed: boolean
  category: string
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Clean kitchen", completed: false, category: "home" },
    { id: "2", text: "Pay utility bills", completed: true, category: "finance" },
    { id: "3", text: "Buy groceries", completed: false, category: "shopping" },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [category, setCategory] = useState("home")
  const [filter, setFilter] = useState("all")

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return

    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false,
        category,
      },
    ])
    setNewTodo("")
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true
    if (filter === "completed") return todo.completed
    if (filter === "active") return !todo.completed
    return todo.category === filter
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "home":
        return "bg-blue-500"
      case "finance":
        return "bg-green-500"
      case "shopping":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription className="text-gray-300">Manage your tasks and to-dos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTodo()
              }}
              className="bg-white/10 border-gray-700 text-white"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[120px] bg-white/10 border-gray-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddTodo} className="bg-lime-400 text-black hover:bg-lime-500">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-700 px-6 py-4">
          <div className="text-xs text-gray-400">{todos.filter((todo) => !todo.completed).length} items left</div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[120px] bg-white/10 border-gray-700 text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription className="text-gray-300">
            {filter === "all"
              ? "All tasks"
              : filter === "completed"
                ? "Completed tasks"
                : filter === "active"
                  ? "Active tasks"
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} tasks`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No tasks</h3>
                  <p className="text-sm text-gray-400">Add a task to get started</p>
                </div>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-white/5 p-4"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                    />
                    <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
                    <Badge variant="outline" className="ml-2 border-gray-600 text-gray-300">
                      {todo.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
