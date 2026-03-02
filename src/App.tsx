import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from "./pages/CarList"; 
import CarDetails from "./pages/CarDetails"; 
import SuccessPage from "./pages/SuccessPage"; 
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
