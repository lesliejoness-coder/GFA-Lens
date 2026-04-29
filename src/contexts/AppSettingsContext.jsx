import { createContext, useContext, useState, useEffect } from "react";

const AppSettingsContext = createContext(null);

export function useAppSettings() {
  return useContext(AppSettingsContext);
}

export function AppSettingsProvider({ children }) {
  const [langue, setLangue] = useState(() => localStorage.getItem("gfalens_lang") || "fr");
  const [theme, setTheme]   = useState(() => localStorage.getItem("gfalens_theme") || "system");

  // ── Applique le thème sur <html> dès que `theme` change ──
  useEffect(() => {
    const root = document.documentElement;

    const applyDark = (dark) => {
      if (dark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "light") {
      applyDark(false);
      return;
    }

    if (theme === "dark") {
      applyDark(true);
      return;
    }

    // "system" : écoute les préférences OS
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    applyDark(mq.matches);
    const handler = (e) => applyDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  // ── Persiste dans localStorage ──
  const changeLangue = (lang) => {
    setLangue(lang);
    localStorage.setItem("gfalens_lang", lang);
  };

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem("gfalens_theme", t);
  };

  return (
    <AppSettingsContext.Provider value={{ langue, changeLangue, theme, changeTheme }}>
      {children}
    </AppSettingsContext.Provider>
  );
}
