"use client";

import React, { useState } from "react";
import SetupOption from "./SetupOption";
import SetupOwnBroker from "./SetupOwnBroker";
import SetupIotnet from "./SetupIotnet";
import SetupExternal from "./SetupExternal";
``
const SetupModal: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null); // default to null, no option selected initially
  const [showOwnBroker, setShowOwnBroker] = useState<boolean>(false);
  const [showIotnet, setShowIotnet] = useState<boolean>(false);
  const [showExternal, setShowExternal] = useState<boolean>(false);

  const handleContinue = () => {
    if (selected === "create") {
      setShowOwnBroker(true);
    } else if (selected === "iotnet") {
      setShowIotnet(true);
    } else if (selected === "custom") {
      setShowExternal(true);
    } else {
      // Handle other options or show an alert if no option is selected
      alert("Please select an option to continue.");
    }
  };

  const handleCancel = () => {
    setSelected(null);
    setShowOwnBroker(false);
    setShowIotnet(false);
    setShowExternal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="
          relative w-full max-w-4xl mx-4
          rounded-2xl overflow-hidden
          border border-gray-200
          bg-white shadow-[0_8px_40px_-10px_rgba(0,0,0,0.15)]
          transition-all p-10
        "
      >
        {/* Main content */}
        <div className="relative z-10">
          {showOwnBroker ? (
            <SetupOwnBroker />
          ) : showIotnet ? (
            <SetupIotnet />
          ) : showExternal ? (
            <SetupExternal />
          ) : (
            <SetupOption selected={selected} setSelected={setSelected} />
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end mt-10 gap-3 relative z-10">
          <button
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            onClick={handleCancel}
          >
            {showOwnBroker || showIotnet || showExternal ? "Back" : "Cancel"}
          </button>
          <button
            className={`px-6 py-2.5 rounded-lg font-semibold text-white transition ${
              selected
                ? "bg-primary-600 hover:bg-primary-700 shadow-sm"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
