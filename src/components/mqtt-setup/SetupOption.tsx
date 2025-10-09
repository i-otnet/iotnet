"use client";

import React from "react";

interface SetupOptionProps {
  selected: string | null;
  setSelected: (value: string) => void;
}

const SetupOption: React.FC<SetupOptionProps> = ({ selected, setSelected }) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {/* === Option 1: Create Your Own Broker (Recommended) === */}
      <button
        onClick={() => setSelected("create")}
        className={`
          relative rounded-xl w-full text-center p-8 transition-all duration-200
          ${
            selected === "create"
              ? "border border-primary-500 bg-primary-50 shadow-[0_4px_12px_-3px_rgba(37,99,235,0.25)]"
              : "border border-gray-200 bg-gray-50 hover:border-primary-400 hover:shadow-[0_2px_8px_-2px_rgba(37,99,235,0.15)]"
          }
        `}
      >
        <h2
          className={`text-2xl font-semibold mb-2 ${
            selected === "create" ? "text-primary-700" : "text-gray-800"
          }`}
        >
          Create your own broker
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          Set up a private MQTT broker for full control and enhanced security.
        </p>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            selected === "create"
              ? "bg-primary-100 text-primary-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          Recommended
        </span>
      </button>

      {/* === Option 2 & 3 === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Use IoTNet */}
        <button
          onClick={() => setSelected("iotnet")}
          className={`
            relative flex flex-col items-center justify-center rounded-xl p-8 text-center
            transition-all duration-200
            ${
              selected === "iotnet"
                ? "border border-primary-500 bg-primary-50 shadow-[0_4px_12px_-3px_rgba(37,99,235,0.25)]"
                : "border border-gray-200 bg-gray-50 hover:border-primary-400 hover:shadow-[0_2px_8px_-2px_rgba(37,99,235,0.15)]"
            }
          `}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
              selected === "iotnet" ? "bg-primary-600" : "bg-primary-100"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="16" fill="white" fillOpacity="0.2" />
              <path
                d="M18 10v16M10 18h16"
                stroke={selected === "iotnet" ? "#fff" : "#2563EB"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3
            className={`text-base font-semibold mb-1 ${
              selected === "iotnet" ? "text-primary-700" : "text-gray-800"
            }`}
          >
            Use IoTNet
          </h3>
          <p className="text-gray-600 text-sm leading-snug">
            Connect instantly to the default IoTNet broker — fast and hassle-free.
          </p>
        </button>

        {/* Use Your Broker */}
        <button
          onClick={() => setSelected("custom")}
          className={`
            relative flex flex-col items-center justify-center rounded-xl p-8 text-center
            transition-all duration-200
            ${
              selected === "custom"
                ? "border border-primary-500 bg-primary-50 shadow-[0_4px_12px_-3px_rgba(37,99,235,0.25)]"
                : "border border-gray-200 bg-gray-50 hover:border-primary-400 hover:shadow-[0_2px_8px_-2px_rgba(37,99,235,0.15)]"
            }
          `}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
              selected === "custom" ? "bg-primary-600" : "bg-primary-100"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="16" fill="white" fillOpacity="0.2" />
              <path
                d="M18 10v16M10 18h16"
                stroke={selected === "custom" ? "#fff" : "#2563EB"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3
            className={`text-base font-semibold mb-1 ${
              selected === "custom" ? "text-primary-700" : "text-gray-800"
            }`}
          >
            Use your existing broker
          </h3>
          <p className="text-gray-600 text-sm leading-snug">
            Connect to an external MQTT broker with your own credentials.
          </p>
        </button>
      </div>
    </div>
  );
};

export default SetupOption;
