"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { citizenService, type Citizen } from "@/app/service/usercases/citizen.service";

type AddCitizenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editCitizen?: Citizen | null;
};

export default function AddCitizenModal({ isOpen, onClose, onSuccess, editCitizen }: AddCitizenModalProps) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editCitizen) {
        setFormData({
          name: editCitizen.name,
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editCitizen]);

  const resetForm = () => {
    setFormData({
      name: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      setLoading(true);

      if (editCitizen?.id) {
        await citizenService.update({
          id: editCitizen.id,
          name: formData.name,
        });
      } else {
        await citizenService.create({
          name: formData.name,
        });
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Error completo:", err);
      console.error("Response:", err.response);
      const errorMsg = err.response?.data?.message || err.message || "Error al guardar el ciudadano";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editCitizen ? "Editar Ciudadano" : "Agregar Nuevo Ciudadano"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : editCitizen ? "Actualizar" : "Crear Ciudadano"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}