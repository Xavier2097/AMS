import { DarkModeTwoTone, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "preact/hooks";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Alternar la clase en <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <IconButton
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label="toggle dark mode"
      className="dark-mode-toggle"
      size="large"
    >
      {isDarkMode ? (
        <LightModeOutlined style={{ color: "var(--secondary-color)" }} />
      ) : (
        <DarkModeTwoTone style={{ color: "var(--secondary-color)" }} />
      )}
    </IconButton>
  );
}
