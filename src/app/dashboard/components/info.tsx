"use client";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-lg shadow-2xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Informazioni sullo Sviluppatore
      </motion.h2>
      <motion.p
        className="mb-6 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Questo sistema di licenze è stato sviluppato da Furios. È progettato per gestire e verificare le licenze software in modo sicuro ed efficiente.
      </motion.p>
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Come Funziona il Sistema di Licenze
      </motion.h2>
      <motion.p
        className="mb-4 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Il sistema di licenze NexLicense Beta consente di:
      </motion.p>
      <motion.ul
        className="list-disc list-inside mb-6 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <li>Creare nuove licenze per gli utenti.</li>
        <li>Verificare la validità delle licenze esistenti.</li>
        <li>Aggiornare le informazioni delle licenze.</li>
        <li>Eliminare licenze non più necessarie.</li>
      </motion.ul>
      <motion.p
        className="text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        Ogni licenza è associata a un utente specifico e ha una data di scadenza. Il sistema utilizza un database per memorizzare le informazioni sulle licenze e garantisce che solo le licenze valide possano essere utilizzate.
      </motion.p>
    </motion.div>
  );
}