"use client";
import { useRouter } from "next/navigation";

export default function Accounts() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">👤 Accounts</h1>
      <p>Gestisci gli account utente.</p>
      <button
        onClick={() => router.push("/register")}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        ➕ Crea Account
      </button>
    </div>
  );
}
