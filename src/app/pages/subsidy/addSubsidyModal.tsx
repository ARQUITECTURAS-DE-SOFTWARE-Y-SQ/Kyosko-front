"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { subsidyService, type Subsidy } from "@/app/service/usercases/subsidy.service";
import { citizenService, type Citizen } from "@/app/service/usercases/citizen.service";
import { statusService, type GenericStatus } from "@/app/service/usercases/status.service";

type AddSubsidyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editSubsidy?: Subsidy | null;
};

export default function AddSubsidyModal({ isOpen, onClose, onSuccess, editSubsidy }: AddSubsidyModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    ownerId: "",
    stateId: "",
  });
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [statuses, setStatuses] = useState<GenericStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadCitizens();
      loadStatuses();

      if (editSubsidy) {
        setFormData({
          title: editSubsidy.title,
          description: editSubsidy.description,
          amount: editSubsidy.amount.toString(),
          ownerId: editSubsidy.owner?.id?.toString() || "",
          stateId: editSubsidy.state?.id?.toString() || "",
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editSubsidy]);

  const loadCitizens = async () => {
    try {
      const data = await citizenService.getAll();
      setCitizens(data);
    } catch (err) {
      console.error("Error loading citizens:", err);
    }
  };

  const loadStatuses = async () => {
    try {
      const data = await statusService.getByDiscriminator("subsidy");
      setStatuses(data);
    } catch (err) {
      console.error("Error loading statuses:", err);
      try {
        const allStatuses = await statusService.getAll();
        setStatuses(allStatuses);
      } catch (e) {
        console.error("Error loading all statuses:", e);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      amount: "",
      ownerId: "",
      stateId: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.description || !formData.amount) {
      setError("Título, descripción y monto son obligatorios");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("El monto debe ser un número positivo");
      return;
    }

    try {
      setLoading(true);

      const subsidyData: any = {
        title: formData.title,
        description: formData.description,
        amount: amount,
      };

      if (formData.ownerId) {
        subsidyData.owner = { id: parseInt(formData.ownerId) };
      }

      if (formData.stateId) {
        subsidyData.state = { id: parseInt(formData.stateId) };
      }

      if (editSubsidy?.id) {
        subsidyData.id = editSubsidy.id;
        await subsidyService.update(subsidyData);
      } else {
        await subsidyService.create(subsidyData);
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Error completo:", err);
      console.error("Response:", err.response);
      const errorMsg = err.response?.data?.message || err.message || "Error al guardar el subsidio";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editSubsidy ? "Editar Subsidio" : "Agregar Nuevo Subsidio"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Subsidio familiar"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Descripción detallada del subsidio"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Monto <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ciudadano (Propietario)
              </label>
              <select
                value={formData.ownerId}
                onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar --</option>
                {citizens.map((citizen) => (
                  <option key={citizen.id} value={citizen.id}>
                    {citizen.name} (ID: {citizen.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Estado
              </label>
              <select
                value={formData.stateId}
                onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar --</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : editSubsidy ? "Actualizar" : "Crear Subsidio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}