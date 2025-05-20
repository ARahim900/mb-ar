"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  materials, 
  materialCategories, 
  storageLocations, 
  stockStatuses,
  MaterialItem 
} from "./data/material-data"

interface MaterialInventoryProps {
  onSelectMaterial: (materialId: string | null) => void
}

export default function MaterialInventory({ onSelectMaterial }: MaterialInventoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter materials based on search query and filter selections
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "All Categories" || material.category === categoryFilter
    const matchesLocation = locationFilter === "All Locations" || material.location === locationFilter
    const matchesStatus = statusFilter === "All Statuses" || material.status === statusFilter

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus
  })

  // Sort filtered materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    let compareA: string | number = a[sortBy as keyof MaterialItem] as string | number
    let compareB: string | number = b[sortBy as keyof MaterialItem] as string | number

    if (typeof compareA === 'string' && typeof compareB === 'string') {
      compareA = compareA.toLowerCase()
      compareB = compareB.toLowerCase()
    }

    if (compareA < compareB) return sortDirection === "asc" ? -1 : 1
    if (compareA > compareB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // Get the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
      case "On Order":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Order</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Material Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block text-sm">Search</Label>
              <Input
                id="search"
                placeholder="Search by name, ID, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category" className="mb-2 block text-sm">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {materialCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location" className="mb-2 block text-sm">Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {storageLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="mb-2 block text-sm">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {stockStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setCategoryFilter("All Categories")
                setLocationFilter("All Locations")
                setStatusFilter("All Statuses")
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50" 
                    onClick={() => handleSort("id")}
                  >
                    ID {sortBy === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50" 
                    onClick={() => handleSort("name")}
                  >
                    Material Name {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50" 
                    onClick={() => handleSort("category")}
                  >
                    Category {sortBy === "category" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 text-right" 
                    onClick={() => handleSort("stockLevel")}
                  >
                    Stock Level {sortBy === "stockLevel" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 text-right" 
                    onClick={() => handleSort("unitCost")}
                  >
                    Unit Cost {sortBy === "unitCost" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50 text-right" 
                    onClick={() => handleSort("totalValue")}
                  >
                    Total Value {sortBy === "totalValue" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50" 
                    onClick={() => handleSort("location")}
                  >
                    Location {sortBy === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50" 
                    onClick={() => handleSort("status")}
                  >
                    Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMaterials.map((material) => (
                  <TableRow key={material.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{material.id}</TableCell>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell className="text-right">
                      <span className={material.stockLevel < material.minLevel ? "text-red-600 font-medium" : ""}>
                        {material.stockLevel}
                      </span>
                    </TableCell>
                    <TableCell>{material.unit}</TableCell>
                    <TableCell className="text-right">{material.unitCost.toFixed(2)} OMR</TableCell>
                    <TableCell className="text-right">{material.totalValue.toFixed(2)} OMR</TableCell>
                    <TableCell>{material.location}</TableCell>
                    <TableCell>{getStatusBadge(material.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onSelectMaterial(material.id)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedMaterials.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No materials found matching the filter criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
