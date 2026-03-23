import { Link } from "react-router";
import { Car } from "../types";

interface Props {
  car: Car;
}

const CarCard: React.FC<Props> = ({ car }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",borderRadius: "8px",
        padding: "12px",
        width: "260px",
      }}
    >
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={car.model}
          style={{ width: "100%", borderRadius: "4px" }}
        />
      )}
      <h3>
        {car.name} {car.type}
      </h3>
      <p>{car.year}</p>
      <p>€{car.pricePerHour}/hour</p>
      <Link to={`/cars/${car.id}`}>Book Now</Link>
    </div>
  );
};

export default CarCard;
