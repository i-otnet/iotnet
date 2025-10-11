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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSetupModal
        open={isThemeModalOpen}
        onOpenChange={setIsThemeModalOpen}
        onContinue={handleThemeContinue}
      />
      <Button onClick={() => setIsThemeModalOpen(true)}>Open Setup</Button>

      <BrokerSetupModal
        open={isBrokerModalOpen}
        onOpenChange={setIsBrokerModalOpen}
        onBack={handleBrokerBack}
      >
        <div></div>
      </BrokerSetupModal>
    </div>
  );
}