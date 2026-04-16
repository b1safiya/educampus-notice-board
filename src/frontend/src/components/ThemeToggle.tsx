import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-ocid="theme.toggle"
      className="h-9 w-9 rounded-lg transition-smooth hover:bg-sidebar-accent"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-sidebar-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-sidebar-foreground" />
      )}
    </Button>
  );
}
