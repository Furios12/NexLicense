"use client"; // Aggiungi questa direttiva per renderlo un componente lato client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Usa next/navigation
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DatabaseProvider } from "@/app/Config/database";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkForUpdate() {
      const response = await fetch("/api/check-update");
      const data = await response.json();

      if (data.updateAvailable) {
        setUpdateAvailable(true);
        setLatestVersion(data.latestVersion);
      }
    }

    checkForUpdate();
  }, []);

  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DatabaseProvider>
          {/* Avviso di aggiornamento */}
          {updateAvailable && (
            <div className="bg-yellow-600 text-black p-4 fixed top-0 left-0 right-0 text-center z-50">
              <p>
                Una nuova versione di NexLicense ({latestVersion}) è disponibile!{" "}
                <button
                  className="underline"
                  onClick={() =>
                    router.push("https://github.com/Furios12/NexLicense/releases")
                  }
                >
                  Clicca qui per aggiornare
                </button>
              </p>
            </div>
          )}

          {/* Contenuto principale */}
          {children}
        </DatabaseProvider>
      </body>
    </html>
  );
}
