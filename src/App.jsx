import Index from "./pages/Index.jsx";

import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </main>
  );
}
