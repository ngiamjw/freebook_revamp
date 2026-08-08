import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PastEvents from "./pages/PastEvents.jsx";
import PastEventDetail from "./pages/PastEventDetail.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <main>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/past-events/:id" element={<PastEventDetail />} />
      </Routes>
    </main>
  );
}
