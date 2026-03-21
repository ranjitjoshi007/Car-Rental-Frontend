import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}>
        Car Rental Demo
      </Link>
    </nav>
  );
}
