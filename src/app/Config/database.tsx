"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const DatabaseContext = createContext<{
  dbConfig: { host: string; name: string; password: string };
  setDbConfig: (config: { host: string; name: string; password: string }) => void;
} | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [dbConfig, setDbConfig] = useState<{ host: string; name: string; password: string }>({
    host: "",
    name: "",
    password: "",
  });

  // ✅ Carica i dati dal file JSON all'avvio
  useEffect(() => {
    fetch("/api/database")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setDbConfig(data);
        }
      });
  }, []);

  // ✅ Salva i dati nel file quando cambia lo stato
  const saveConfig = async (config: { host: string; name: string; password: string }) => {
    setDbConfig(config);
    await fetch("/api/database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
  };

  return (
    <DatabaseContext.Provider value={{ dbConfig, setDbConfig: saveConfig }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase deve essere usato dentro DatabaseProvider");
  }
  return context;
}
