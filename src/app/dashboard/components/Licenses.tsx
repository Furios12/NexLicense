"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface License {
  id: string;
  user: string;
  type: string;
  expiration: string;
}

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    type: "",
    expiration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const res = await fetch("/api/licenses");
      if (!res.ok) throw new Error("Errore nel recupero delle licenze");
      const data = await res.json();
      setLicenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/licenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Errore nell'aggiunta della licenza");
      setFormData({ user: "", type: "", expiration: "" });
      setIsFormOpen(false);
      fetchLicenses();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/licenses/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Errore nell'eliminazione della licenza");
      fetchLicenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4 sm:mb-0">Lista Licenze</h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-110 text-white py-2 px-6 rounded shadow duration-300"
        >
          {isFormOpen ? "Chiudi" : "Aggiungi Licenza"}
        </button>
      </div>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
        >
          <h3 className="text-xl font-medium text-white mb-4">Nuova Licenza</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-gray-200 mb-1">Utente</label>
              <input
                type="text"
                name="user"
                id="user"
                value={formData.user}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-gray-200 mb-1">Tipo</label>
              <input
                type="text"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="expiration" className="block text-gray-200 mb-1">Scadenza</label>
              <input
                type="date"
                name="expiration"
                id="expiration"
                value={formData.expiration}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 transition-transform transform hover:scale-110 text-white py-2 px-4 rounded duration-300"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-110 text-white py-2 px-4 rounded duration-300"
              >
                {isSubmitting ? "Salvataggio..." : "Salva Licenza"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-2 border border-gray-600">ID</th>
              <th className="p-2 border border-gray-600">Utente</th>
              <th className="p-2 border border-gray-600">Tipo</th>
              <th className="p-2 border border-gray-600">Scadenza</th>
              <th className="p-2 border border-gray-600">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license) => (
              <tr key={license.id} className="border border-gray-600 hover:bg-gray-700 transition">
                <td className="p-2">{license.id}</td>
                <td className="p-2">{license.user}</td>
                <td className="p-2">{license.type}</td>
                <td className="p-2">{new Date(license.expiration).toLocaleDateString()}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(license.id)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded shadow-md transform transition-transform hover:scale-110">
                    Elimina
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