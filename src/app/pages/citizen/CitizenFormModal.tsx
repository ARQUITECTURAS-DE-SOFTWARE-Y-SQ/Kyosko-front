"use client";

import { useState, useEffect } from "react";
import { Citizen } from "../../service/usercases/citizen.service";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (citizen: Partial<Citizen>) => Promise<void>;
  editingCitizen: Citizen | null;
};

export default function CitizenFormModal({ open, onClose, onSave, editingCitizen }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCitizen) {
      setName(editingCitizen.name);
    } else {
      setName("");
    }
  }, [editingCitizen]);

  const handleSubmit = async () => {
    await onSave(editingCitizen ? { ...editingCitizen, name } : { name });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingCitizen ? "Editar ciudadano" : "Crear ciudadano"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {editingCitizen ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
