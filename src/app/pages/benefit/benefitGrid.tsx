"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GestionPQRSModal from "./Secciones/modalGenerarPqr";


export interface Item {
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

type GridWithModalProps = {
  docUser?: string;    
};

export default function GridWithModal({  docUser }: GridWithModalProps) {
  const [selected, setSelected] = useState<Item | null>(null);
  const [mostrarModalGeneracionPQR, setmostrarModalGeneracionPQR] = useState(false)
  const [idUsuario, setidUsuario] = useState(1)  

  useEffect(() => {
    setidUsuario(idUsuario) //Pendiente dar el id del usuario que deberia llegar por prop
  }, [])
  
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
            <Button variant="destructive" onClick={() => setmostrarModalGeneracionPQR(true)}>Generar PQR</Button>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancelar</Button>
            <Button onClick={() => alert(`Acción confirmada para ${selected?.name}`)}>Aceptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {mostrarModalGeneracionPQR && 
        <GestionPQRSModal  
        cerrarModal={()=>setmostrarModalGeneracionPQR(false)}
        beneficioSeleccionado={selected!}
        idUsuario = {parseInt(docUser!)}/>        
      }
      
      {/* Modal generacion pqr*/}

    </div>
  );
}
