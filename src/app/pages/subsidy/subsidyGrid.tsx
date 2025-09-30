"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddSubsidyModal from "./addSubsidyModal";
import { subsidyService, type Subsidy } from "@/app/service/usercases/subsidy.service";

export interface SubsidyItem {
  id: number;
  title: string;
  description: string;
  amount: number;
}

const columns: { name: string; key: keyof SubsidyItem }[] = [
  { name: "ID", key: "id" },
  { name: "Título", key: "title" },
  { name: "Descripción", key: "description" },
  { name: "Monto", key: "amount" },
];

type SubsidyGridProps = {
  docUser?: string;
  allowAdd?: boolean;
};

export default function SubsidyGrid({ docUser, allowAdd = false }: SubsidyGridProps) {
  const [selected, setSelected] = useState<SubsidyItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [data, setData] = useState<SubsidyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubsidies();
  }, [docUser]);

  const loadSubsidies = async () => {
    try {
      setLoading(true);
      let subsidies: Subsidy[];

      if (docUser) {
        subsidies = await subsidyService.getByCitizenId(parseInt(docUser));
      } else {
        subsidies = await subsidyService.getAll();
      }

      const mappedData: SubsidyItem[] = subsidies.map(s => ({
        id: s.id || 0,
        title: s.title,
        description: s.description,
        amount: s.amount
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error loading subsidies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este subsidio?")) return;

    try {
      await subsidyService.delete(id);
      loadSubsidies();
    } catch (error) {
      console.error("Error deleting subsidy:", error);
      alert("Error al eliminar el subsidio");
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {docUser ? "Tus Subsidios" : "Lista de Subsidios Disponibles"}
        </h2>
        {allowAdd && (
          <Button onClick={() => setShowAddModal(true)}>
            + Agregar Subsidio
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando subsidios...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-8">
          <p>{docUser ? "No tienes subsidios asignados" : "No hay subsidios disponibles"}</p>
          {allowAdd && (
            <Button onClick={() => setShowAddModal(true)} className="mt-4">
              + Crear primer subsidio
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.key as string} className="p-2 border text-left whitespace-nowrap">
                    {col.name}
                  </th>
                ))}
                <th className="p-2 border text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key as string} className={`p-2 border ${col.key === 'description' ? 'max-w-2xl' : ''}`}>
                      <div className={col.key === 'description' ? 'line-clamp-2' : ''}>
                        {col.key === "amount" ? `$${item[col.key].toLocaleString()}` : item[col.key]}
                      </div>
                    </td>
                  ))}
                  <td className="p-2 border text-center">
                    <div className="flex gap-2 justify-center whitespace-nowrap">
                      <Button variant="outline" size="sm" onClick={() => setSelected(item)}>
                        Ver Detalle
                      </Button>
                      {allowAdd && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Eliminar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddSubsidyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadSubsidies}
      />

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalle del Subsidio</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="p-4 space-y-2">
              {columns.map((col) => (
                <p key={col.key as string}>
                  <span className="font-semibold">{col.name}:</span>{" "}
                  {col.key === "amount" ? `$${selected[col.key].toLocaleString()}` : selected[col.key]}
                </p>
              ))}
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}