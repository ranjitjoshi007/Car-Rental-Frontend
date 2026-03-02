export interface Car {
  id: number;
  make: string;
  model: string;
  name:string;
  year: number;
  type: string;
  pricePerHour: number;
  status: string;
  imageUrl?: string;
}

export interface Booking {
  id: number;
  customerName: string;
  car: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export interface BookingRequest {
  carId: number;
  customerName: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
}
