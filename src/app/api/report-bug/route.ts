import { NextResponse } from "next/server";
import fetch from "node-fetch";
import FormData from "form-data";

export async function POST(req: Request) {
  const formData = await req.formData();
  const bugType = formData.get("bugType");
  const description = formData.get("description");
  const screenshot = formData.get("screenshot") as File | null;

  const webhookUrl = "https://discord.com/api/webhooks/1349082583849500722/5Nx2NlpY6y480EcWdD4XdlIU3oCmdHy0kaCiJk__1bs53C5mublY_r0buD_dcQGwlQK9"; //Non toccare se volete che il bug report funzioni!

  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook URL non configurato" }, { status: 500 });
  }

  const payload = {
    content: `**Tipo di Bug:** ${bugType}\n**Descrizione:** ${description}`,
  };

  const formDataToSend = new FormData();
  formDataToSend.append("payload_json", JSON.stringify(payload));
  if (screenshot) {
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    formDataToSend.append("file", buffer, screenshot.name);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Errore nell'invio del webhook");
    }

    return NextResponse.json({ message: "Bug report inviato con successo!" }, { status: 200 });
  } catch (error) {
    console.error("Errore nell'invio del bug report:", error);
    return NextResponse.json({ error: "Errore nell'invio del bug report" }, { status: 500 });
  }
}