"use client";

import { useState } from "react";
import { BrokerSetupModal } from "@/components/modules/brokerSetup/brokerSetupModal";
import { ThemeSetupModal } from "@/components/modules/ThemeSetup/themeSetupModal";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState(false);

  const handleThemeContinue = () => {
    setIsThemeModalOpen(false);
    setIsBrokerModalOpen(true);
  };

  const handleBrokerBack = () => {
    setIsBrokerModalOpen(false);
    setIsThemeModalOpen(true);
  };

  const handleSetupProject = () => {
    setIsThemeModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to IoTNet Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Get started by setting up your project configuration
        </p>
        <Button 
          onClick={handleSetupProject}
          size="lg"
          className="mt-8"
        >
          Setup your project
        </Button>
      </div>

      <ThemeSetupModal
        open={isThemeModalOpen}
        onOpenChange={setIsThemeModalOpen}
        onContinue={handleThemeContinue}
      />

      <BrokerSetupModal
        open={isBrokerModalOpen}
        onOpenChange={setIsBrokerModalOpen}
        onBack={handleBrokerBack}
      />
    </div>
  );
}