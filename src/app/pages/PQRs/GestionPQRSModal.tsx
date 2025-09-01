import { useEffect } from "react";
import GridWithModal from "../benefit/benefitGrid";

type GestionPQRSModal = {    
  isOpen: boolean;
  onClose: () => void;
};

export default function GestionPQRSModal({ isOpen, onClose}: GestionPQRSModal) {
  if (!isOpen) return null; 
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-400 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
        >
          ✖
        </button>

        <GridWithModal></GridWithModal>
      </div>
    </div>
  );
}