import api from "../axios";

export type Citizen = {
  id: number;
  name: string;
};

export interface CitizenDto extends Citizen {
  message?: string;
}

export const citizenService = {
  // Get all citizens
  getAll: async (): Promise<Citizen[]> => {
    const response = await api.get("/citizen/all");
    return response.data;
  },

  // Get citizen by ID
  getById: async (id: number): Promise<CitizenDto> => {
    const response = await api.get(`/citizen?id=${id}`);
    return response.data;
  },

  // Create citizen
  create: async (citizen: Omit<Citizen, "id">): Promise<Citizen> => {
    const response = await api.post("/citizen", citizen);
    return response.data;
  },

  // Update citizen
  update: async (citizen: Citizen): Promise<Citizen> => {
    const response = await api.put("/citizen", citizen);
    return response.data;
  },

  // Delete citizen
  delete: async (id: number): Promise<void> => {
    await api.delete(`/citizen?id=${id}`);
  },
};

// Legacy exports for backward compatibility
export async function fetchCitizens(): Promise<Citizen[]> {
  return citizenService.getAll();
}

export async function createCitizen(citizen: Omit<Citizen, "id">) {
  return citizenService.create(citizen);
}

export async function updateCitizen(citizen: Citizen) {
  return citizenService.update(citizen);
}

export async function deleteCitizen(id: number) {
  return citizenService.delete(id);
}