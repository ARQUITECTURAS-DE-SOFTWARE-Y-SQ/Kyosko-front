"use client";

import GridWithModal from "../benefit/benefitGrid";

export default function AdminBenefits() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Administración de Beneficios</h1>
          <p className="text-gray-600">Gestiona todos los beneficios del sistema</p>
        </div>

        <GridWithModal allowAdd={true} />
      </div>
    </div>
  );
}