"use client";
import GridWithModal from "../benefit/benefitGrid";

type BeneficiosModalProps = {
  docUser: string;  
  isOpen: boolean;
  onClose: () => void;
};

export default function BeneficiosModal({ isOpen, onClose, docUser }: BeneficiosModalProps) {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Beneficios para el ususuario {docUser}
        </h2>

        <GridWithModal></GridWithModal>
      </div>
    </div>
  );
}