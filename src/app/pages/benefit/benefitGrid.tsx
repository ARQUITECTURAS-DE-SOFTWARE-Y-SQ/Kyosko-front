"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Item {
  id: number;
  name: string;
  description: string;
}

const data: Item[] = [
  { id: 1, name: "Producto A", description: "Descripción del producto A" },
  { id: 2, name: "Producto B", description: "Descripción del producto B" },
  { id: 3, name: "Producto C", description: "Descripción del producto C" },
];

// Definición dinámica de columnas
const columns: { name: string; key: keyof Item }[] = [
  { name: "ID", key: "id" },
  { name: "Nombre", key: "name" },
  { name: "Descripción", key: "description" },
];

export default function GridWithModal() {
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tus Beneficios disponibles</h2>

      <table className="w-full border border-gray-300 rounded-lg shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="p-2 border text-left">
                {col.name}
              </th>
            ))}
            <th className="p-2 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key as string} className="p-2 border">
                  {item[col.key]}
                </td>
              ))}
              <td className="p-2 border text-center">
                <Button variant="outline" size="sm" onClick={() => setSelected(item)}>
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalle del Registro</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="p-4 space-y-2">
              {columns.map((col) => (
                <p key={col.key as string}>
                  <span className="font-semibold">{col.name}:</span> {selected[col.key]}
                </p>
              ))}
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>Cancelar</Button>
            <Button onClick={() => alert(`Acción confirmada para ${selected?.name}`)}>Aceptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
