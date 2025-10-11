export const ThemeStorage = {
  getPrimaryTheme: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("selected-primary-theme");
  },
  setPrimaryTheme: (theme: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("selected-primary-theme", theme);
  },
  getPreferredMode: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("selected-mode");
  },
  setPreferredMode: (mode: "light" | "dark" | "system") => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("selected-mode", mode);
  },
};