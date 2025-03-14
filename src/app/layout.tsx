"use client"; 

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DatabaseProvider } from "@/app/Config/database";
import { motion } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const checkForUpdate = async () => {
    const response = await fetch("/api/check-update");
    const data = await response.json();

    if (data.updateAvailable) {
      setUpdateAvailable(true);
      setLatestVersion(data.latestVersion);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    checkForUpdate();
  }, []);

  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DatabaseProvider>
          {updateAvailable && showPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-2xl">🚀</span>
                  <span className="font-semibold text-black">
                    Una nuova versione di NexLicense Beta ({latestVersion}) è disponibile!
                  </span>
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
                    onClick={() =>
                      router.push("https://github.com/Furios12/NexLicense/releases")
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Aggiorna Ora
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-transform transform hover:scale-105"
                    onClick={() => setShowPopup(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Chiudi
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {children}
        </DatabaseProvider>
      </body>
    </html>
  );
}
