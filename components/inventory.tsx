"use client"

import { useState } from "react"
import { Plus, Trash2, Search, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type InventoryItem = {
  id: string
  name: string
  quantity: number
  category: string
  location: string
}

export function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Paper Towels",
      quantity: 4,
      category: "supplies",
      location: "kitchen",
    },
    {
      id: "2",
      name: "Laundry Detergent",
      quantity: 1,
      category: "cleaning",
      location: "laundry",
    },
    {
      id: "3",
      name: "Light Bulbs",
      quantity: 6,
      category: "maintenance",
      location: "garage",
    },
  ])

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    category: "supplies",
    location: "kitchen",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleAddItem = () => {
    if (newItem.name.trim() === "") return

    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        ...newItem,
        quantity: Number(newItem.quantity),
      },
    ])

    setNewItem({
      name: "",
      quantity: 1,
      category: "supplies",
      location: "kitchen",
    })
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "supplies":
        return "Supplies"
      case "cleaning":
        return "Cleaning"
      case "food":
        return "Food"
      case "maintenance":
        return "Maintenance"
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  const getLocationLabel = (location: string) => {
    switch (location) {
      case "kitchen":
        return "Kitchen"
      case "bathroom":
        return "Bathroom"
      case "bedroom":
        return "Bedroom"
      case "garage":
        return "Garage"
      case "laundry":
        return "Laundry Room"
      default:
        return location.charAt(0).toUpperCase() + location.slice(1)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400/20">
              <Package className="h-4 w-4 text-lime-400" />
            </div>
            <div>
              <CardTitle>Home Inventory</CardTitle>
              <CardDescription className="text-gray-300">Track household items and supplies</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
                className="bg-white/10 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger id="category" className="bg-white/10 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select value={newItem.location} onValueChange={(value) => setNewItem({ ...newItem, location: value })}>
                  <SelectTrigger id="location" className="bg-white/10 border-gray-700 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="laundry">Laundry Room</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddItem} className="w-full bg-lime-400 text-black hover:bg-lime-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
          <CardDescription className="text-gray-300">Manage your household inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                className="pl-8 bg-white/10 border-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[130px] bg-white/10 border-gray-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
                <div className="text-center">
                  <p className="text-sm text-gray-400">No items found</p>
                </div>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-white/5 p-3"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {getCategoryLabel(item.category)}
                      </Badge>
                      <span className="text-xs text-gray-400">{getLocationLabel(item.location)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 0}
                      className="h-7 w-7 rounded-full bg-white/10 border-gray-700 text-white"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-7 w-7 rounded-full bg-white/10 border-gray-700 text-white"
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
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
  )
}
