"use client";
import React, { useContext, useEffect, useState, createContext } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
// create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// main function of Theme Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // mode state
  const [mode, setMode] = useState("");
  //   handle change function
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
  });
  //   return the theme context
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
// init useTheme to access it from anywhere
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
