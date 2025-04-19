"use client";

import React, { createContext, useContext } from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeContext = createContext<ReturnType<typeof useTheme> | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const themeHook = useTheme();
  const { mounted } = themeHook;

  // Avoid rendering with default theme to prevent flash
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={themeHook}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 