"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProgressBar } from "@/components/providers/progressBarProvider";
import BrokerOptions from "./addUserOptions";
import BrokerIonetSetup from "./addUserByIotnetBroker";
import BrokerCreateSetup from "./addUserByPersonalBroker";
import BrokerExternalSetup from "./addUserByExternalBroker";

interface BrokerSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export function BrokerSetupModal({ open, onOpenChange, onBack }: BrokerSetupModalProps) {
  const [currentView, setCurrentView] = useState<string>("options");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { showProgress } = useProgressBar();
  const router = useRouter();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setCurrentView(selectedOption);
    }
  };

  const handleBackToOptions = () => {
    setCurrentView("options");
    setSelectedOption(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case "iotnet":
        return <BrokerIonetSetup />;
      case "create":
        return <BrokerCreateSetup />;
      case "external":
        return <BrokerExternalSetup />;
      default:
        return <BrokerOptions selected={selectedOption} setSelected={handleOptionSelect} />;
    }
  };

  const getContinueButtonText = () => {
    switch (currentView) {
      case "iotnet":
        return "Connect to IoTNet";
      case "create":
        return "Create Broker";
      case "external":
        return "Test Connection";
      default:
        return "Continue";
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case "iotnet":
        return "IoTNet Broker Setup";
      case "create":
        return "Create Your Own Broker";
      case "external":
        return "Setup External Broker";
      default:
        return "Setup Your MQTT Broker";
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case "iotnet":
        return "Connect to the default IoTNet broker with automatic configuration.";
      case "create":
        return "Configure your private MQTT broker.";
      case "external":
        return "Connect to your existing MQTT broker.";
      default:
        return "Choose how you want to connect to an MQTT broker.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {renderContent()}
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          {onBack && currentView === "options" && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          {currentView !== "options" && (
            <Button variant="outline" onClick={handleBackToOptions}>
              Back
            </Button>
          )}
          
          {currentView === "options" && (
            <Button 
              onClick={handleContinue}
              disabled={!selectedOption}
            >
              Continue
            </Button>
          )}
          {currentView !== "options" && (
            <Button onClick={() => {
              // Show progress bar with different text based on setup type
              let loadingText = "";
              let duration = 4000;
              
              switch (currentView) {
                case "iotnet":
                  loadingText = "Building the IoTNet project...";
                  duration = 3000;
                  break;
                case "create":
                  loadingText = "Building the IoTNet project...";
                  duration = 5000;
                  break;
                case "external":
                  loadingText = "Building the IoTNet project...";
                  duration = 4000;
                  break;
                default:
                  loadingText = "Processing setup...";
                  break;
              }

              showProgress(loadingText, duration, () => {
                onOpenChange(false);
                setCurrentView("options");
                setSelectedOption(null);
                router.push("/auth/login");
              });
            }}>
              {getContinueButtonText()}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
