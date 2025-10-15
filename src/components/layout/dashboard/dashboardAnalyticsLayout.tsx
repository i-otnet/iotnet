"use client";

import React, { ReactNode } from "react";

interface DashboardAnalyticsLayoutProps {
  children?: ReactNode;
  modelsOverview?: ReactNode;
  modelsGrid?: ReactNode;
}

export default function DashboardAnalyticsLayout({
  children,
  modelsOverview,
  modelsGrid
}: DashboardAnalyticsLayoutProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Models Overview Section (Header + Stats + Search/Filter) */}
      {modelsOverview}

      {/* Models Grid Section */}
      {modelsGrid}

      {/* Default children container jika ada konten tambahan */}
      {children}
    </div>
  );
}
