"use client";

import React, { ReactNode } from "react";

interface DashboardOverviewLayoutProps {
  children?: ReactNode;
  // Props untuk 5 section layout
  dashboardOverview?: ReactNode;
  quickAccess?: ReactNode; 
  systemStatus?: ReactNode;
  recentActivity?: ReactNode;
  gettingStarted?: ReactNode;
}

export default function DashboardOverviewLayout({
  children,
  dashboardOverview,
  quickAccess,
  systemStatus,
  recentActivity,
  gettingStarted
}: DashboardOverviewLayoutProps) {
  return (
    <div className="space-y-6">
      {/* 1. Dashboard Overview Container */}
      <div className="dashboard-overview-section">
        {dashboardOverview}
      </div>

      {/* 2. Quick Access Container */}
      <div className="quick-access-section">
        {quickAccess}
      </div>

      {/* 3. System Status & 4. Recent Activity Container - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="system-status-section">
          {systemStatus}
        </div>
        <div className="recent-activity-section">
          {recentActivity}
        </div>
      </div>

      {/* 5. Getting Started Container */}
      <div className="getting-started-section">
        {gettingStarted}
      </div>

      {/* Default children container jika ada konten tambahan */}
      {children && (
        <div className="additional-content">
          {children}
        </div>
      )}
    </div>
  );
}
