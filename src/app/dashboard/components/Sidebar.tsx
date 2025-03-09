"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { id: "licenses", label: "Licenze", icon: "🔑" },
  { id: "settings", label: "Impostazioni", icon: "⚙️" },
  { id: "accounts", label: "Accounts", icon: "👤" },
  { id: "Info", label: "Informazioni", icon: "ℹ️" },
];

export default function Sidebar({ setSection }: { setSection: (id: string) => void }) {
  const [active, setActive] = useState("licenses");

  return (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white">
      <div className="text-center text-2xl font-bold mb-6">NexLicense</div>
      <ul>
        {menuItems.map((item) => (
          <motion.li
            key={item.id}
            className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${
              active === item.id ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActive(item.id);
              setSection(item.id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{item.icon}</span> {item.label}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
