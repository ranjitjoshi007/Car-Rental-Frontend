import axiosClient from "./AxiosClient";
import { Car } from "../types";

export const getCars = async (): Promise<Car[]> => {
  const res = await axiosClient.get<Car[]>("/cars");
  return res.data;
};

export const getCarById = async (id: number): Promise<Car> => {
  const res = await axiosClient.get<Car>(`/cars/${id}`);
  return res.data;
};
