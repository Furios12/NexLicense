"use client";
import { useState } from "react";

export default function Settings() {
  const [checkingForUpdates, setCheckingForUpdates] = useState(false);

  const handleCheckForUpdates = async () => {
    setCheckingForUpdates(true);
    try {
      const response = await fetch("/api/check-update");
      const data = await response.json();
      if (data.updateAvailable) {
        alert(`Una nuova versione (${data.latestVersion}) è disponibile!`);
      } else {
        alert("Nessun aggiornamento disponibile.");
      }
    } catch (error) {
      console.error("Errore nel controllo degli aggiornamenti:", error);
      alert("Errore nel controllo degli aggiornamenti.");
    } finally {
      setCheckingForUpdates(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">⚙️ Impostazioni</h1>
      <p>Modifica lingua e controlla aggiornamenti.</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Lingua</h2>
        <select className="p-2 bg-gray-700 text-white rounded-lg" disabled>
          <option value="it">Italiano (in arrivo...)</option>
          <option value="en">English (in arrivo...)</option>
        </select>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Controlla aggiornamenti</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={handleCheckForUpdates}
          disabled={checkingForUpdates}
        >
          {checkingForUpdates ? "Controllo in corso..." : "Controlla aggiornamenti"}
        </button>
      </div>
    </div>
  );
}
