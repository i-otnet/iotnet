"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ServerCog, Zap, Globe } from "lucide-react";

const mockUsersData = {
  users: [
    { id: 1, brokerType: "iotnet" },
    { id: 2, brokerType: "create" },
    { id: 3, brokerType: "external" },
    { id: 4, brokerType: "iotnet" },
    { id: 5, brokerType: "create" },
    { id: 6, brokerType: "external" },
    { id: 7, brokerType: "iotnet" },
    { id: 8, brokerType: "create" }
  ]
};

const getBrokerInfo = (type: string) => {
  switch (type) {
    case 'iotnet':
      return {
        icon: Zap,
        label: 'IoTNet',
        description: 'Using IoTNet default broker',
        color: 'bg-primary text-primary-foreground',
        badgeVariant: 'default' as const
      };
    case 'create':
      return {
        icon: ServerCog,
        label: 'Private',
        description: 'Using private custom broker',
        color: 'bg-blue-500 text-white',
        badgeVariant: 'secondary' as const
      };
    case 'external':
      return {
        icon: Network,
        label: 'External',
        description: 'Using external broker service',
        color: 'bg-green-500 text-white',
        badgeVariant: 'outline' as const
      };
    default:
      return {
        icon: Globe,
        label: 'Unknown',
        description: 'Unknown broker type',
        color: 'bg-gray-500 text-white',
        badgeVariant: 'outline' as const
      };
  }
};

export default function BrokerDistributionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Broker Distribution</CardTitle>
        <CardDescription>
          Overview of how users are distributed across different broker types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {['iotnet', 'create', 'external'].map((type) => {
            const brokerInfo = getBrokerInfo(type);
            const BrokerIcon = brokerInfo.icon;
            const count = mockUsersData.users.filter(user => user.brokerType === type).length;
            const percentage = ((count / mockUsersData.users.length) * 100).toFixed(1);
            
            return (
              <div key={type} className="flex items-center gap-3 p-4 border rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${brokerInfo.color}`}>
                  <BrokerIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{brokerInfo.label} Broker</div>
                  <div className="text-sm text-muted-foreground">{brokerInfo.description}</div>
                  <div className="text-lg font-bold text-primary">{count} users ({percentage}%)</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
