import axiosClient from "./AxiosClient";
import { Booking, BookingRequest } from "../types";

export const createBooking = async (data: BookingRequest): Promise<Booking> => {
  const res = await axiosClient.post<Booking>("/bookings", data);
  return res.data;
};

export const checkAvailability = async (
  carId: number,
  startDate: string,
  endDate: string
): Promise<boolean> => {
  const res = await axiosClient.get<boolean>("/bookings/availability", {
    params: { carId, startDate, endDate },
  });
  return res.data;
};


export const getAllCarbookings = async (
  carId: number
): Promise<Booking[]> => {
  const res = await axiosClient.get<Booking[]>("/bookings/cars/" + carId);
  return res.data;
};

export const cancelBooking = async (id: number): Promise<void> => { 
    await axiosClient.delete(`/bookings/${id}`);
 };