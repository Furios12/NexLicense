import { useUpdate } from '../../../../contexts/UpdateContext';

const UpdateNotification = () => {
  const { updateInfo } = useUpdate();

  if (!updateInfo) return null;

  return (
    <div className="update-notification">
      <h2>Nuovo aggiornamento disponibile!</h2>
      <p>Versione: {updateInfo.latestVersion}</p>
      <p>Nota: {updateInfo.releaseNotes}</p>
      <a href={updateInfo.downloadLink} target="_blank" rel="noopener noreferrer">
        Scarica l'aggiornamento
      </a>
    </div>
  );
};

export default UpdateNotification;
