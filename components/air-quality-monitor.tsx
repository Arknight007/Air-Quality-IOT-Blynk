"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Wind, AlertTriangle, Leaf, Fan, Activity, TrendingUp, TrendingDown, Minus } from "lucide-react"

type AirQualityData = {
  aqi: number
  co: number
  co2: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  timestamp: Date
}

type AlertLevel = "good" | "moderate" | "unhealthy" | "hazardous"

export function AirQualityMonitor() {
  const [currentData, setCurrentData] = useState<AirQualityData>({
    aqi: 42,
    co: 12,
    co2: 420,
    pm25: 18,
    pm10: 25,
    temperature: 22,
    humidity: 50.2,
    timestamp: new Date(),
  })

  const [historicalData, setHistoricalData] = useState<AirQualityData[]>([])
  const [autoVentilation, setAutoVentilation] = useState(true)
  const [airPurifier, setAirPurifier] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: AirQualityData = {
        aqi: Math.max(0, Math.min(500, currentData.aqi + (Math.random() - 0.5) * 10)),
        co: Math.max(0, currentData.co + (Math.random() - 0.5) * 2),
        co2: Math.max(300, currentData.co2 + (Math.random() - 0.5) * 50),
        pm25: Math.max(0, currentData.pm25 + (Math.random() - 0.5) * 5),
        pm10: Math.max(0, currentData.pm10 + (Math.random() - 0.5) * 8),
        temperature: currentData.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(0, Math.min(100, currentData.humidity + (Math.random() - 0.5) * 5)),
        timestamp: new Date(),
      }

      setCurrentData(newData)
      setHistoricalData((prev) => [...prev.slice(-23), newData]) // Keep last 24 readings

      // Check for alerts
      const newAlerts: string[] = []
      if (newData.aqi > 100) newAlerts.push("High AQI detected")
      if (newData.co > 35) newAlerts.push("Elevated CO levels")
      if (newData.pm25 > 35) newAlerts.push("High PM2.5 concentration")
      if (newData.co2 > 1000) newAlerts.push("Poor ventilation - High CO2")

      setAlerts(newAlerts)

      // Auto-activate systems based on air quality
      if (autoVentilation && (newData.aqi > 100 || newData.co2 > 800)) {
        // Auto-ventilation would activate here
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [currentData, autoVentilation])

  const getAQILevel = (aqi: number): { level: AlertLevel; color: string; label: string } => {
    if (aqi <= 50) return { level: "good", color: "text-green-400", label: "Good" }
    if (aqi <= 100) return { level: "moderate", color: "text-yellow-400", label: "Moderate" }
    if (aqi <= 150) return { level: "unhealthy", color: "text-orange-400", label: "Unhealthy" }
    return { level: "hazardous", color: "text-red-400", label: "Hazardous" }
  }

  const aqiStatus = getAQILevel(currentData.aqi)

  const getPollutantStatus = (value: number, thresholds: number[]) => {
    if (value <= thresholds[0]) return { color: "bg-green-500", status: "Good" }
    if (value <= thresholds[1]) return { color: "bg-yellow-500", status: "Moderate" }
    if (value <= thresholds[2]) return { color: "bg-orange-500", status: "Unhealthy" }
    return { color: "bg-red-500", status: "Hazardous" }
  }

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-red-400" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-green-400" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const previousData = historicalData[historicalData.length - 2] || currentData

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Main AQI Display */}
      <Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-0 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
                <Wind className="h-5 w-5 text-lime-400" />
              </div>
              <div>
                <CardTitle>Air Quality Monitor</CardTitle>
                <CardDescription className="text-gray-300">Real-time environmental monitoring</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={`${aqiStatus.color} border-current`}>
              {aqiStatus.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-8">
            <div className="relative flex h-48 w-48 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-gray-700/30"></div>
              <div
                className={`absolute inset-0 rounded-full border-4 border-transparent ${
                  aqiStatus.level === "good"
                    ? "border-t-green-400"
                    : aqiStatus.level === "moderate"
                      ? "border-t-yellow-400"
                      : aqiStatus.level === "unhealthy"
                        ? "border-t-orange-400"
                        : "border-t-red-400"
                }`}
                style={{
                  transform: `rotate(${(currentData.aqi / 500) * 270}deg)`,
                  transition: "transform 0.5s ease-out",
                }}
              ></div>
              <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center flex-col">
                <p className="text-4xl font-light">{Math.round(currentData.aqi)}</p>
                <p className="text-xs text-gray-300">AQI</p>
                <div className="mt-2 flex items-center gap-1">
                  {getTrend(currentData.aqi, previousData.aqi)}
                  <span className="text-xs text-gray-400">
                    {Math.abs(currentData.aqi - previousData.aqi).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pollutant Levels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CO</span>
                <span className="text-sm font-medium">{currentData.co.toFixed(1)} ppm</span>
              </div>
              <Progress value={(currentData.co / 50) * 100} className="h-2" />
              <span className="text-xs text-gray-400">{getPollutantStatus(currentData.co, [9, 35, 50]).status}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CO₂</span>
                <span className="text-sm font-medium">{Math.round(currentData.co2)} ppm</span>
              </div>
              <Progress value={(currentData.co2 / 2000) * 100} className="h-2" />
              <span className="text-xs text-gray-400">
                {getPollutantStatus(currentData.co2, [400, 1000, 1500]).status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">PM2.5</span>
                <span className="text-sm font-medium">{currentData.pm25.toFixed(1)} μg/m³</span>
              </div>
              <Progress value={(currentData.pm25 / 100) * 100} className="h-2" />
              <span className="text-xs text-gray-400">{getPollutantStatus(currentData.pm25, [12, 35, 55]).status}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">PM10</span>
                <span className="text-sm font-medium">{currentData.pm10.toFixed(1)} μg/m³</span>
              </div>
              <Progress value={(currentData.pm10 / 150) * 100} className="h-2" />
              <span className="text-xs text-gray-400">
                {getPollutantStatus(currentData.pm10, [54, 154, 254]).status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls and Alerts */}
      <div className="space-y-4">
        {/* Environmental Controls */}
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Environmental Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fan className="h-4 w-4" />
                <span className="text-sm">Auto Ventilation</span>
              </div>
              <Switch
                checked={autoVentilation}
                onCheckedChange={setAutoVentilation}
                className="data-[state=checked]:bg-lime-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                <span className="text-sm">Air Purifier</span>
              </div>
              <Switch
                checked={airPurifier}
                onCheckedChange={setAirPurifier}
                className="data-[state=checked]:bg-lime-400"
              />
            </div>

            <div className="pt-2 border-t border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Temperature</span>
                <span className="text-sm font-medium">{currentData.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Humidity</span>
                <span className="text-sm font-medium">{currentData.humidity.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Air Quality Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="text-center py-4">
                <Activity className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">All systems normal</p>
              </div>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md bg-red-500/20 border border-red-500/30"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm">{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-white/10 border-gray-700 text-white hover:bg-white/20"
              onClick={() => setAirPurifier(true)}
            >
              <Leaf className="mr-2 h-4 w-4" />
              Activate Air Purifier
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-gray-700 text-white hover:bg-white/20">
              <Fan className="mr-2 h-4 w-4" />
              Increase Ventilation
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-gray-700 text-white hover:bg-white/20">
              <Activity className="mr-2 h-4 w-4" />
              View History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
