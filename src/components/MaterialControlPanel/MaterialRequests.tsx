"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { requests } from "./data/material-data"

export default function MaterialRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  // Status options
  const requestStatuses = [
    'All Statuses',
    'Pending',
    'Approved',
    'Rejected',
    'Fulfilled',
    'Cancelled'
  ]

  // Priority options
  const requestPriorities = [
    'All Priorities',
    'Low',
    'Medium',
    'High',
    'Critical'
  ]

  // Filter requests based on search query, status, and priority filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "All Statuses" || request.status === statusFilter
    const matchesPriority = priorityFilter === "All Priorities" || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Get the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>
      case "Approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "Fulfilled":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Fulfilled</Badge>
      case "Cancelled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get the priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return <Badge variant="outline" className="border-green-500 text-green-700">Low</Badge>
      case "Medium":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Medium</Badge>
      case "High":
        return <Badge variant="outline" className="border-orange-500 text-orange-700">High</Badge>
      case "Critical":
        return <Badge variant="outline" className="border-red-500 text-red-700">Critical</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Material Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="request-search" className="mb-2 block text-sm">Search</Label>
              <Input
                id="request-search"
                placeholder="Search by request#, name, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="request-status" className="mb-2 block text-sm">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="request-status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {requestStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="request-priority" className="mb-2 block text-sm">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger id="request-priority">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  {requestPriorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setStatusFilter("All Statuses")
                setPriorityFilter("All Priorities")
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Required Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{request.requestNumber}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.requiredDate}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Items ({request.items.length})
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === "Pending" && (
                          <>
                            <Button variant="outline" size="sm" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
                              Reject
                            </Button>
                          </>
                        )}
                        {request.status === "Approved" && (
                          <Button variant="outline" size="sm">
                            Fulfill
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No requests found matching the filter criteria
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
