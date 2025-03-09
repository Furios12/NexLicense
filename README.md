# 🚀 NexLicense - Sistema di Gestione Licenze  

NexLicense è un sistema avanzato per la gestione delle licenze software, progettato per offrire un controllo sicuro e centralizzato delle licenze con un'interfaccia moderna e intuitiva.  

## 🛠️ Funzionalità  

✅ **Gestione Licenze**: Crea, visualizza ed elimina licenze dalla dashboard.  
✅ **Gestione Utenti**: Aggiungi e rimuovi account amministratori.  
✅ **Impostazioni Avanzate**: Configura lingua, aggiornamenti e preferenze.  
✅ **Sicurezza**: Autenticazione protetta e gestione sicura delle licenze.  
✅ **Sistema di Setup**: Configurazione automatica del database e account admin.  
✅ **Interfaccia Moderna**: Animazioni fluide e design accattivante.  
✅ **Riavvio Diretto**: Possibilità di riavviare il sistema dalla dashboard.  

---

## 📌 Requisiti  

- **Node.js 18+**  
- **NPM / Yarn / PNPM**  
- **Server MySQL** (il database viene configurato automaticamente)  

---

## 🏗️ Installazione  

### 1️⃣ **Clona il repository**  

```bash
git clone https://github.com/Furios12/NexLicense.git
cd NexLicense
```

### 2️⃣ **Installa le dipendenze**

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3️⃣ **Configura la JWT Secret**

Apri il file `.env` e modifica la chiave `JWT_SECRET` con una chiave sicura e complessa. Puoi generare una chiave utilizzando un generatore di chiavi sicure online.

```properties
JWT_SECRET=la-tua-chiave-segreta-sicura
Cambia anche la key di emergenza nella api: (1. src/app/api/auth/login/route.ts:26 2. src/app/api/auth/user/route.ts:11)
```

### 4️⃣ **Avvia il Sistema**
```bash
npm run start (Consigliato)
# o
yarn start
# o
pnpm start
```
Dopo aver avviato il sistema apparirà un caricamento e il setup! dopo aver settato il sistema partirà automaticamente!

