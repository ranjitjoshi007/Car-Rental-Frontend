import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCarById } from "../api/CarApi";
import { checkAvailability, createBooking, getAllCarbookings,cancelBooking } from "../api/BookingApi";
import { Booking, Car } from "../types";

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const carId = Number(id);
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [existingBookings, setExistingBookings] = useState<Booking[] >([]);
  const [checking, setChecking] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!carId) return;
    getCarById(carId).then(setCar).catch(() => setError("Car not found"));
  }, [carId]);

  const handleCheck = async () => {
    if (!startDate || !endDate) {
      setError("Please select start and end time");
      return;
    }
    setError(null);
    setChecking(true);
    try {
      const isAvailable = await checkAvailability(carId, startDate, endDate);
      setAvailable(isAvailable);
    } catch {
      setError("Failed to check availability");
    } finally {
      setChecking(false);
    }
  };

   const cancelCarBooking = async (bookingId: number) => {
  
    try {
      await cancelBooking(bookingId);
      getAllCarbookings(carId).then(setExistingBookings).catch(() => setError("Failed to load existing bookings"));
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setChecking(false);
    }
  };
useEffect(() => {
  if (!carId) return;
   getAllCarbookings(carId).then(setExistingBookings).catch(() => setError("Failed to load existing bookings"));
    // setExistingBookings(bookings);
    
}, [carId]);
  const handleBook = async () => {
    if (!customerName || !startDate || !endDate) {
      setError("Please fill all fields");
      return;
    }
    setError(null);
    setBooking(true);
    try {
      await createBooking({
        carId,
        customerName,
        startDate,
        endDate,
      });
      navigate("/success");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to create booking");
    } finally {
      setBooking(false);
    }
  };

  if (!car) return <p>Loading car...</p>;

  return (
    <div style={{ padding: "20px" , display: "flex", gap: "200px"}}>
    <div style={{ padding: "20px" }}>
      <h2>
        {car.make} {car.model}
      </h2>
      <p>Year: {car.year}</p>
      <p>Type: {car.type}</p>
      <p>€{car.pricePerHour}/hour</p>

      <div style={{ marginTop: "20px", maxWidth: "400px" }}>
        <h3>Create Booking</h3>

        <input
          type="text"
          placeholder="Your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <label>Start time</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <label>End time</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button onClick={handleCheck} disabled={checking}>
          {checking ? "Checking..." : "Check Availability"}
        </button>

        {available === true && (
          <p style={{ color: "green" }}>Car is available for this time range.</p>
        )}
        {available === false && (
          <p style={{ color: "red" }}>Car is NOT available for this time range.</p>
        )}

        <button
          onClick={handleBook}
          disabled={!available || booking}
          style={{ marginTop: "10px" }}
        >
          {booking ? "Booking..." : "Confirm Booking"}
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
    <div style={{ marginTop: "40px" }}>
      <h3>Existing Bookings for this Car</h3>
      {existingBookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{b.customerName}</strong></p>  
          <p>Start: {b.startDate}</p>
          <p>End: {b.endDate}</p>
          <p>Cost: €{b.totalPrice}</p>
          <button onClick={() => cancelCarBooking(b.id)}> Cancel Booking </button>
          </div>
        ))
        }
    </div>
    </div>
  );
};

export default CarDetails;
