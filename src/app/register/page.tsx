"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Register() {
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    name: "",
    surname: "",
    username: "",
    password: "",
    adminPin: "", // Aggiungi il campo per il pin
  });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Verifica il pin dell'admin
    const responsePin = await fetch("/api/verificapin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: accountInfo.adminPin }),
    });

    const pinData = await responsePin.json();
    if (!pinData.valid) {
      setError("❌ Pin dell'admin errato!");
      return;
    }

    // Procedi con la registrazione se il pin è valido
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accountInfo),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Registrazione completata!");
      router.push("/login");
    } else {
      setError(data.error || "❌ Errore nella registrazione!");
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
      }}
    >
      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6"
      >
        <Image
          src="/nex.svg"
          alt="NexLicense Logo"
          width={120}
          height={120}
          className="drop-shadow-glow"
        />
      </motion.div>

      {/* CARD REGISTRAZIONE */}
      <motion.div
        className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          📝 Registra Nuovo Account Admin
        </motion.h1>

        {error && (
          <motion.p
            className="text-red-500 mb-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={accountInfo.email}
            onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
          />
          <InputField
            label="Nome"
            type="text"
            value={accountInfo.name}
            onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
          />
          <InputField
            label="Cognome"
            type="text"
            value={accountInfo.surname}
            onChange={(e) => setAccountInfo({ ...accountInfo, surname: e.target.value })}
          />
          <InputField
            label="Username"
            type="text"
            value={accountInfo.username}
            onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
          />
          <InputField
            label="Password"
            type="password"
            value={accountInfo.password}
            onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
          />
          <InputField
            label="Pin Admin"
            type="password"
            value={accountInfo.adminPin}
            onChange={(e) => setAccountInfo({ ...accountInfo, adminPin: e.target.value })}
          />

          {/* PULSANTE */}
          <motion.button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition-all p-3 rounded-xl text-lg font-semibold shadow-md text-white relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 opacity-10" />
            Registrati 🚀
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Hai già un account?{" "}
          <a href="/login" className="text-blue-400 hover:underline transition">
            Accedi qui
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div
      className="mb-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <label className="block text-gray-400 text-sm mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-green-500 outline-none transition-shadow focus:shadow-green-500/50"
      />
    </motion.div>
  );
}
