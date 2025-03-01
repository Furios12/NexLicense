"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FormAccount({ onNext }: { onNext: () => void }) {
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    name: "",
    surname: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/setup/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accountInfo),
    });

    if (response.ok) {
      console.log("✅ Account salvato con successo!");
      onNext(); // Passa al prossimo step
    } else {
      console.error("❌ Errore nel salvataggio dell'account!");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Creazione Account Admin
      </h2>

      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
        <InputField label="Email" type="email" value={accountInfo.email} onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })} />
        <InputField label="Nome" type="text" value={accountInfo.name} onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })} />
        <InputField label="Cognome" type="text" value={accountInfo.surname} onChange={(e) => setAccountInfo({ ...accountInfo, surname: e.target.value })} />
        <InputField label="Username" type="text" value={accountInfo.username} onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })} />
        <InputField label="Password" type="password" value={accountInfo.password} onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })} />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-md"
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
