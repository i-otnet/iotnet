"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search,
  Wifi,
  WifiOff,
  Lightbulb,
  Camera,
  Shield,
  Smartphone,
  Router,
  Activity,
  Settings,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Cpu,
  Zap,
  BarChart3
} from "lucide-react";

// Mock devices data
const mockDevicesData = {
  totalDevices: 10,
  activeDevices: 8,
  offlineDevices: 2,
  newDevicesThisWeek: 3,
  devices: [
    {
      id: 1,
      name: "ESP32-01",
      type: "ESP32 DevKit",
      status: "online",
      location: "Living Room",
      lastSeen: "2 minutes ago",
      icon: Smartphone,
      firmwareVersion: "v2.1.0",
      chipId: "240AC4A1B2C8"
    },
    {
      id: 2,
      name: "ESP32-02",
      type: "ESP32-S3",
      status: "online",
      location: "Workshop",
      lastSeen: "1 minute ago",
      icon: Router,
      firmwareVersion: "v2.3.1",
      chipId: "ESP32S3"
    },
    {
      id: 3,
      name: "Raspberry Pi 4B",
      type: "Single Board Computer",
      status: "online",
      location: "Server Room",
      lastSeen: "30 seconds ago",
      icon: Router,
      firmwareVersion: "Raspbian 11",
      chipId: "BCM2711"
    },
    {
      id: 4,
      name: "Smart Lamp Controller",
      type: "ESP8266 NodeMCU",
      status: "offline",
      location: "Bedroom",
      lastSeen: "2 hours ago",
      icon: Lightbulb,
      firmwareVersion: "v3.0.2",
      chipId: "ESP8266EX"
    },
    {
      id: 5,
      name: "Door Lock Module",
      type: "ESP32-C3",
      status: "online",
      location: "Front Door",
      lastSeen: "5 minutes ago",
      icon: Shield,
      firmwareVersion: "v1.9.4",
      chipId: "ESP32C3"
    },
    {
      id: 6,
      name: "Security Camera Hub",
      type: "Raspberry Pi Zero 2W",
      status: "online",
      location: "Garage",
      lastSeen: "3 minutes ago",
      icon: Camera,
      firmwareVersion: "Raspbian Lite",
      chipId: "RP3A0-AU"
    },
    {
      id: 7,
      name: "Orange Pi 5",
      type: "Orange Pi Board",
      status: "online",
      location: "Lab",
      lastSeen: "1 minute ago",
      icon: Router,
      firmwareVersion: "Ubuntu 22.04",
      chipId: "RK3588S"
    },
    {
      id: 8,
      name: "Weather Station",
      type: "Wemos D1 Mini",
      status: "online",
      location: "Garden",
      lastSeen: "4 minutes ago",
      icon: Activity,
      firmwareVersion: "v2.7.4",
      chipId: "ESP8266"
    },
    {
      id: 9,
      name: "IoT Sensor Hub",
      type: "Wemos D1 R32",
      status: "online",
      location: "Basement",
      lastSeen: "2 minutes ago",
      icon: Cpu,
      firmwareVersion: "v1.0.6",
      chipId: "ESP32"
    },
    {
      id: 10,
      name: "Home Automation",
      type: "Orange Pi Zero 2W",
      status: "offline",
      location: "Control Room",
      lastSeen: "6 hours ago",
      icon: Settings,
      firmwareVersion: "Armbian 23.02",
      chipId: "H618"
    }
  ]
};

const deviceTypeFilters = [
  { label: "All Devices", value: "all", count: 10 },
  { label: "ESP32", value: "esp32", count: 3 },
  { label: "ESP8266", value: "esp8266", count: 1 },
  { label: "Raspberry Pi", value: "raspberry", count: 2 },
  { label: "Orange Pi", value: "orange", count: 2 },
  { label: "Wemos", value: "wemos", count: 2 }
];

export default function DevicesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter devices based on selected filter and search query
  const filteredDevices = mockDevicesData.devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "esp32" && device.type.toLowerCase().includes("esp32")) ||
                         (selectedFilter === "esp8266" && device.type.toLowerCase().includes("esp8266")) ||
                         (selectedFilter === "raspberry" && device.type.toLowerCase().includes("raspberry")) ||
                         (selectedFilter === "orange" && device.type.toLowerCase().includes("orange")) ||
                         (selectedFilter === "wemos" && device.type.toLowerCase().includes("wemos"));
    
    return matchesSearch && matchesFilter;
  });

  // Update filter counts based on current search
  const getFilteredCount = (filterType: string) => {
    if (filterType === "all") return filteredDevices.length;
    
    return mockDevicesData.devices.filter((device) => {
      const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           device.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = (filterType === "esp32" && device.type.toLowerCase().includes("esp32")) ||
                         (filterType === "esp8266" && device.type.toLowerCase().includes("esp8266")) ||
                         (filterType === "raspberry" && device.type.toLowerCase().includes("raspberry")) ||
                         (filterType === "orange" && device.type.toLowerCase().includes("orange")) ||
                         (filterType === "wemos" && device.type.toLowerCase().includes("wemos"));
      
      return matchesSearch && matchesType;
    }).length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "offline":
        return <WifiOff className="w-4 h-4 text-muted-foreground" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your IoT devices
            </p>
          </div>
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Add Device
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filteredDevices.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFilter === "all" ? "Total Devices" : "Filtered Devices"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {filteredDevices.filter(device => device.status === "online").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-muted">
                  <WifiOff className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {filteredDevices.filter(device => device.status === "offline").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Offline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockDevicesData.newDevicesThisWeek}</p>
                  <p className="text-sm text-muted-foreground">New This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Device Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {deviceTypeFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="whitespace-nowrap"
              >
                {filter.label}
                <Badge 
                  variant={selectedFilter === filter.value ? "secondary" : "outline"}
                  className={`ml-2 ${
                    selectedFilter === filter.value 
                      ? "bg-primary-foreground text-primary border-primary-foreground" 
                      : "text-primary border-primary"
                  }`}
                >
                  {getFilteredCount(filter.value)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDevices.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No devices found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery 
                ? `No devices match "${searchQuery}" in the selected category.`
                : "No devices found in the selected category."
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            {filteredDevices.map((device) => {
          const IconComponent = device.icon;
          return (
            <Card key={device.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{device.name}</h3>
                      <p className="text-xs text-muted-foreground">{device.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      <span className="text-sm font-medium capitalize">{device.status}</span>
                    </div>
                    <Badge variant={device.status === "online" ? "default" : "default"}>
                      {device.location}
                    </Badge>
                  </div>

                  {/* Device-specific information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Firmware</span>
                      <span className="font-medium">{device.firmwareVersion}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Chip ID</span>
                      <span className="font-medium text-xs font-mono">{device.chipId}</span>
                    </div>
                  </div>

                  {/* Last seen */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <Clock className="w-3 h-3" />
                    <span>Last seen {device.lastSeen}</span>
                  </div>

                  {/* Quick actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Settings
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="flex-1"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Insights
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add New Device Card */}
        <Card className="group hover:shadow-lg transition-all duration-200 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/20 hover:bg-muted/30 cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center min-h-[300px]">
            <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Add New Device</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect a new IoT device to your network
            </p>
            <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Get Started
            </Button>
          </CardContent>
        </Card>
          </>
        )}
      </div>
    </div>
  );
}
