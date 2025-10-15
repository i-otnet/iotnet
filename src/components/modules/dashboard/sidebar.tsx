"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Users, 
  HardDrive, 
  Settings, 
  Activity,
  Zap,
  ChevronRight,
  Home,
  LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    description: "Dashboard overview"
  },
  {
    title: "Devices",
    href: "/dashboard/devices",
    icon: HardDrive,
    description: "Manage IoT devices"
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: LineChart,
    description: "Data insights"
  },
  {
    title: "Automation",
    href: "/dashboard/automation",
    icon: Zap,
    description: "Smart rules"
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    description: "User management"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "System config"
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-screen shadow-lg sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20">
            <div className="w-6 h-6 relative">
              <Image 
                src="/logo.svg" 
                alt="IoTNet Logo" 
                width={24} 
                height={24}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(0deg) saturate(0) brightness(0) invert(1)',
                  color: 'var(--primary)'
                }}
              />
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: 'var(--primary)',
                  mask: 'url(/logo.svg) center/contain no-repeat',
                  WebkitMask: 'url(/logo.svg) center/contain no-repeat'
                }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">IoTNet</h1>
            <p className="text-xs text-sidebar-foreground/60">IoT Management Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border/50"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "bg-sidebar-accent/30 text-sidebar-foreground/60 group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-sidebar-foreground/50 group-hover:text-sidebar-foreground/60">
                      {item.description}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-sidebar-foreground">System Status</p>
            <p className="text-xs text-primary">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
