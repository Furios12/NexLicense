import { createContext, useState, useContext, useEffect } from 'react';

// Contesto per l'aggiornamento
const UpdateContext = createContext();

// Provider per fornire lo stato globale sull'aggiornamento
export const UpdateProvider = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    // Funzione per verificare gli aggiornamenti
    const checkForUpdates = async () => {
      try {
        const response = await fetch('/api/check-update');
        const data = await response.json();

        if (data.updateAvailable) {
          setUpdateInfo(data);
        }
      } catch (error) {
        console.error("Errore nel controllo aggiornamenti", error);
      }
    };

    checkForUpdates();
  }, []);

  return (
    <UpdateContext.Provider value={{ updateInfo, setUpdateInfo }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Hook personalizzato per ottenere i dati di aggiornamento
export const useUpdate = () => useContext(UpdateContext);
