import { createContext, useState, useContext, useEffect } from 'react';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        console.log("Controllo aggiornamenti disponibili...");
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

export const useUpdate = () => useContext(UpdateContext);
