"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import StreamGrid from "@/components/StreamGrid";
import Footer from "@/components/Footer";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Detectar tema do Twitch e do sistema
    const detectTheme = () => {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

      if (prefersLight) {
        setTheme("light");
      } else if (prefersDark) {
        setTheme("dark");
      }
    };

    detectTheme();

    // Observar mudanças de tema do sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Aplicar tema ao HTML
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
  }, [theme]);

  return (
    <>
      <div className="background" />

      <div className="container">
        <Header />
        <StreamGrid />
        <Footer />
      </div>
    </>
  );
}
