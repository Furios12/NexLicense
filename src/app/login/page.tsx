"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); // Reset errori

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Login riuscito!");
      router.push("/dashboard");
    } else {
      setError(data.error || "❌ Credenziali errate!");
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

      {/* CARD LOGIN */}
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
          🔐 Accedi a NexLicense
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

        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            label="Username"
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <InputField
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />

          {/* PULSANTE */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-xl text-lg font-semibold shadow-md text-white relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-10" />
            Accedi 🚀
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function InputField({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <label className="block text-gray-400 text-sm mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-blue-500 outline-none transition-shadow focus:shadow-blue-500/50"
      />
    </motion.div>
  );
}
