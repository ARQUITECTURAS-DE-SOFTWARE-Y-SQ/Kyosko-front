"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { benefitService, type Benefit } from "@/app/service/usercases/benefit.service";
import { citizenService, type Citizen } from "@/app/service/usercases/citizen.service";
import { statusService, type GenericStatus } from "@/app/service/usercases/status.service";

type AddBenefitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editBenefit?: Benefit | null;
};

export default function AddBenefitModal({ isOpen, onClose, onSuccess, editBenefit }: AddBenefitModalProps) {
  const [formData, setFormData] = useState({
    tittle: "",
    description: "",
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

      if (editBenefit) {
        setFormData({
          tittle: editBenefit.tittle,
          description: editBenefit.description,
          ownerId: editBenefit.owner?.id?.toString() || "",
          stateId: editBenefit.state?.id?.toString() || "",
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editBenefit]);

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
      const data = await statusService.getByDiscriminator("benefit");
      setStatuses(data);
    } catch (err) {
      console.error("Error loading statuses:", err);
      // If no discriminator filter works, get all
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
      tittle: "",
      description: "",
      ownerId: "",
      stateId: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.tittle || !formData.description) {
      setError("Título y descripción son obligatorios");
      return;
    }

    try {
      setLoading(true);

      const benefitData: any = {
        tittle: formData.tittle,
        description: formData.description,
      };

      if (formData.ownerId) {
        benefitData.ownerId = parseInt(formData.ownerId);
      }

      if (formData.stateId) {
        benefitData.stateId = parseInt(formData.stateId);
      }

      if (editBenefit?.id) {
        benefitData.id = editBenefit.id;
        await benefitService.update(benefitData);
      } else {
        await benefitService.create(benefitData);
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Error completo:", err);
      console.error("Response:", err.response);
      const errorMsg = err.response?.data?.message || err.message || "Error al guardar el beneficio";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editBenefit ? "Editar Beneficio" : "Agregar Nuevo Beneficio"}</DialogTitle>
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
              value={formData.tittle}
              onChange={(e) => setFormData({ ...formData, tittle: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Subsidio de vivienda"
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
              placeholder="Descripción detallada del beneficio"
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
              {loading ? "Guardando..." : editBenefit ? "Actualizar" : "Crear Beneficio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}