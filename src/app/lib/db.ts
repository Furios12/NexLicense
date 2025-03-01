import mysql from "mysql2/promise";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "database.json");

// Funzione per leggere la configurazione del database
async function getDbConfig() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("❌ Errore nella lettura del file database.json");
  }
}

// Funzione per connettersi e configurare il database
export async function connectDB() {
  const config = await getDbConfig();

  try {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    console.log("✅ Connessione al database riuscita!");

    // Setup automatico del database
    await setupDatabase(connection);

    return connection;
  } catch (error) {
    console.error("❌ Errore di connessione al database:", error);
    throw error;
  }
}

// Funzione per creare le tabelle necessarie
async function setupDatabase(connection: mysql.Connection) {
  try {
    console.log("🔄 Verifica e creazione delle tabelle...");

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Tabella 'accounts' verificata/creata con successo!");

  } catch (error) {
    console.error("❌ Errore nel setup del database:", error);
    throw error;
  }
}
