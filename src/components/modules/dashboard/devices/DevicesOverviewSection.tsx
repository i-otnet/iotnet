"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Cpu,
  Wifi,
  WifiOff,
  Zap,
  Search,
  Filter,
} from "lucide-react";

const deviceTypeFilters = [
  { label: "All Devices", value: "all", count: 10 },
  { label: "ESP32", value: "esp32", count: 3 },
  { label: "ESP8266", value: "esp8266", count: 1 },
  { label: "Raspberry Pi", value: "raspberry", count: 2 },
  { label: "Orange Pi", value: "orange", count: 2 },
  { label: "Wemos", value: "wemos", count: 2 }
];

interface Device {
  id: number;
  status: string;
}

interface DevicesOverviewSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filteredDevices: Device[];
  totalDevices: number;
  activeDevices: number;
  offlineDevices: number;
  newDevicesThisWeek: number;
  getFilteredCount: (filterType: string) => number;
}

export default function DevicesOverviewSection({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredDevices,
  newDevicesThisWeek,
  getFilteredCount
}: DevicesOverviewSectionProps) {
  return (
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
              <div className="p-3 rounded-full bg-green-500/10">
                <Wifi className="w-6 h-6 text-green-500" />
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
                <p className="text-2xl font-bold">{newDevicesThisWeek}</p>
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
  );
}
