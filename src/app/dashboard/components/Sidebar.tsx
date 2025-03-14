"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { label } from "framer-motion/client";

const menuItems = [
  { id: "licenses", label: "Licenze", icon: "🔑" },
  { id: "settings", label: "Impostazioni", icon: "⚙️" },
  { id: "accounts", label: "Accounts", icon: "👤" },
  { id: "Info", label: "Informazioni", icon: "ℹ️" },
  { id: "Bug", label: "Segnala un Bug", icon: "🐞" },
];

export default function Sidebar({ setSection }: { setSection: (id: string) => void }) {
  const [active, setActive] = useState("licenses");

  return (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white">
      <div className="text-center text-2xl font-bold mb-6">NexLicense Beta</div>
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
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.95, opacity: 1 }}
            animate={{ color: active === item.id ? "#ffffff" : "#cccccc" }}
            transition={{ duration: 0.3 }}
          >
            <span>{item.icon}</span> {item.label}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
