"use client";
import { useState } from "react";
import CitizenGrid from "./pages/citizen/CitizenGrid";

export default function Home() {
  const [documento, setDocumento] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
     <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ciudadanos</h1>
      <CitizenGrid />
    </main>
  );
}