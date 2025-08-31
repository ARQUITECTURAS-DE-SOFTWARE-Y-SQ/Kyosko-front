"use client";
import { useState } from "react";
import BeneficiosModal from "../landing/BeneficiosCard";

export default function NumericCard() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleNumberClick = (num: string) => {
    setValue((prev) => prev + num);
  };

  const handleBackspace = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-80">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Ingresar Número
        </h2>

        {/* Input */}
        <form className="mb-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border rounded-lg p-2 text-center text-lg"
            placeholder="Escribe o usa el teclado"
          />
        </form>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[..."123456789"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(num)}
              className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-lg font-bold shadow text-black"
            >
              {num}
            </button>
          ))}

          {/* Botón de limpiar */}
          <button
            type="button"
            onClick={() => setValue("")}
            className="bg-red-200 hover:bg-red-300 p-4 rounded-xl text-lg font-bold shadow text-black"
          >
            C
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick("0")}
            className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl text-lg font-bold shadow text-black"
          >
            0
          </button>

          {/* Borrar */}
          <button
            type="button"
            onClick={handleBackspace}
            className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded-xl text-lg font-bold shadow text-black"
          >
            ⌫
          </button>
        </div>

        {/* Botón Consultar */}
        <button
          type="button"
          onClick={() => setOpen(true)} // abre el modal
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl text-lg font-bold shadow text-white"
        >
          Consultar
        </button>
      </div>

      {/* Modal de beneficios con el valor ingresado */}
      <BeneficiosModal isOpen={open} onClose={() => setOpen(false)} docUser={value} />
    </div>
  );
}
