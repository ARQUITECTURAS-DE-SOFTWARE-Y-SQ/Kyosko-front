import api from "../axios";

export interface GenericStatus {
  id?: number;
  name: string;
  description: string;
  discriminator: string;
}

export interface GenericStatusDto extends GenericStatus {
  message?: string;
}

export const statusService = {
  // Get all statuses
  getAll: async (): Promise<GenericStatus[]> => {
    const response = await api.get("/status/all");
    return response.data;
  },

  // Get status by ID
  getById: async (id: number): Promise<GenericStatusDto> => {
    const response = await api.get(`/status?id=${id}`);
    return response.data;
  },

  // Get statuses by discriminator
  getByDiscriminator: async (discriminator: string): Promise<GenericStatus[]> => {
    const response = await api.get(`/status/discriminator/${discriminator}`);
    return response.data;
  },

  // Create status
  create: async (status: GenericStatus): Promise<GenericStatus> => {
    const response = await api.post("/status", status);
    return response.data;
  },

  // Update status
  update: async (status: GenericStatus): Promise<GenericStatus> => {
    const response = await api.put("/status", status);
    return response.data;
  },

  // Delete status
  delete: async (id: number): Promise<GenericStatusDto> => {
    const response = await api.delete(`/status?id=${id}`);
    return response.data;
  },
};