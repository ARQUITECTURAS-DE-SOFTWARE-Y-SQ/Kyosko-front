"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GridWithModal from "../pages/benefit/benefitGrid";
import SubsidyGrid from "../pages/subsidy/subsidyGrid";
import AdminCitizens from "../pages/citizen/adminCitizens";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"benefits" | "subsidies" | "citizens">("benefits");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestión de beneficios, subsidios y ciudadanos</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "benefits" ? "default" : "outline"}
            onClick={() => setActiveTab("benefits")}
            className="px-6"
          >
            Beneficios
          </Button>
          <Button
            variant={activeTab === "subsidies" ? "default" : "outline"}
            onClick={() => setActiveTab("subsidies")}
            className="px-6"
          >
            Subsidios
          </Button>
          <Button
            variant={activeTab === "citizens" ? "default" : "outline"}
            onClick={() => setActiveTab("citizens")}
            className="px-6"
          >
            Ciudadanos
          </Button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === "benefits" ? (
            <GridWithModal allowAdd={true} />
          ) : activeTab === "subsidies" ? (
            <SubsidyGrid allowAdd={true} />
          ) : (
            <AdminCitizens />
          )}
        </div>
      </div>
    </div>
  );
}