"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminPinData from '../../../../data/AdminPin.json';

interface AdminPinData {
  pin: string;
}

const adminPinDataTyped: AdminPinData = adminPinData;

interface Account {
  id: string;
  name: string;
  email: string;
}

export default function Accounts() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/auth/list");
      if (!res.ok) throw new Error("Errore nel recupero degli account");
      const data = await res.json();
      setAccounts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async (id: string) => {
    const pin = prompt("Inserisci il PIN admin per eliminare l'account:");
    if (!pin) return;

    try {
      if (pin !== adminPinDataTyped.pin) {
        alert("PIN admin non corretto");
        return;
      }

      const res = await fetch(`/api/auth/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      if (!res.ok) throw new Error("Errore nell'eliminazione dell'account");
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      console.error("❌ Errore nell'eliminazione dell'account:", error);
      alert("Errore nell'eliminazione dell'account");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">👤 Accounts</h1>
      <p>Gestisci gli account utente.</p>
      <button
        onClick={() => router.push("/register")}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-110 text-white rounded-lg"
      >
        ➕ Crea Account
      </button>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white mb-3">Lista degli Account</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-2 border border-gray-600">ID</th>
              <th className="p-2 border border-gray-600">Nome</th>
              <th className="p-2 border border-gray-600">Email</th>
              <th className="p-2 border border-gray-600">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border border-gray-600 hover:bg-gray-700 transition">
                <td className="p-2 text-white">{account.id}</td>
                <td className="p-2 text-white">{account.name}</td>
                <td className="p-2 text-white">{account.email}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteAccount(account.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-110 text-white rounded-lg"
                  >
                    ❌ Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
