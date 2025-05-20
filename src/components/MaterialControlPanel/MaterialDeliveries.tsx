"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { deliveries } from "./data/material-data"

export default function MaterialDeliveries() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  // Status options
  const deliveryStatuses = [
    'All Statuses',
    'Pending',
    'In Transit',
    'Received',
    'Delayed',
    'Cancelled'
  ]

  // Filter deliveries based on search query and status filter
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch = 
      delivery.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "All Statuses" || delivery.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>
      case "In Transit":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">In Transit</Badge>
      case "Received":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Received</Badge>
      case "Delayed":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Delayed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Deliveries & Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="delivery-search" className="mb-2 block text-sm">Search</Label>
              <Input
                id="delivery-search"
                placeholder="Search by PO#, supplier, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="delivery-status" className="mb-2 block text-sm">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="delivery-status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryStatuses.map((status) => (
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
                setStatusFilter("All Statuses")
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.poNumber}</TableCell>
                    <TableCell>{delivery.supplier}</TableCell>
                    <TableCell>{delivery.deliveryDate}</TableCell>
                    <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                    <TableCell className="text-right">{delivery.totalValue.toFixed(2)} OMR</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Items ({delivery.items.length})
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {delivery.status === "Pending" || delivery.status === "In Transit" ? (
                          <Button variant="outline" size="sm">
                            Receive
                          </Button>
                        ) : null}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredDeliveries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No deliveries found matching the filter criteria
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
