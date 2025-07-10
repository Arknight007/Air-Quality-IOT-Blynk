"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Thermometer,
  Droplets,
  LightbulbIcon,
  Tv,
  Speaker,
  Wifi,
  Camera,
  Plus,
  Minus,
  Sun,
  Cloud,
  AlertTriangle,
  Wind,
  Leaf,
} from "lucide-react"
import Image from "next/image"

export function SmartHome() {
  const [temperature, setTemperature] = useState(22)
  const [devices, setDevices] = useState({
    light: true,
    airConditioner: true,
    tv: false,
    router: true,
    speaker: true,
    cctv: true,
    humidifier: false,
  })

  const toggleDevice = (device: keyof typeof devices) => {
    setDevices({
      ...devices,
      [device]: !devices[device],
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 grid gap-4">
        <Card className="overflow-hidden border-0 bg-white/10 backdrop-blur-md text-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
                  <Thermometer className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Air Conditioning</h3>
                </div>
              </div>
              <Switch
                checked={devices.airConditioner}
                onCheckedChange={() => toggleDevice("airConditioner")}
                className="data-[state=checked]:bg-lime-400"
              />
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative flex h-60 w-60 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-gray-700/30"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-lime-400"
                  style={{
                    transform: `rotate(${(temperature - 10) * 9}deg)`,
                    transition: "transform 0.3s ease-out",
                  }}
                ></div>
                <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center flex-col">
                  <p className="text-6xl font-light">{temperature}</p>
                  <p className="text-xs text-gray-300">Temperature</p>
                  <div className="mt-2">
                    <div className="h-5 w-5 text-lime-400">
                      {devices.airConditioner ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1c0 2.761-2.239 5-5 5S2 3.761 2 1h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z" />
                          <path d="M17 5c0 2.761-2.239 5-5 5S7 7.761 7 5h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z" />
                          <path d="M22 9c0 2.761-2.239 5-5 5s-5-2.239-5-5h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z" />
                        </svg>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white"
                    onClick={() => setTemperature(Math.max(10, temperature - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white"
                    onClick={() => setTemperature(Math.min(30, temperature + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4">
                  <span className="text-xs text-gray-400">10°</span>
                </div>
                <div className="absolute right-0 top-1/4 translate-x-4 -translate-y-2">
                  <span className="text-xs text-gray-400">20°</span>
                </div>
                <div className="absolute right-1/4 bottom-0 translate-y-4">
                  <span className="text-xs text-gray-400">30°</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
                <Wind className="h-5 w-5 text-lime-400" />
              </div>
              <h3 className="text-sm font-medium">Air Quality Index</h3>
              <p className="text-2xl font-bold">42</p>
              <span className="text-xs text-lime-400">Good</span>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/20">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-sm font-medium">CO Level</h3>
              <p className="text-2xl font-bold">12</p>
              <span className="text-xs text-gray-400">ppm</span>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/20">
                <Droplets className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium">Humidity</h3>
              <p className="text-2xl font-bold">50.2%</p>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20">
                <Leaf className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-sm font-medium">PM2.5</h3>
              <p className="text-2xl font-bold">18</p>
              <span className="text-xs text-gray-400">μg/m³</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 content-start">
        <Card className="bg-white/10 backdrop-blur-md border-0 overflow-hidden text-white">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Camera</h3>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-lime-400 mr-2"></div>
                <span className="text-xs">Drawing Room</span>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Room camera view"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                Live
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400">
                <Sun className="h-8 w-8" />
              </div>
              <div className="text-cyan-400">
                <Cloud className="h-6 w-6" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-300">{"Savalade"}</p>
              <div className="flex items-end">
                <span className="text-5xl font-light">28</span>
                <span className="text-xl">°C</span>
              </div>
              <p className="text-xs text-gray-300">Sunny with cold</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
          <h3 className="text-lg font-medium mb-4">Devices</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.light ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.light ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <LightbulbIcon className={`h-4 w-4 ${devices.light ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">Light</span>
                </div>
                <Switch
                  checked={devices.light}
                  onCheckedChange={() => toggleDevice("light")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.tv ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.tv ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <Tv className={`h-4 w-4 ${devices.tv ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">Smart TV</span>
                </div>
                <Switch
                  checked={devices.tv}
                  onCheckedChange={() => toggleDevice("tv")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.humidifier ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.humidifier ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <Droplets className={`h-4 w-4 ${devices.humidifier ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">Humidifier</span>
                </div>
                <Switch
                  checked={devices.humidifier}
                  onCheckedChange={() => toggleDevice("humidifier")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.router ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.router ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <Wifi className={`h-4 w-4 ${devices.router ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">Router</span>
                </div>
                <Switch
                  checked={devices.router}
                  onCheckedChange={() => toggleDevice("router")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.speaker ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.speaker ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <Speaker className={`h-4 w-4 ${devices.speaker ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">Speaker</span>
                </div>
                <Switch
                  checked={devices.speaker}
                  onCheckedChange={() => toggleDevice("speaker")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg ${devices.cctv ? "bg-lime-400/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.cctv ? "bg-lime-400" : "bg-white/10"}`}
                  >
                    <Camera className={`h-4 w-4 ${devices.cctv ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs">CCTV</span>
                </div>
                <Switch
                  checked={devices.cctv}
                  onCheckedChange={() => toggleDevice("cctv")}
                  className="data-[state=checked]:bg-lime-400"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
