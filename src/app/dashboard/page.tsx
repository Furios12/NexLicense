"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Licenses from "./components/Licenses";
import Settings from "./components/Settings";
import Accounts from "./components/Accounts";
import Info from "./components/info";

export default function Dashboard() {
  const [section, setSection] = useState("licenses");
  const [user, setUser] = useState<{ name: string; email: string; username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (!res.ok) {
          router.push("/login"); 
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Errore nel recupero utente:", error);
        router.push("/login");
      }
    }

    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="loader"></div>
      </div>
    );
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex">
      <Sidebar setSection={setSection} />
      <div className="flex-1 p-10 bg-gray-900 text-white">
        {section === "licenses" && <Licenses />}
        {section === "settings" && <Settings />}
        {section === "accounts" && <Accounts />}
        {section === "Info" && <Info />}
      </div>
    </div>
  );
}
