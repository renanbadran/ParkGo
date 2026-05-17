import { useEffect, useRef, useState } from "react";

const fieldStyle = {                             //כפתור העריכה של הפרופיל
  display: "grid",
  gap: 8,
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#9a8c5a",
  fontFamily: "'Jost', sans-serif",
};

const initialFromName = (name) => (name?.trim()?.charAt(0) || "U").toUpperCase();

export default function ProfilePage({ user = {}, onUserUpdate, onBack }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: user.name || "Subscriber",
    email: user.email || "",
    phone: user.phone || "",
    plate: user.plate || "",
    role: user.role || "subscriber",
    avatar: user.avatar || initialFromName(user.name),
    avatarImg: user.avatarImg || "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm({
      name: user.name || "Subscriber",
      email: user.email || "",
      phone: user.phone || "",
      plate: user.plate || "",
      role: user.role || "subscriber",
      avatar: user.avatar || initialFromName(user.name),
      avatarImg: user.avatarImg || "",
    });
  }, [user]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      avatar: field === "name" ? initialFromName(value) : prev.avatar,
    }));
    setMessage("");
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      setForm((prev) => ({
        ...prev,
        avatarImg: readerEvent.target.result,
        avatar: initialFromName(prev.name),
      }));
      setMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...form,
      name: form.name.trim() || "Subscriber",
      avatar: initialFromName(form.name),
    };

    onUserUpdate?.(updatedUser);
    setMessage("Profile updated successfully.");
  };

  return (
    <div style={{ paddingBottom: 48 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h2 style={{ fontSize: 38, fontWeight: 700, color: "#3a3020", fontFamily: "'Cormorant Garamond', serif", letterSpacing: ".02em" }}>
          My <span style={{ color: "#9a8c5a" }}>Profile</span>
        </h2>
        <p style={{ color: "#8a7e60", fontSize: 13, marginTop: 6, fontFamily: "'Jost', sans-serif" }}>
          Keep your subscriber details ready for reservations and pickup.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: "38px 44px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 30, flexWrap: "wrap" }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(154,140,90,.35)",
              boxShadow: "0 8px 24px rgba(60,48,20,.12)",
              flexShrink: 0,
              background: "rgba(154,140,90,.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {form.avatarImg ? (
              <img src={form.avatarImg} alt="profile avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: 40, fontWeight: 700, color: "#9a8c5a", fontFamily: "'Cormorant Garamond', serif" }}>
                {form.avatar}
              </span>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#3a3020", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
              {form.name || "Subscriber"}
            </div>
            <div style={{ fontSize: 12, color: "#9a8c5a", fontFamily: "'Jost', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".12em", marginTop: 4 }}>
              {form.role || "subscriber"}
            </div>
            <button className="btn-ghost" style={{ marginTop: 14, padding: "10px 22px" }} onClick={() => fileRef.current?.click()}>
              Change Photo
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px 22px" }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Full Name</label>
            <input className="inp" value={form.name} onChange={(event) => updateField("name", event.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input className="inp" type="email" value={form.email} placeholder="name@example.com" onChange={(event) => updateField("email", event.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Phone</label>
            <input className="inp" type="tel" value={form.phone} placeholder="+972 50 000 0000" onChange={(event) => updateField("phone", event.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Plate Number</label>
            <input className="inp" value={form.plate} placeholder="ABC 1234" onChange={(event) => updateField("plate", event.target.value.toUpperCase())} />
          </div>
        </div>

        {message && (
          <div style={{ marginTop: 22, padding: "12px 16px", borderRadius: 10, background: "rgba(80,140,80,.08)", border: "1px solid rgba(80,140,80,.3)", color: "#3d6b4f", fontSize: 13, fontWeight: 500, fontFamily: "'Jost', sans-serif" }}>
            {message}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 28, flexWrap: "wrap" }}>
          <button className="btn-ghost" onClick={onBack}>
            Back
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
