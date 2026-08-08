import { useSearchParams, Link } from "react-router-dom";
import { ContactForm } from "../components/Contact/ContactForm.jsx";
import backdrop from "../components/Index/WhatWeDo/assets/bookDonations.jpg";
import "../components/Contact/Contact.css";

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const mode = params.get("type") === "drive" ? "drive" : "donate";

  const setMode = (next) => setParams({ type: next }, { replace: true });

  return (
    <div className="c-page">
      <div
        className="c-backdrop"
        style={{ backgroundImage: `url(${backdrop})` }}
        aria-hidden="true"
      />
      <Link to="/" className="c-back">← Freebook.sg</Link>

      <ContactForm mode={mode} onModeChange={setMode} />
    </div>
  );
}
