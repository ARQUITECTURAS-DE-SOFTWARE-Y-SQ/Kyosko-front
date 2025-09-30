import api from "../axios";

export interface Subsidy {
  id?: number;
  title: string;
  description: string;
  amount: number;
  owner?: {
    id: number;
    name: string;
  };
  state?: {
    id: number;
    name: string;
  };
}

export interface SubsidyDto extends Subsidy {
  message?: string;
}

export const subsidyService = {
  // Get all subsidies
  getAll: async (): Promise<Subsidy[]> => {
    const response = await api.get("/subsidio/all");
    return response.data;
  },

  // Get subsidy by ID
  getById: async (id: number): Promise<SubsidyDto> => {
    const response = await api.get(`/subsidio?id=${id}`);
    return response.data;
  },

  // Get subsidies by citizen ID
  getByCitizenId: async (citizenId: number): Promise<Subsidy[]> => {
    const response = await api.get(`/subsidio/citizen/${citizenId}`);
    return response.data;
  },

  // Create subsidy
  create: async (subsidy: Subsidy): Promise<Subsidy> => {
    const response = await api.post("/subsidio", subsidy);
    return response.data;
  },

  // Update subsidy
  update: async (subsidy: Subsidy): Promise<Subsidy> => {
    const response = await api.put("/subsidio", subsidy);
    return response.data;
  },

  // Delete subsidy
  delete: async (id: number): Promise<SubsidyDto> => {
    const response = await api.delete(`/subsidio?id=${id}`);
    return response.data;
  },
};