import { useEffect, useState } from "react";

const THEME_LOCAL_STORAGE_KEY = "klipix-theme";

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
        return saved === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, isDark ? "dark" : "light");
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return { isDark, toggleTheme };
}

// Initialize theme on app load
export function initializeTheme() {
    const saved = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    const isDark = saved === "dark" || (!saved && true); // default to dark

    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}
