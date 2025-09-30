import api from "../axios";

export interface Benefit {
  id?: number;
  tittle: string;
  description: string;
  owner?: {
    id: number;
    name: string;
  };
  state?: {
    id: number;
    name: string;
  };
}

export interface BenefitDto extends Benefit {
  message?: string;
}

export const benefitService = {
  // Get all benefits
  getAll: async (): Promise<Benefit[]> => {
    const response = await api.get("/benefit/all");
    return response.data;
  },

  // Get benefit by ID
  getById: async (id: number): Promise<BenefitDto> => {
    const response = await api.get(`/benefit?id=${id}`);
    return response.data;
  },

  // Get benefits by citizen ID
  getByCitizenId: async (citizenId: number): Promise<Benefit[]> => {
    const response = await api.get(`/benefit/citizen/${citizenId}`);
    return response.data;
  },

  // Get benefits by PQR ID
  getByPqrId: async (pqrId: number): Promise<Benefit[]> => {
    const response = await api.get(`/benefit/pqr/${pqrId}`);
    return response.data;
  },

  // Create benefit
  create: async (benefit: Benefit): Promise<Benefit> => {
    const response = await api.post("/benefit", benefit);
    return response.data;
  },

  // Update benefit
  update: async (benefit: Benefit): Promise<Benefit> => {
    const response = await api.put("/benefit", benefit);
    return response.data;
  },

  // Delete benefit
  delete: async (id: number): Promise<BenefitDto> => {
    const response = await api.delete(`/benefit?id=${id}`);
    return response.data;
  },

  // Add PQR to benefit
  addPqrToBenefit: async (benefitId: number, pqrId: number): Promise<Benefit> => {
    const response = await api.post(`/benefit/${benefitId}/pqr/${pqrId}`);
    return response.data;
  },
};