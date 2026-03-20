import { useState, useRef } from "react";
import { updateUser } from "./Userstore";

export default function ProfilePage({ user, onUserUpdate, onBack }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [plate, setPlate] = useState(user?.plate || "");
  const [infoMsg, setInfoMsg] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [showP, setShowP] = useState(false);
  const [passMsg, setPassMsg] = useState("");

  const [avatar, setAvatar] = useState(user?.avatarImg || null);
  const [avatarMsg, setAvatarMsg] = useState("");
  const fileRef = useRef(null);

  const [tab, setTab] = useState("info");
  const [loading, setLoading] = useState(false);

  const str = newPass.length === 0 ? 0 : newPass.length < 6 ? 1 : newPass.length < 10 ? 2 : 3;
  const sColor = ["", "#EF4444", "#F59E0B", "#10B981"];
  const sLabel = ["", "Weak", "Fair", "Strong"];

  const handleInfoSave = () => {
    if (!name || !email) {
      setInfoMsg({ ok: false, text: "Name and email are required." });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const updated = { ...user, name, email, plate, avatar: name.charAt(0).toUpperCase() };
      onUserUpdate && onUserUpdate(updated);
      setInfoMsg({ ok: true, text: "Profile updated successfully!" });
      setTimeout(() => setInfoMsg(""), 2500);
    }, 900);
  };

  const handlePassSave = () => {
    if (!oldPass || !newPass || !confPass) {
      setPassMsg({ ok: false, text: "Please fill all fields." });
      return;
    }

    if (newPass !== confPass) {
      setPassMsg({ ok: false, text: "New passwords do not match." });
      return;
    }

    if (newPass.length < 6) {
      setPassMsg({ ok: false, text: "Password must be at least 6 characters." });
      return;
    }

    if (oldPass !== user.password) {
      setPassMsg({ ok: false, text: "Current password is incorrect." });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const updated = { ...user, password: newPass };
      onUserUpdate && onUserUpdate(updated);
      setPassMsg({ ok: true, text: "Password changed successfully!" });
      setOldPass("");
      setNewPass("");
      setConfPass("");
      setTimeout(() => setPassMsg(""), 2500);
    }, 900);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setAvatarMsg({ ok: false, text: "Image must be under 2MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      const updated = { ...user, avatarImg: base64 };
      onUserUpdate && onUserUpdate(updated);
      setAvatarMsg({ ok: true, text: "Photo updated!" });
      setTimeout(() => setAvatarMsg(""), 2500);
    };
    reader.readAsDataURL(file);
  };

  const Msg = ({ msg }) =>
    msg ? (
      <div
        style={{
          padding: "11px 16px",
          borderRadius: 12,
          background: msg.ok ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.08)",
          border: `1.5px solid ${msg.ok ? "rgba(16,185,129,.3)" : "rgba(239,68,68,.3)"}`,
          fontSize: 13,
          fontWeight: 600,
          color: msg.ok ? "#059669" : "#DC2626",
          marginBottom: 16,
        }}
      >
        {msg.text}
      </div>
    ) : null;

  const tabs = [
    { id: "info", label: "Profile Info", icon: "User" },
    { id: "password", label: "Password", icon: "Lock" },
    { id: "avatar", label: "Photo", icon: "Photo" },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <style>{`
        .p-inp{width:100%;background:rgba(255,255,255,.9);border:1.5px solid rgba(186,230,253,.6);border-radius:14px;padding:13px 18px;color:#0C4A6E;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .2s}
        .p-inp:focus{border-color:#0EA5E9;background:#fff;box-shadow:0 0 0 4px rgba(14,165,233,.1);transform:scale(1.01)}
        .p-inp::placeholder{color:#94A3B8}
        .p-btn{background:linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8);border:none;color:#fff;padding:12px 28px;border-radius:100px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;transition:all .25s;box-shadow:0 4px 16px rgba(14,165,233,.3)}
        .p-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 10px 28px rgba(14,165,233,.45)}
        .p-btn:active{transform:scale(.97)}
        .p-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}
        .p-ghost{background:rgba(255,255,255,.8);border:1.5px solid rgba(186,230,253,.6);color:#0369A1;padding:12px 24px;border-radius:100px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;transition:all .25s}
        .p-ghost:hover{border-color:#38BDF8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(14,165,233,.15)}
        .tab-btn{padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;transition:all .25s;display:flex;align-items:center;gap:7px}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

     

      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        

      

        {tab === "info" && (
          <div style={{ background: "rgba(255,255,255,.85)", border: "1.5px solid rgba(186,230,253,.5)", borderRadius: 24, padding: "32px 36px", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(14,165,233,.1)" }}>
            <Msg msg={infoMsg} />
            {[
              { label: "Full Name", val: name, set: setName, type: "text", ph: "Your name" },
              { label: "Email", val: email, set: setEmail, type: "email", ph: "your@email.com" },
              { label: "Plate Number", val: plate, set: setPlate, type: "text", ph: "e.g. ABC 1234" },
            ].map((field, index) => (
              <div key={index} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#64748B", marginBottom: 8 }}>{field.label}</label>
                <input className="p-inp" type={field.type} placeholder={field.ph} value={field.val} onChange={(e) => field.set(e.target.value)} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 8 }}>
              <button className="p-ghost" onClick={onBack}>Back</button>
              <button className="p-btn" onClick={handleInfoSave} disabled={loading}>
                {loading ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />Saving...</span> : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {tab === "password" && (
          <div style={{ background: "rgba(255,255,255,.85)", border: "1.5px solid rgba(186,230,253,.5)", borderRadius: 24, padding: "32px 36px", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(14,165,233,.1)" }}>
            <Msg msg={passMsg} />
            {[
              { label: "Current Password", val: oldPass, set: setOldPass, ph: "Your current password" },
              { label: "New Password", val: newPass, set: setNewPass, ph: "New password (min 6 chars)" },
              { label: "Confirm Password", val: confPass, set: setConfPass, ph: "Repeat new password" },
            ].map((field, index) => (
              <div key={index} style={{ marginBottom: index === 1 && str > 0 ? 5 : 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#64748B", marginBottom: 8 }}>{field.label}</label>
                <div style={{ position: "relative" }}>
                  <input className="p-inp" type={showP ? "text" : "password"} placeholder={field.ph} value={field.val} onChange={(e) => field.set(e.target.value)} style={{ paddingRight: 44 }} />
                  {index === 0 && <button onClick={() => setShowP(!showP)} style={{ background: "none", border: "none", cursor: "pointer", position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#94A3B8" }}>{showP ? "Hide" : "Show"}</button>}
                </div>
                {index === 1 && str > 0 && (
                  <div style={{ marginTop: 6, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3].map((segment) => (
                        <div key={segment} style={{ flex: 1, height: 4, borderRadius: 4, background: segment <= str ? sColor[str] : "rgba(56,189,248,.15)", transition: "all .3s" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 11, color: sColor[str], fontWeight: 700 }}>{sLabel[str]}</span>
                  </div>
                )}
              </div>
            ))}
            {confPass && confPass !== newPass && <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>Passwords do not match</p>}
            <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 8 }}>
              <button className="p-ghost" onClick={onBack}>Back</button>
              <button className="p-btn" onClick={handlePassSave} disabled={loading}>
                {loading ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />Saving...</span> : "Change Password"}
              </button>
            </div>
          </div>
        )}

        {tab === "avatar" && (
          <div style={{ background: "rgba(255,255,255,.85)", border: "1.5px solid rgba(186,230,253,.5)", borderRadius: 24, padding: "32px 36px", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(14,165,233,.1)", textAlign: "center" }}>
            <Msg msg={avatarMsg} />
            <div style={{ marginBottom: 24 }}>
              {(avatar || user?.avatarImg) ? (
                <img src={avatar || user?.avatarImg} alt="preview" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(14,165,233,.3)", boxShadow: "0 8px 32px rgba(14,165,233,.2)", margin: "0 auto" }} />
              ) : (
                <div style={{ width: 120, height: 120, background: "linear-gradient(135deg,#0284C7,#38BDF8)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 800, color: "#fff", margin: "0 auto", boxShadow: "0 8px 32px rgba(14,165,233,.3)" }}>
                  {user?.avatar || "?"}
                </div>
              )}
            </div>
            <p style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>Upload a photo. JPG or PNG, max 2MB.</p>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ border: "2px dashed rgba(56,189,248,.4)", borderRadius: 16, padding: "28px 20px", cursor: "pointer", transition: "all .2s", background: "rgba(224,242,254,.2)", marginBottom: 20 }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "#38BDF8"; e.currentTarget.style.background = "rgba(224,242,254,.4)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(56,189,248,.4)"; e.currentTarget.style.background = "rgba(224,242,254,.2)"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>Photo</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0284C7" }}>Click to upload photo</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>or drag and drop</div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
            </div>
            {avatar && (
              <button
                onClick={() => { setAvatar(null); updateUser(user.id, { avatarImg: null }); onUserUpdate && onUserUpdate({ ...user, avatarImg: null }); }}
                style={{ background: "rgba(239,68,68,.08)", border: "1.5px solid rgba(239,68,68,.25)", color: "#DC2626", padding: "10px 20px", borderRadius: 100, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 600, transition: "all .2s" }}
              >
                Remove Photo
              </button>
            )}
            <div style={{ marginTop: 20 }}>
              <button className="p-ghost" onClick={onBack}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
