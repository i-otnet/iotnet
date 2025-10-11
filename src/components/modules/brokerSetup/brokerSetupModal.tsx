"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BrokerOptions from "./brokerOptions";

interface BrokerSetupModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export function BrokerSetupModal({ children, open, onOpenChange, onBack }: BrokerSetupModalProps) {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);

  const handleBrokerSelect = (broker: string) => {
    setSelectedBroker(broker);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10">
        <DialogHeader>
          <DialogTitle>Setup Your MQTT Broker</DialogTitle>
          <DialogDescription>
            Choose how you want to connect to an MQTT broker.
          </DialogDescription>
        </DialogHeader>
        <BrokerOptions selected={selectedBroker} setSelected={handleBrokerSelect} />
        <div className="flex justify-end gap-2 mt-4">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={() => {
            console.log("Selected broker:", selectedBroker);
            onOpenChange(false);
          }} disabled={!selectedBroker}>Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
