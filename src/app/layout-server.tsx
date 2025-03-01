import { Metadata } from "next";
import { DatabaseProvider } from "@/app/Config/database";

export const metadata: Metadata = {
  title: "NexLicense",
  description: "Sistema di gestione licenze",
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <DatabaseProvider>
          {children}
        </DatabaseProvider>
      </body>
    </html>
  );
}
