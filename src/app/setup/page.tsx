"use client";
import FormDatabase from "@/app/setup/form-database";
import FormAccount from "@/app/setup/form-admin";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Setup() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    async function checkDatabaseFile() {
      try {
        const res = await fetch("/api/check-db");
        const data = await res.json();
        if (data.exists) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Errore nel controllo del database:", error);
      }
    }

    checkDatabaseFile();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">NexLicense - Setup</h1>
      {step === 1 ? (
        <FormDatabase onNext={() => setStep(2)} />
      ) : (
        <FormAccount onNext={() => setStep(3)} />
      )}
    </div>
  );
}
