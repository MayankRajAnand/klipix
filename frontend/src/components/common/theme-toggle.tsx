import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.4rem] w-[1.4rem] scale-100 transition-opacity dark:scale-0 dark:opacity-0" />
            <Moon className="absolute h-[1.4rem] w-[1.4rem] scale-0 opacity-0 transition-opacity dark:scale-100 dark:opacity-100" />
        </Button>
    );
}

