"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FormDatabase({ onNext }: { onNext: () => void }) {
  const [dbInfo, setDbInfo] = useState({
    host: "",
    user: "",
    password: "",
    database: "",
  });

  // Funzione per salvare i dati in database.json
  const saveDatabaseConfig = async () => {
    try {
      const response = await fetch("/api/save-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbInfo),
      });

      if (response.ok) {
        console.log("✅ Configurazione salvata con successo!");
        onNext();
      } else {
        console.error("❌ Errore nel salvataggio della configurazione!");
      }
    } catch (error) {
      console.error("❌ Errore di rete:", error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={(e) => {
        e.preventDefault();
        saveDatabaseConfig();
      }}
      className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Configurazione Database
      </h2>

      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
        <InputField label="IP del Database" type="text" value={dbInfo.host} onChange={(e) => setDbInfo({ ...dbInfo, host: e.target.value })} />
        <InputField label="Nome Utente" type="text" value={dbInfo.user} onChange={(e) => setDbInfo({ ...dbInfo, user: e.target.value })} />
        <InputField label="Nome Database" type="text" value={dbInfo.database} onChange={(e) => setDbInfo({ ...dbInfo, database: e.target.value })} />
        <InputField label="Password Database" type="password" value={dbInfo.password} onChange={(e) => setDbInfo({ ...dbInfo, password: e.target.value })} />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Avanti ➡️
      </motion.button>
    </motion.form>
  );
}

function InputField({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm mb-2">{label}</label>
      <input type={type} value={value} onChange={onChange} className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none transition-all duration-300" />
    </div>
  );
}
