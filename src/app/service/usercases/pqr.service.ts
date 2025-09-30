import api from "../axios";

export type TPqrs = {
  id: number;
  description: string;
  handler?: {
    id: number;
    name: string;
  };
  state?: {
    id: number;
    name: string;
  };
};

export type TPqrsDto = {
  id?: number;
  description: string;
  handlerId?: number;
  stateId?: number;
  idBeneficio?: number;
  idUsuario?: number;
};

export const pqrService = {
  // Get all PQRs
  getAll: async (): Promise<TPqrs[]> => {
    const response = await api.get("/peticionesQuejasReclamos/pqr/all");
    return response.data;
  },

  // Create PQR
  create: async (pqr: TPqrsDto): Promise<TPqrs> => {
    const response = await api.post("/peticionesQuejasReclamos/pqr", pqr);
    return response.data;
  },

  // Update PQR
  update: async (pqr: TPqrsDto): Promise<TPqrs> => {
    const response = await api.put("/peticionesQuejasReclamos/pqr", pqr);
    return response.data;
  },
};

// Legacy exports for backward compatibility
export async function fetchPQR(): Promise<TPqrs[]> {
  return pqrService.getAll();
}

export async function createPQR(pqr: TPqrsDto) {
  return pqrService.create(pqr);
}

export async function updatePQR(pqr: TPqrsDto) {
  return pqrService.update(pqr);
}
