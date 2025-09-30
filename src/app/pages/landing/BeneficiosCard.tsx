"use client";
import { useState } from "react";
import GridWithModal from "../benefit/benefitGrid";
import SubsidyGrid from "../subsidy/subsidyGrid";

type BeneficiosModalProps = {
  docUser: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function BeneficiosModal({ isOpen, onClose, docUser }: BeneficiosModalProps) {
  const [activeTab, setActiveTab] = useState<"benefits" | "subsidies">("benefits");

  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl relative max-h-[90vh] overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg z-10"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Beneficios y Subsidios para el usuario {docUser}
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setActiveTab("benefits")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "benefits"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Beneficios
          </button>
          <button
            onClick={() => setActiveTab("subsidies")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "subsidies"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Subsidios
          </button>
        </div>

        {/* Content */}
        {activeTab === "benefits" ? (
          <GridWithModal docUser={docUser} />
        ) : (
          <SubsidyGrid docUser={docUser} />
        )}
      </div>
    </div>
  );
}