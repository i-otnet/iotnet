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
import { Paintbrush } from "lucide-react";
import { ThemeOptions } from "./themeOptions";

interface ThemeSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function ThemeSetupModal({ open, onOpenChange, onContinue }: ThemeSetupModalProps) {
  const handleContinueClick = () => {
    console.log("Theme setup continued.");
    onContinue();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Paintbrush className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900/85 backdrop-blur-xl border-gray-200 dark:border-white/10">
        <DialogHeader>
          <DialogTitle>Setup Your Theme</DialogTitle>
          <DialogDescription>
            Choose your preferred theme for the application.
          </DialogDescription>
        </DialogHeader>
        <ThemeOptions />
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleContinueClick}>Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
