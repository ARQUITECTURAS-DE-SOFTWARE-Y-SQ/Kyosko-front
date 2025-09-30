"use client";
import { useState } from "react";
import Link from "next/link";
import CitizenGrid from "./pages/citizen/CitizenGrid";
import NumericCard from "./pages/landing/NumericCard"
import GestionPQRSModal from "./pages/PQRs/GestionPQRSModal";
export default function Home() {
  const [documento, setDocumento] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const [modalActivoGestionPQR, setModalActivoGestionPQR] = useState(false)
//<CitizenGrid />  <---- Se remueve grilld ciudadanos
  return (
     <main className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Ciudadanos</h1>
          <button
                type="button"
                onClick={() => setModalActivoGestionPQR(true)}
                className="bg-blue-200 hover:bg-blue-300 p-2 rounded-xl text-sm font-bold shadow text-black w-40 h-10"
              >
              Gestionar PQRS
          </button>
        </div>
        <Link
          href="/admin"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
        >
          Panel Admin
        </Link>
      </div>


      <NumericCard/>
    </main>
  );
}