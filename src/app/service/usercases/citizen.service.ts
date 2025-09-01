import api from "../axios";

export type Citizen = {
  id: number;
  name: string;
};

export async function fetchCitizens(): Promise<Citizen[]> {
  const { data } = await api.get<Citizen[]>("/beneficio/citizen/all");
  return data;
}

export async function createCitizen(citizen: Omit<Citizen, "id">) {
  const { data } = await api.post<Citizen>("/beneficio/citizen", citizen);
  return data;
}

export async function updateCitizen(citizen: Citizen) {
  const { data } = await api.put<Citizen>("/beneficio/citizen", citizen);
  return data;
}

export async function deleteCitizen(id: number) {
  const { data } = await api.delete(`/beneficio/citizen?id=${id}`);
  return data;
}