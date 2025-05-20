"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import MaterialInventory from "./MaterialInventory"
import MaterialDeliveries from "./MaterialDeliveries"
import MaterialRequests from "./MaterialRequests"
import { materialStatsData, MaterialStats } from "./data/material-data"
import { useMobile } from "@/hooks/use-mobile"

// Define the base color and generate a color palette
const BASE_COLOR = "#4E4456"
const ACCENT_COLOR = "#8ACCD5"
const SUCCESS_COLOR = "#50C878"
const WARNING_COLOR = "#FFB347"
const DANGER_COLOR = "#FF6B6B"
const INFO_COLOR = "#5BC0DE"

// Function to lighten a color
const lightenColor = (color: string, amount: number) => {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const r = Math.min(255, ((num >> 16) & 0xff) + 255 * amount)
  const g = Math.min(255, ((num >> 8) & 0xff) + 255 * amount)
  const b = Math.min(255, (num & 0xff) + 255 * amount)
  return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)
}

// Generate gradient string for CSS
const generateGradient = (color1: string, color2: string, direction = "to right") => {
  return `linear-gradient(${direction}, ${color1}, ${color2})`
}

// Material Status Card Component
interface MaterialStatusCardProps {
  title: string
  value: number
  total?: number
  unit: string
  icon?: React.ReactNode
  color: string
  change?: number
}

const MaterialStatusCard = ({ title, value, total, unit, icon, color, change }: MaterialStatusCardProps) => {
  const percentage = total ? (value / total) * 100 : undefined
  
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ background: color }} aria-hidden="true"></div>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider">{title}</h3>
          {icon && (
            <span className="text-gray-400" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex-1">
            <div className="flex items-baseline">
              <p className="text-3xl font-bold" style={{ color: BASE_COLOR }}>
                {value.toLocaleString()}
              </p>
              <p className="ml-2 text-sm text-gray-500">{unit}</p>
            </div>
            {total && (
              <p className="text-sm text-gray-500 mt-1">
                of {total.toLocaleString()} {unit} ({percentage?.toFixed(1)}%)
              </p>
            )}
          </div>
          {percentage !== undefined && (
            <div className="w-16 h-16 ml-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(0)}%`}
                styles={buildStyles({
                  textSize: '28px',
                  pathColor: color,
                  textColor: BASE_COLOR,
                  trailColor: lightenColor(color, 0.8),
                })}
              />
            </div>
          )}
        </div>
        {change !== undefined && (
          <div className="mt-3 flex items-center">
            <span
              className={`text-xs font-medium ${change >= 0 ? "text-green-500" : "text-red-500"}`}
              aria-label={`${change >= 0 ? "Increased by" : "Decreased by"} ${Math.abs(change)}%`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>
            <span className="text-gray-400 text-xs ml-2">vs previous month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main Material Control Panel Component
export default function MaterialControlPanel() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const isMobile = useMobile()
  
  const stats: MaterialStats = materialStatsData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with solid background */}
      <div
        className="relative overflow-hidden"
        style={{
          background: BASE_COLOR,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="materialGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <pattern id="materialLargeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#materialGrid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#materialLargeGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Muscat Bay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-3xl font-bold text-white">Materials Control Panel</h1>
                <p className="text-purple-100 mt-1">Inventory Management & Procurement Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <TabsList className="flex overflow-x-auto scrollbar-hide h-auto">
              <TabsTrigger
                value="inventory"
                className="px-6 py-4 font-medium transition-all duration-200 text-sm whitespace-nowrap data-[state=active]:text-[#8ACCD5] data-[state=active]:border-b-2 data-[state=active]:border-[#8ACCD5] data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#8ACCD5]"
              >
                Material Inventory
              </TabsTrigger>
              <TabsTrigger
                value="deliveries"
                className="px-6 py-4 font-medium transition-all duration-200 text-sm whitespace-nowrap data-[state=active]:text-[#8ACCD5] data-[state=active]:border-b-2 data-[state=active]:border-[#8ACCD5] data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#8ACCD5]"
              >
                Deliveries & Receipts
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="px-6 py-4 font-medium transition-all duration-200 text-sm whitespace-nowrap data-[state=active]:text-[#8ACCD5] data-[state=active]:border-b-2 data-[state=active]:border-[#8ACCD5] data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#8ACCD5]"
              >
                Material Requests
              </TabsTrigger>
              <TabsTrigger
                value="suppliers"
                className="px-6 py-4 font-medium transition-all duration-200 text-sm whitespace-nowrap data-[state=active]:text-[#8ACCD5] data-[state=active]:border-b-2 data-[state=active]:border-[#8ACCD5] data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#8ACCD5]"
              >
                Suppliers
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="px-6 py-4 font-medium transition-all duration-200 text-sm whitespace-nowrap data-[state=active]:text-[#8ACCD5] data-[state=active]:border-b-2 data-[state=active]:border-[#8ACCD5] data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#8ACCD5]"
              >
                Reports & Analytics
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-6">
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MaterialStatusCard
              title="Total Inventory Value"
              value={stats.totalInventoryValue}
              unit="OMR"
              color={ACCENT_COLOR}
              change={stats.inventoryValueChange}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <MaterialStatusCard
              title="Items in Stock"
              value={stats.totalItems}
              total={stats.catalogItems}
              unit="items"
              color={SUCCESS_COLOR}
              change={stats.itemsChange}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              }
            />
            <MaterialStatusCard
              title="Pending Orders"
              value={stats.pendingOrders}
              unit="orders"
              color={WARNING_COLOR}
              change={stats.ordersChange}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <MaterialStatusCard
              title="Low Stock Items"
              value={stats.lowStockItems}
              unit="items"
              color={DANGER_COLOR}
              change={stats.lowStockChange}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
          </div>

          {/* Tab Content */}
          <TabsContent value="inventory" className="space-y-6">
            <MaterialInventory onSelectMaterial={setSelectedMaterial} />
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-6">
            <MaterialDeliveries />
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <MaterialRequests />
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Supplier Directory</h2>
              <p className="text-gray-500">This section will display the supplier directory with contact information, performance ratings, and order history.</p>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Materials Analytics</h2>
              <p className="text-gray-500">This section will display comprehensive reports and analytics for material usage, trends, and procurement efficiency.</p>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
