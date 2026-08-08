import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";

/* ── The Lending Card form ──────────────────────────────────────────
   Shared fields + mode-specific fields, rendered as an accession card.
   Submit is stubbed (UI-only) — on a valid submit a red rubber stamp
   thuds down and the card is "filed".
─────────────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyState = {
  name: "", email: "", phone: "", address: "", specialRequests: "",
  consent: false,
  booksEstimate: "", handover: "", preferredDate: "",   // donate
  organisation: "", driveDate: "", locationType: "",     // drive
};

function validate(mode, d) {
  const e = {};
  if (!d.name.trim()) e.name = "Required.";
  if (!d.email.trim()) e.email = "Required.";
  else if (!EMAIL_RE.test(d.email)) e.email = "Check this email.";
  if (!d.address.trim()) e.address = "Required.";

  if (mode === "donate") {
    if (!String(d.booksEstimate).trim()) e.booksEstimate = "Required.";
    else if (Number(d.booksEstimate) <= 0) e.booksEstimate = "Must be > 0.";
    if (!d.handover) e.handover = "Pick one.";
  } else {
    if (!d.organisation.trim()) e.organisation = "Required.";
    if (!d.driveDate.trim()) e.driveDate = "Required.";
    if (!d.locationType) e.locationType = "Pick one.";
  }
  if (!d.consent) e.consent = true;
  return e;
}

const STAMP_DATE = new Date()
  .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  .toUpperCase();

/* label + control + error wrapper */
function Field({ id, label, error, children }) {
  return (
    <div className="c-field" data-invalid={error ? "true" : "false"}>
      <label className="c-label" htmlFor={id}>{label}</label>
      {children}
      {error && <p className="c-error">{error}</p>}
    </div>
  );
}

