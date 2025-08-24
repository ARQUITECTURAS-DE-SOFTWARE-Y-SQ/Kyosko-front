"use client";
import { useState } from "react";

export default function Home() {
  const [documento, setDocumento] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          Ingresar Documento
        </h2>
        <input
          type="text"
          placeholder="Número de documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
            <h3 className="text-xl font-semibold mb-4">Documento ingresado</h3>
            <p className="text-gray-600 mb-6">{documento}</p>
            <button
              onClick={() => setOpenModal(false)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}