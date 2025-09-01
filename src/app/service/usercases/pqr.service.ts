import api from "../axios";

export type TPqrs = {
  id: number;
  description: string;
  handler?: string;
  state?: string;
  idBeneficio?: number;
  idUsuario?: number;
};

export async function fetchPQR(): Promise<TPqrs[]> {
  const { data } = await api.get<TPqrs[]>("/peticionesQuejasReclamos/pqr/all");
  return data;
}

export async function createPQR(pqr: Omit<TPqrs, "id">) {
  const { data } = await api.post<TPqrs>("/peticionesQuejasReclamos/pqr", pqr);
  return data;
}

export async function updatePQR(pqr: TPqrs) {
  const { data } = await api.put<TPqrs>("/peticionesQuejasReclamos/pqr", pqr);
  return data;
}
