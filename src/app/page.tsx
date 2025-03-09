"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dbExists, setDbExists] = useState<boolean | null>(null);

  useEffect(() => {
    checkDatabaseFile();
    let interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function checkDatabaseFile() {
    try {
      const res = await fetch("/api/check-db");
      const data = await res.json();
      setDbExists(data.exists);
    } catch (error) {
      console.error("Errore nel controllo del database:", error);
      setDbExists(false);
    }
  }

  useEffect(() => {
    if (!loading && dbExists !== null) {
      if (dbExists) {
        router.push("/login");
      }
    }
  }, [loading, dbExists, router]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center w-full max-w-md p-6 bg-gray-900/90 rounded-lg shadow-2xl border border-gray-800"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <Image
            src="/nex.svg"
            alt="NexLicense Logo"
            width={120}
            height={120}
            className="drop-shadow-glow"
          />
        </motion.div>

        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4">🛠️ NexLicense è in caricamento...</h2>
            <p className="text-gray-300 mb-4">Attendi mentre il sistema si prepara...</p>

            <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            <p className="text-sm text-gray-400 mt-2">{progress}% completato</p>
          </motion.div>
        ) : dbExists ? null : (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Benvenuto in NexLicense</h1>
            <p className="mb-6 text-gray-300">Configuriamo il tuo sistema di licenze!</p>
            
            <motion.button
              onClick={() => router.push("/setup")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-all rounded-lg shadow-lg text-lg font-semibold relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-10" />
              Inizia Setup 🚀
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
