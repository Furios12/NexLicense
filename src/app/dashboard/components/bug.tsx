"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BugReportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [bugType, setBugType] = useState("");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("bugType", bugType);
    formData.append("description", description);
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    try {
      await fetch("/api/report-bug", {
        method: "POST",
        body: formData,
      });
      alert("Bug report inviato con successo!");
      onClose();
    } catch (error) {
      console.error("Errore nell'invio del bug report:", error);
      alert("Errore nell'invio del bug report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-gray-900 p-6 rounded-lg shadow-xl text-white w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4">Segnala un Bug</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Tipo di Bug</label>
            <input
              type="text"
              value={bugType}
              onChange={(e) => setBugType(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 outline-none transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Descrizione</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 outline-none transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Screenshot (opzionale)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files ? e.target.files[0] : null)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 outline-none transition-all duration-300"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Invio..." : "Invia"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}