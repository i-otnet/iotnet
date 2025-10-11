import * as React from "react";

interface ThemeOptionButtonProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  color?: string; // For the circular swatch
  icon?: React.ReactNode; // For mode icons like ☀️, 🌙, 💻
  selectedColorVar?: string; // CSS variable for border color when selected
}

export function ThemeOptionButton({
  isSelected,
  onClick,
  label,
  color,
  icon,
  selectedColorVar,
}: ThemeOptionButtonProps) {
  return (
    <div
      className={`flex items-center justify-start p-2 rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer ${
        isSelected ? "border-2" : ""
      }`}
      style={{
        borderColor: isSelected && selectedColorVar ? `var(${selectedColorVar})` : undefined,
      }}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {color && (
        <span
          className="h-4 w-4 rounded-full mr-2"
          style={{
            backgroundColor: color,
          }}
        />
      )}
      {label}
    </div>
  );
}