const cardVariants = {
  idle:  { rotate: -0.5 },
  filed: {
    rotate: [-0.5, -1.6, 0.4, -0.5],
    x: [0, -4, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export function ContactForm({ mode, onModeChange }) {
  const [data, setData] = useState(emptyState);
  const [errors, setErrors] = useState({});
  const [filed, setFiled] = useState(false);
  const [accession] = useState(
    () => `No. ${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`,
  );

  const set = (name) => (ev) => {
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const switchMode = (next) => {
    if (next === mode || filed) return;
    setErrors({});
    onModeChange(next);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const found = validate(mode, data);
    if (Object.keys(found).length) { setErrors(found); return; }
    // TODO: wire to a real target (Formspree / Getform / backend endpoint).
    // Payload is ready — swap this stub for a fetch() when the endpoint exists.
    console.log("[contact] submission:", { type: mode, ...data });
    setFiled(true);
  };

  const isDonate = mode === "donate";

  return (
    <MotionConfig reducedMotion="user">
      <motion.form
        className={`c-card${filed ? " c-filed" : ""}`}
        variants={cardVariants}
        initial="idle"
        animate={filed ? "filed" : "idle"}
        onSubmit={handleSubmit}
        noValidate
      >
        <span className="c-hole" aria-hidden="true" />

        {/* Header */}
        <div className="c-head">
          <span className="c-wordmark">Freebook.sg</span>
          <span className="c-accession">
            Accession<br />{accession}
          </span>
        </div>

        <h1 className="c-title">{isDonate ? "Book Donation Card" : "Book Drive Card"}</h1>
        <p className="c-intro">
          {isDonate
            ? "Tell us what's leaving your shelves — we'll arrange collection and give every book a second reader."
            : "Tell us about the drive you'd like to run — we'll help you plan, promote and collect it."}
        </p>

        {/* Catalogue-tab toggle */}
        <div className="c-tabs" role="tablist" aria-label="Type of request">
          <button type="button" role="tab" className="c-tab"
            aria-selected={isDonate} data-active={isDonate}
            onClick={() => switchMode("donate")}>
            Donate books
          </button>
          <button type="button" role="tab" className="c-tab"
            aria-selected={!isDonate} data-active={!isDonate}
            onClick={() => switchMode("drive")}>
            Host a drive
          </button>
        </div>

        <Field id="name" label={isDonate ? "Name of donor" : "Name"} error={errors.name}>
          <input id="name" className="c-line" type="text"
            value={data.name} onChange={set("name")} disabled={filed} />
        </Field>

        <div className="c-row">
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" className="c-line" type="email"
              value={data.email} onChange={set("email")} disabled={filed} />
          </Field>
          <Field id="phone" label="Phone (opt.)" error={errors.phone}>
            <input id="phone" className="c-line" type="tel"
              value={data.phone} onChange={set("phone")} disabled={filed} />
          </Field>
        </div>

        <Field id="address" label={isDonate ? "Collection address" : "Address"} error={errors.address}>
          <input id="address" className="c-line" type="text"
            value={data.address} onChange={set("address")} disabled={filed} />
        </Field>

        {/* Donate-only */}
        {isDonate && (
          <>
            <div className="c-row">
              <Field id="booksEstimate" label="No. of volumes" error={errors.booksEstimate}>
                <input id="booksEstimate" className="c-line" type="number" min="1"
                  value={data.booksEstimate} onChange={set("booksEstimate")} disabled={filed} />
              </Field>
              <div className="c-field" data-invalid={errors.handover ? "true" : "false"}>
                <span className="c-label">Handover</span>
                <div className="c-radios">
                  {[["pickup", "Pickup"], ["dropoff", "Drop-off"]].map(([v, t]) => (
                    <label key={v} className="c-radio">
                      <input type="radio" name="handover" value={v}
                        checked={data.handover === v} onChange={set("handover")} disabled={filed} />
                      {t}
                    </label>
                  ))}
                </div>
                {errors.handover && <p className="c-error">{errors.handover}</p>}
              </div>
            </div>
            <Field id="preferredDate" label="Preferred date (opt.)" error={errors.preferredDate}>
              <input id="preferredDate" className="c-line" type="date"
                value={data.preferredDate} onChange={set("preferredDate")} disabled={filed} />
            </Field>
          </>
        )}

        {/* Drive-only */}
        {!isDonate && (
          <>
            <Field id="organisation" label="Organisation" error={errors.organisation}>
              <input id="organisation" className="c-line" type="text"
                value={data.organisation} onChange={set("organisation")} disabled={filed} />
            </Field>
            <div className="c-row">
              <Field id="driveDate" label="Preferred date / timeframe" error={errors.driveDate}>
                <input id="driveDate" className="c-line" type="text"
                  placeholder="e.g. late March"
                  value={data.driveDate} onChange={set("driveDate")} disabled={filed} />
              </Field>
              <Field id="locationType" label="Location type" error={errors.locationType}>
                <select id="locationType" className="c-line"
                  value={data.locationType} onChange={set("locationType")} disabled={filed}>
                  <option value="" disabled>—</option>
                  <option value="school">School</option>
                  <option value="office">Office</option>
                  <option value="community">Community space</option>
                  <option value="other">Other</option>
                </select>
              </Field>
            </div>
          </>
        )}

        <Field id="specialRequests" label="Notes for the librarian (opt.)" error={errors.specialRequests}>
          <textarea id="specialRequests" className="c-linearea" rows={2}
            value={data.specialRequests} onChange={set("specialRequests")} disabled={filed} />
        </Field>

        <label className="c-consent" data-invalid={errors.consent ? "true" : "false"}>
          <input type="checkbox" checked={data.consent} onChange={set("consent")} disabled={filed} />
          <span>I consent to Freebook.sg contacting me about this card and keeping my details on file.</span>
        </label>

        {!filed ? (
          <button type="submit" className="c-send">Stamp &amp; send</button>
        ) : (
          <p className="c-confirm">
            Card filed — a Freebook volunteer will be in touch within a few days.{" "}
            <Link to="/">Back to home →</Link>
          </p>
        )}

        {/* The rubber stamp */}
        {filed && (
          <motion.div
            className="c-stamp"
            initial={{ scale: 2.6, opacity: 0, rotate: -13 }}
            animate={{ scale: 1, opacity: 0.85, rotate: -13 }}
            transition={{ duration: 0.26, ease: [0.2, 0.9, 0.25, 1] }}
            aria-hidden="true"
          >
            <span className="c-stamp-lg">Received</span>
            <span className="c-stamp-sm">{STAMP_DATE} · Freebook.sg</span>
          </motion.div>
        )}
      </motion.form>
    </MotionConfig>
  );
}
