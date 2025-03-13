import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/donate" element={<h1>Donation Page</h1>} />
    </Routes>
  );
}

export default App;
