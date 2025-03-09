"use client";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow-xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold mb-4">Informazioni sullo Sviluppatore</h2>
      <p className="mb-4">
        Questo sistema di licenze è stato sviluppato da Furios. È progettato per gestire e verificare le licenze software in modo sicuro ed efficiente.
      </p>
      <h2 className="text-2xl font-bold mb-4">Come Funziona il Sistema di Licenze</h2>
      <p>
        Il sistema di licenze NexLicense Beta consente di:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Creare nuove licenze per gli utenti.</li>
        <li>Verificare la validità delle licenze esistenti.</li>
        <li>Aggiornare le informazioni delle licenze.</li>
        <li>Eliminare licenze non più necessarie.</li>
      </ul>
      <p>
        Ogni licenza è associata a un utente specifico e ha una data di scadenza. Il sistema utilizza un database per memorizzare le informazioni sulle licenze e garantisce che solo le licenze valide possano essere utilizzate.
      </p>
    </motion.div>
  );
}