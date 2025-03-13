import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx"; 
import Homepage from "./pages/Homepage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/homepage" element={<Homepage />} />{/* Updated Route */}
      
    </Routes>
  );
}

export default App;
