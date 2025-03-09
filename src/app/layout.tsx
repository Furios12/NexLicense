"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
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
          {/* agg */}
          {updateAvailable && (
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black p-4 fixed top-0 left-0 right-0 text-center z-50 shadow-lg animate-bounce">
              <p className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🚀</span>
                <span className="font-semibold">
                  Una nuova versione di NexLicense ({latestVersion}) è disponibile!
                </span>
                <button
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
                  onClick={() =>
                    router.push("https://github.com/Furios12/NexLicense/releases")
                  }
                >
                  Aggiorna Ora
                </button>
              </p>
            </div>
          )}

          {/*  princ */}
          {children}
        </DatabaseProvider>
      </body>
    </html>
  );
}
