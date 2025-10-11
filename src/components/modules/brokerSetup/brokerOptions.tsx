"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Network, ServerCog } from "lucide-react";

interface SetupOptionProps {
  selected: string | null;
  setSelected: (option: string) => void;
}

export default function SetupOption({ selected, setSelected }: SetupOptionProps) {

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      {/* === Option 1: Use IoTNet (Recommended) === */}
      <Card
        role="button"
        onClick={() => setSelected("iotnet")}
        className={cn(
          "cursor-pointer transition-all rounded-xl p-6 border shadow-sm flex flex-col gap-3 relative group hover:shadow-md",
          selected === "iotnet"
            ? "border-primary bg-primary/10"
            : "bg-background"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <h2
            className={cn(
              "text-xl font-semibold",
              selected === "iotnet" ? "text-primary" : "text-foreground"
            )}
          >
            Use IoTNet
          </h2>

          <Badge
            variant={selected === "iotnet" ? "default" : "default"}
            className="text-xs px-2 py-0.5"
          >
            Recommended
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm">
          Connect instantly to the default IoTNet broker — fast and hassle-free.
        </p>
      </Card>

      {/* === Option 2 & 3 === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Create Your Own Broker */}
        <Card
          role="button"
          onClick={() => setSelected("create")}
          className={cn(
            "cursor-pointer transition-all rounded-xl p-6 border shadow-sm flex flex-col items-center gap-3 text-center hover:shadow-md",
            selected === "create"
              ? "border-primary bg-primary/10"
              : "bg-background"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full",
              selected === "create" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
            )}
          >
            <ServerCog className="w-5 h-5" />
          </div>
          <h3
            className={cn(
              "text-sm font-medium",
              selected === "create" ? "text-primary" : "text-foreground"
            )}
          >
            Create your own broker
          </h3>
          <p className="text-muted-foreground text-xs leading-snug">
            Set up a private MQTT broker for full control and enhanced security.
          </p>
        </Card>

        {/* Use Your Broker */}
        <Card
          role="button"
          onClick={() => setSelected("external")}
          className={cn(
            "cursor-pointer transition-all rounded-xl p-6 border shadow-sm flex flex-col items-center gap-3 text-center hover:shadow-md",
            selected === "external"
              ? "border-primary bg-primary/10"
              : "bg-background"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full",
              selected === "external" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
            )}
          >
            <Network className="w-5 h-5" />
          </div>
          <h3
            className={cn(
              "text-sm font-medium",
              selected === "external" ? "text-primary" : "text-foreground"
            )}
          >
            Use existing broker
          </h3>
          <p className="text-muted-foreground text-xs leading-snug">
            Connect to an external MQTT broker with your own credentials.
          </p>
        </Card>
      </div>
    </div>
  );
}
