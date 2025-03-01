import { NextResponse } from "next/server";
import { exec } from "child_process";
import os from "os";

export async function POST() {
  const platform = os.platform();

  let restartCommand = "";

  if (platform === "win32") {
    // Windows: chiude il processo Node.js e lo riavvia (assumendo avvio con npm)
    restartCommand = `taskkill /F /IM node.exe && timeout /t 3 && npm run start`;
  } else {
    // Linux/macOS: prova con PM2, altrimenti usa kill
    restartCommand = `pm2 restart next || (kill -9 $(lsof -t -i:3000) && npm run start &)`;
  }

  exec(restartCommand, (error) => {
    if (error) {
      console.error("Errore nel riavvio:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  });

  return NextResponse.json({ success: true });
}
