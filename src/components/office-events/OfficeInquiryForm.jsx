"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeader } from "@/components/office-events/SectionHeader";
import { C, F, RAW } from "@/lib/theme";

/* Same Formspree form the cart order form and Custom Cakes inquiry use.
   Office inquiries go to EMAIL ONLY. They are deliberately NOT sent to the
   Google Apps Script webhook / orders spreadsheet: that sheet's columns are
   built for cake orders and the owner's dashboard reads it. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgopbwvv";
const INQUIRY_TYPE = "Office Events inquiry";
const CONTACT_EMAIL = "hello@kakenkream.com";

const EMPTY_FIELDS = { name: "", company: "", email: "", phone: "", quantity: "", preferredDate: "", notes: "" };
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Contact name is required";
  if (!fields.company.trim()) errors.company = "Company or office name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Please enter a valid email";
  if (!fields.quantity.trim()) errors.quantity = "Estimated quantity or headcount is required";
  if (!fields.preferredDate) errors.preferredDate = "Preferred date is required";
  return errors;
}

function buildPayload(fields) {
  const trimmed = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.trim()]));
  return {
    _subject: `${INQUIRY_TYPE} from ${trimmed.company} (${trimmed.name})`,
    orderType: INQUIRY_TYPE,
    name: trimmed.name,
    company: trimmed.company,
    email: trimmed.email,
    _replyto: trimmed.email,
    phone: trimmed.phone,
    quantity: trimmed.quantity,
    preferredDate: trimmed.preferredDate,
    notes: trimmed.notes,
  };
}

const labelStyle = { display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 };
const optional = <span style={{ fontSize: 12, opacity: 0.7 }}>(optional)</span>;
const required = <span style={{ color: C.coral }}>*</span>;
const inputStyle = (hasError) => ({
  width: "100%", padding: "14px 18px", borderRadius: 12,
  border: `2px solid ${hasError ? C.coral : C.border}`,
  fontFamily: F.b, fontSize: 16, background: C.white, color: C.ink,
});

function Field({ id, label, isRequired, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label} {isRequired ? required : optional}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" style={{ color: C.coral, fontSize: 13, marginTop: 4, fontWeight: 500 }}>{error}</p>}
      {hint && <p id={`${id}-hint`} style={{ fontSize: 13, color: C.muted, marginTop: 6, fontWeight: 500 }}>{hint}</p>}
    </div>
  );
}

function SuccessMessage() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <BlurFade>
      <div ref={ref} role="status" tabIndex={-1} style={{ textAlign: "center", padding: "48px 30px", borderRadius: 18, border: `3px solid ${C.border}`, background: C.white, outline: "none" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: RAW.pink + "40", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <PartyPopper size={36} strokeWidth={2} style={{ color: C.pink }} />
        </div>
        <h3 style={{ fontFamily: F.d, fontSize: 32, fontWeight: 700, marginBottom: 8, color: C.ink }}>Inquiry Sent!</h3>
        <p style={{ fontSize: 16, color: C.sub, lineHeight: 1.6, marginBottom: 28, fontWeight: 500 }}>
          We&apos;ll email you within 24 hours to discuss your treat selections and quantities.
        </p>
        <Link href="/" className="oe-btn" style={{ display: "inline-block", fontFamily: F.d, fontSize: 16, fontWeight: 600, padding: "14px 32px", borderRadius: 12, background: C.pink, color: C.white, textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    </BlurFade>
  );
}

export function OfficeInquiryForm({ orderInfo }) {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key) => (e) => {
    const value = e.target.value;
    setFields(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const fieldProps = (key, { isRequired = false, hasHint = false } = {}) => {
    const describedBy = [errors[key] && `oe-${key}-error`, hasHint && `oe-${key}-hint`].filter(Boolean).join(" ");
    return {
      id: `oe-${key}`,
      name: key,
      value: fields[key],
      onChange: update(key),
      className: "oe-input",
      style: inputStyle(!!errors[key]),
      "aria-required": isRequired || undefined,
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": describedBy || undefined,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = Object.keys(EMPTY_FIELDS).find(key => found[key]);
    if (firstInvalid) {
      document.getElementById(`oe-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload(fields)),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setFields(EMPTY_FIELDS);
      setSubmitted(true);
    } catch {
      setSubmitError(`Something went wrong — please try again, or email us at ${CONTACT_EMAIL}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="office-inquiry" style={{ padding: "100px 24px", background: C.surfMint }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Inquiry"
          title="Office Order Inquiry"
          subtitle="Tell us about your event and we'll follow up with options and availability."
        />

        {submitted ? <SuccessMessage /> : (
          <BlurFade inView delay={0.15}>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20, background: C.white, padding: "36px 30px", borderRadius: 18, border: `3px solid ${C.border}`, boxShadow: "0 6px 20px rgba(0,0,0,0.02)" }}>
              <input type="hidden" name="orderType" value={INQUIRY_TYPE} />

              <Field id="oe-name" label="Contact name" isRequired error={errors.name}>
                <input type="text" autoComplete="name" placeholder="Jane Doe" {...fieldProps("name", { isRequired: true })} />
              </Field>

              <Field id="oe-company" label="Company or office name" isRequired error={errors.company}>
                <input type="text" autoComplete="organization" placeholder="Acme Co." {...fieldProps("company", { isRequired: true })} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="oe-email" label="Email" isRequired error={errors.email}>
                  <input type="email" autoComplete="email" placeholder="jane@company.com" {...fieldProps("email", { isRequired: true })} />
                </Field>
                <Field id="oe-phone" label="Phone" error={errors.phone}>
                  <input type="tel" autoComplete="tel" placeholder="(636) 555-1234" {...fieldProps("phone")} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="oe-quantity" label="Estimated quantity or headcount" isRequired error={errors.quantity}>
                  <input type="text" placeholder="e.g. 3 dozen or 40 people" {...fieldProps("quantity", { isRequired: true })} />
                </Field>
                <Field id="oe-preferredDate" label="Preferred date" isRequired error={errors.preferredDate} hint={orderInfo.notice}>
                  <input type="date" {...fieldProps("preferredDate", { isRequired: true, hasHint: true })} style={{ ...inputStyle(!!errors.preferredDate), height: 54 }} />
                </Field>
              </div>

              <Field id="oe-notes" label="Notes" error={errors.notes}>
                <textarea rows={4} placeholder="Treats you're interested in, the occasion, allergy questions..." {...fieldProps("notes")} style={{ ...inputStyle(false), resize: "vertical" }} />
              </Field>

              {submitError && (
                <p role="alert" style={{ margin: 0, padding: "12px 16px", borderRadius: 12, background: "rgba(255,138,155,0.12)", border: `2px solid ${C.coral}`, color: C.ink, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="oe-hover-btn"
                style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: C.pink, color: "white", fontFamily: F.d, fontSize: 17, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer", boxShadow: "0 6px 20px rgba(255,105,180,0.25)", opacity: submitting ? 0.8 : 1 }}
              >
                {submitting ? "Sending Inquiry..." : "Send Inquiry"}
              </button>
            </form>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
