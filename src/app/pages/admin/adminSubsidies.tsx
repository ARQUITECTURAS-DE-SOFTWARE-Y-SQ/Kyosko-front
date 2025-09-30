"use client";

import SubsidyGrid from "../subsidy/subsidyGrid";

export default function AdminSubsidies() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Administración de Subsidios</h1>
          <p className="text-gray-600">Gestiona todos los subsidios del sistema</p>
        </div>

        <SubsidyGrid allowAdd={true} />
      </div>
    </div>
  );
}