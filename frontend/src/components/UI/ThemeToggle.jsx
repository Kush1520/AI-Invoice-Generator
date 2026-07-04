import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:text-gray-950 dark:hover:text-zinc-100 transition-all duration-300 flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 animate-pulse text-amber-500" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-indigo-500" />
      )}
    </button>
  );
}
