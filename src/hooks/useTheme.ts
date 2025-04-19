import { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "@/data/theme";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const selectedTheme = newTheme === "light" ? lightTheme : darkTheme;
    
    // Update class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update CSS variables
    document.documentElement.style.setProperty("--background", selectedTheme.background);
    document.documentElement.style.setProperty("--foreground", selectedTheme.text);
    document.documentElement.style.setProperty("--primary", selectedTheme.primary);
    document.documentElement.style.setProperty("--primary-foreground", "#ffffff");
    document.documentElement.style.setProperty("--accent", selectedTheme.accent);
    document.documentElement.style.setProperty("--accent-foreground", "#ffffff");
    document.documentElement.style.setProperty("--card", selectedTheme.card);
    document.documentElement.style.setProperty("--card-foreground", selectedTheme.text);
    document.documentElement.style.setProperty("--border", selectedTheme.border);
  };

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return { theme, toggleTheme, mounted };
} 