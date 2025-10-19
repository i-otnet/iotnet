'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { ThemeOptionButton } from '@/components/shared/themeOptionButton'
import { ThemeStorage } from '@/lib/storage/ThemeStorage'

type Theme =
  | 'black'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

export function ThemeOptions() {
  const { setTheme, theme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>('blue')
  const [selectedMode, setSelectedMode] = React.useState<
    'light' | 'dark' | 'system'
  >('system')
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted before using theme
  React.useEffect(() => {
    setMounted(true)

    // Initialize from localStorage after mounting to avoid hydration mismatch
    const savedTheme = (ThemeStorage.getPrimaryTheme() as Theme) || 'blue'
    const savedMode =
      (ThemeStorage.getPreferredMode() as 'light' | 'dark' | 'system') ||
      'system'

    setSelectedTheme(savedTheme)
    setSelectedMode(savedMode)
  }, [])

  // Initialize from current theme only after mounting
  React.useEffect(() => {
    if (mounted && theme && selectedMode !== theme) {
      setSelectedMode(theme as 'light' | 'dark' | 'system')
    }
  }, [mounted, theme, selectedMode])

  React.useEffect(() => {
    if (mounted) {
      // Update CSS variables when theme changes
      document.documentElement.style.setProperty(
        '--theme-primary-color',
        `var(--primary-${selectedTheme})`
      )
      document.documentElement.style.setProperty(
        '--theme-primary-color-foreground',
        `var(--primary-${selectedTheme}-foreground)`
      )
      // Save to localStorage
      ThemeStorage.setPrimaryTheme(selectedTheme)

      // Dispatch custom event for components that need to react to theme changes
      window.dispatchEvent(
        new CustomEvent('themeChanged', {
          detail: { theme: selectedTheme },
        })
      )
    }
  }, [selectedTheme, mounted])

  const handleModeChange = (mode: 'light' | 'dark' | 'system') => {
    setSelectedMode(mode)
    setTheme(mode)
    ThemeStorage.setPreferredMode(mode)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const primaryColors: { theme: Theme; label: string }[] = [
    { theme: 'black', label: selectedMode === 'dark' ? 'White' : 'Black' },
    { theme: 'red', label: 'Red' },
    { theme: 'orange', label: 'Orange' },
    { theme: 'amber', label: 'Amber' },
    { theme: 'yellow', label: 'Yellow' },
    { theme: 'lime', label: 'Lime' },
    { theme: 'green', label: 'Green' },
    { theme: 'emerald', label: 'Emerald' },
    { theme: 'teal', label: 'Teal' },
    { theme: 'cyan', label: 'Cyan' },
    { theme: 'sky', label: 'Sky' },
    { theme: 'blue', label: 'Blue' },
    { theme: 'indigo', label: 'Indigo' },
    { theme: 'violet', label: 'Violet' },
    { theme: 'purple', label: 'Purple' },
    { theme: 'fuchsia', label: 'Fuchsia' },
    { theme: 'pink', label: 'Pink' },
    { theme: 'rose', label: 'Rose' },
  ]

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h4 className="font-semibold">Primary</h4>
        <div className="grid grid-cols-3 gap-2">
          {primaryColors.map((color) => (
            <ThemeOptionButton
              key={color.theme}
              isSelected={selectedTheme === color.theme}
              onClick={() => setSelectedTheme(color.theme)}
              label={color.label}
              color={`var(--primary-${color.theme})`}
              selectedColorVar={`--primary-${selectedTheme}`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <h4 className="font-semibold">Theme</h4>
        <div className="grid grid-cols-3 gap-2">
          <ThemeOptionButton
            isSelected={selectedMode === 'light'}
            onClick={() => handleModeChange('light')}
            label="Light"
            icon="☀️"
            selectedColorVar={`--primary-${selectedTheme}`}
          />
          <ThemeOptionButton
            isSelected={selectedMode === 'dark'}
            onClick={() => handleModeChange('dark')}
            label="Dark"
            icon="🌙"
            selectedColorVar={`--primary-${selectedTheme}`}
          />
          <ThemeOptionButton
            isSelected={selectedMode === 'system'}
            onClick={() => handleModeChange('system')}
            label="System"
            icon="💻"
            selectedColorVar={`--primary-${selectedTheme}`}
          />
        </div>
      </div>
    </div>
  )
}
