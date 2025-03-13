import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero.tsx";
import Login from "./pages/Login.tsx"; // Import Login Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} /> {/* Updated Route */}
    </Routes>
  );
}

export default App;
