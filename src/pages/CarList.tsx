import { useEffect, useState } from "react";
import { getCars } from "../api/CarApi";
import { Car } from "../types";
import CarCard from "../components/CarCard";

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then(setCars)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading cars...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Cars</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
