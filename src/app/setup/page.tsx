"use client";
import FormDatabase from "@/app/setup/form-database";
import FormAccount from "@/app/setup/form-admin";
import { useState } from "react";

export default function Setup() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">NexLicense Beta - Setup</h1>
      {step === 1 ? (
        <FormDatabase onNext={() => setStep(2)} />
      ) : (
        <FormAccount onNext={() => setStep(3)} />
      )}
    </div>
  );
}
