"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddCitizenModal from "./addCitizenModal";
import { citizenService, type Citizen } from "@/app/service/usercases/citizen.service";

export default function AdminCitizens() {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCitizen, setEditingCitizen] = useState<Citizen | null>(null);

  useEffect(() => {
    loadCitizens();
  }, []);

  const loadCitizens = async () => {
    try {
      setLoading(true);
      const data = await citizenService.getAll();
      setCitizens(data);
    } catch (error) {
      console.error("Error loading citizens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este ciudadano?")) return;

    try {
      await citizenService.delete(id);
      loadCitizens();
    } catch (error) {
      console.error("Error deleting citizen:", error);
      alert("Error al eliminar el ciudadano");
    }
  };

  const handleEdit = (citizen: Citizen) => {
    setEditingCitizen(citizen);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCitizen(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestión de Ciudadanos</h2>
        <Button onClick={() => setShowAddModal(true)}>
          + Agregar Ciudadano
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando ciudadanos...</div>
      ) : citizens.length === 0 ? (
        <div className="text-center py-8">
          <p>No hay ciudadanos registrados</p>
          <Button onClick={() => setShowAddModal(true)} className="mt-4">
            + Crear primer ciudadano
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">ID</th>
                <th className="p-2 border text-left">Nombre</th>
                <th className="p-2 border text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((citizen) => (
                <tr key={citizen.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{citizen.id}</td>
                  <td className="p-2 border">{citizen.name}</td>
                  <td className="p-2 border text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(citizen)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(citizen.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCitizenModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onSuccess={loadCitizens}
        editCitizen={editingCitizen}
      />
    </div>
  );
}