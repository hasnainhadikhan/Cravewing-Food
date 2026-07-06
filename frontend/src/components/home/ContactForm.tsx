import { useState } from "react";
import { Send, Check, User, Mail, MessageSquare } from "lucide-react";
import { RED, GOLD, CHAR, GREY, CREAM } from "../../constants/brand";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: GOLD }}
        >
          <Check size={28} color={CHAR} />
        </div>
        <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: CHAR }}>MESSAGE SENT!</h3>
        <p style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 8 }}>
          {"We'll"} get back to you hotter than our Nashville Hot sauce.
        </p>
      </div>
    );
  }

  const textFields = [
    { key: "name", label: "Your Name", type: "text", placeholder: "John Doe", icon: User },
    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com", icon: Mail },
    { key: "subject", label: "Subject", type: "text", placeholder: "Catering inquiry, feedback...", icon: MessageSquare },
  ];

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {textFields.map((f) => (
        <div key={f.key}>
          <label
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: CHAR,
              display: "block",
              marginBottom: 6,
            }}
          >
            {f.label}
          </label>
          <div className="relative">
            <div 
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: GREY }}
            >
              <f.icon size={18} />
            </div>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => {
                setForm((p) => ({ ...p, [f.key]: e.target.value }));
                setErrors((p) => ({ ...p, [f.key]: "" }));
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all"
              style={{
                borderColor: errors[f.key] ? RED : "#e0d0c0",
                background: CREAM,
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = errors[f.key] ? RED : "#e0d0c0"; }}
            />
          </div>
          {errors[f.key] && (
            <p style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 12, marginTop: 4 }}>
              {errors[f.key]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: CHAR,
            display: "block",
            marginBottom: 6,
          }}
        >
          Message
        </label>
        <div className="relative">
          <div 
            className="absolute left-4 top-4"
            style={{ color: GREY }}
          >
            <MessageSquare size={18} />
          </div>
          <textarea
            rows={5}
            placeholder="Tell us what's on your mind..."
            value={form.message}
            onChange={(e) => {
              setForm((p) => ({ ...p, message: e.target.value }));
              setErrors((p) => ({ ...p, message: "" }));
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all resize-none"
            style={{
              borderColor: errors.message ? RED : "#e0d0c0",
              background: CREAM,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? RED : "#e0d0c0"; }}
          />
        </div>
        {errors.message && (
          <p style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 12, marginTop: 4 }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:brightness-110"
        style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
      >
        <Send size={18} /> Send Message
      </button>
    </form>
  );
}
