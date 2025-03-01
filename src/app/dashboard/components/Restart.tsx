"use client";
import { useState } from "react";

export default function Restart() {
  const [message, setMessage] = useState("");

  async function handleRestart() {
    setMessage("Riavvio in corso...");
    await fetch("/api/restart", { method: "POST" });
    setMessage("🔄 Riavvio completato!");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">🔄 Riavvia</h1>
      <button
        onClick={handleRestart}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
      >
        🔄 Riavvia sistema
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
