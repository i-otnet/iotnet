import React from "react";
import Sidebar from "@/components/modules/dashboard/sidebar";
import Profile from "@/components/modules/dashboard/profile";
import { ThemeDropdown } from "@/components/modules/ThemeSetup/themeDropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Professional Header */}
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-40">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Left side - Search */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search devices, analytics, users..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Right side - Theme, Notifications, Profile */}
            <div className="flex items-center gap-3">
              {/* Theme Selector */}
              <ThemeDropdown />

              {/* Notification Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground hover:bg-accent"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  3
                </span>
              </Button>

              {/* Profile */}
              <Profile 
                username="Admin User"
                // avatarUrl="/path/to/avatar.jpg" // Optional: uncomment and set avatar URL
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}