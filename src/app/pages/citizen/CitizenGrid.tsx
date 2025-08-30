"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import {
  fetchCitizens,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  Citizen,
} from "../../service/usercases/citizen.service";
import CitizenFormModal from "./CitizenFormModal";
import { Button } from "@mui/material";

export default function CitizenGrid() {
  const [rows, setRows] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingCitizen, setEditingCitizen] = useState<Citizen | null>(null);

  const loadData = () => {
    setLoading(true);
    fetchCitizens()
      .then(setRows)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (citizen: Partial<Citizen>) => {
    if (citizen.id) {
      await updateCitizen(citizen as Citizen);
    } else {
      await createCitizen(citizen as Omit<Citizen, "id">);
    }
    loadData();
  };

  const handleRowDoubleClick: GridEventListener<"rowDoubleClick"> = async (
    params
  ) => {
    if (confirm(`¿Eliminar ciudadano ${params.row.name}?`)) {
      await deleteCitizen(params.row.id);
      loadData();
    }
  };

  const columns: GridColDef<Citizen>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setEditingCitizen(params.row);
            setOpenModal(true);
          }}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-bold mb-4">Gestión de Ciudadanos</h2>

      <Button
        variant="contained"
        color="primary"
        className="mb-4"
        onClick={() => {
          setEditingCitizen(null);
          setOpenModal(true);
        }}
      >
        Nuevo ciudadano
      </Button>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        onRowDoubleClick={handleRowDoubleClick}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />

      <CitizenFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editingCitizen={editingCitizen}
      />
    </div>
  );
}
