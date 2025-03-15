import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx"; 
import Homepage from "./pages/Homepage.tsx";
import Verification from "./pages/Verification.tsx";
import EditDarah from "./pages/EditDarah.tsx";
import KurangDarah from "./pages/KurangDarah.tsx"
import BlastingInfo from "./pages/Blastinginfo.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/edit" element={<EditDarah />} />
      <Route path="/kurangdarah" element={<KurangDarah />} />
      <Route path="/blastinginfo" element={<BlastingInfo />} /> {/* Updated Route */}
      
    </Routes>
  );
}

export default App;
