import { useEffect, useState } from "react";
import bgImage from "../../images/resreve.jpeg";
import { parkingService } from "../../services/parking.service";
import { subscriberService } from "../../services/subscriber.service";

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  .pk-bg {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url("${bgImage}") center/cover no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    background-blend-mode: overlay;
  }

  .pk-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Cellipse cx='650' cy='100' rx='300' ry='180' fill='%23c8d8e8' opacity='0.35'/%3E%3Cellipse cx='100' cy='400' rx='220' ry='140' fill='%23d0d0d0' opacity='0.3'/%3E%3C/svg%3E") no-repeat center/cover;
    pointer-events: none;
    z-index: 0;
  }

  .pk-car-bg {
    position: fixed;
    bottom: -40px;
    right: -60px;
    width: 420px;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }

  .pk-content {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 40px;
  }

  .pk-header {
    text-align: center;
    padding: 22px 0 10px;
  }

  .pk-header-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }

  .pk-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #b0b8c8, #8898aa);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .pk-user-info {
    text-align: left;
  }

  .pk-user-name {
    font-size: 13px;
    font-weight: 700;
    color: #333;
    text-transform: lowercase;
  }

  .pk-user-role {
    font-size: 10px;
    color: #777;
    font-weight: 500;
  }

  .pk-system-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #444;
    letter-spacing: .12em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .pk-page-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 38px;
    color: #222;
    line-height: 1.1;
    margin: 4px 0 4px;
  }

  .pk-page-sub {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    letter-spacing: .06em;
  }

  .pk-btn-main {
    display: block;
    width: 340px;
    padding: 16px 28px;
    margin: 8px auto;
    border: none;
    border-radius: 100px;
    background: linear-gradient(135deg, #4a9fd4, #3a8bc4);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .04em;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(58,139,196,0.32), inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all .22s;
    text-align: center;
  }

  .pk-btn-main:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(58,139,196,0.42);
  }

  .pk-btn-main.disabled {
    background: linear-gradient(135deg, #aab8c8, #98a8b8);
    cursor: not-allowed;
    box-shadow: none;
  }

  .pk-btn-back {
    padding: 12px 32px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    transition: all .2s;
  }

  .pk-btn-red { background: #e05a5a; color: #fff; box-shadow: 0 4px 14px rgba(224,90,90,0.35); }
  .pk-btn-red:hover { background: #cc4a4a; transform: translateY(-1px); }
  .pk-btn-dark { background: #555; color: #fff; }
  .pk-btn-dark:hover { background: #444; }
  .pk-btn-gold { background: linear-gradient(135deg, #d4a940, #c49030); color: #fff; box-shadow: 0 4px 14px rgba(196,144,48,0.3); }
  .pk-btn-gold:hover { transform: translateY(-1px); }

  .pk-card {
    background: rgba(255,255,255,0.82);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    backdrop-filter: blur(16px);
    padding: 28px 32px;
    width: 100%;
    max-width: 700px;
  }

  .pk-table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255,255,255,0.88);
    border-radius: 12px;
    overflow: hidden;
  }

  .pk-table th {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #333;
    padding: 14px 14px;
    text-align: left;
    background: rgba(240,240,240,0.8);
    border-bottom: 2px solid rgba(0,0,0,0.08);
    letter-spacing: .03em;
  }

  .pk-table td {
    padding: 13px 14px;
    font-size: 12px;
    font-weight: 500;
    color: #333;
    border-bottom: 1px dashed rgba(0,0,0,0.1);
    vertical-align: middle;
  }

  .pk-table tr:last-child td { border-bottom: none; }

  .pk-table tr.highlighted td {
    background: rgba(212,185,100,0.18);
  }

  .pk-table tr:not(.highlighted):hover td {
    background: rgba(74,159,212,0.07);
  }

  .pk-inp {
    border: 1.5px solid #ddd;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #333;
    outline: none;
    transition: all .2s;
    width: 100%;
  }

  .pk-inp:focus {
    border-color: #4a9fd4;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(74,159,212,0.12);
  }

  .pk-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #555;
    margin-bottom: 6px;
  }

  .pk-field { margin-bottom: 16px; }

  .pk-btn-search {
    padding: 11px 24px;
    background: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    box-shadow: 0 3px 10px rgba(76,175,80,0.3);
  }
  .pk-btn-search:hover { background: #43a047; transform: translateY(-1px); }

  .pk-btn-showall {
    padding: 11px 20px;
    background: #4a9fd4;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
  }
  .pk-btn-showall:hover { background: #3a8bc4; }

  .pk-status-active {
    color: #2e7d32;
    font-weight: 700;
    font-size: 12px;
  }

  .pk-divider {
    border: none;
    border-top: 2px solid rgba(0,0,0,0.08);
    margin: 0 0 20px;
  }

  .pk-form-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 16px;
  }

  .pk-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
  }

  .pk-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
  }

  .pk-search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .pk-search-label {
    font-size: 13px;
    font-weight: 700;
    color: #333;
    white-space: nowrap;
  }

  .pk-search-inp {
    flex: 1;
    max-width: 220px;
    border: 1.5px solid #ccc;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: all .2s;
  }
  .pk-search-inp:focus { border-color: #4a9fd4; background: #fff; }
`;

// ─── HEADER COMPONENT ─────────────────────────────────────────────────────────
const getAttendantName = (user) => {
  const fullName = user?.fullName || user?.name;
  const firstLastName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  return fullName || firstLastName || user?.firstName || user?.email || "Attendant";
};

const getRoleLabel = (user) => user?.role || user?.userType || "attendant";

const getAvatarLabel = (name) => name.charAt(0).toUpperCase();

function PageHeader({ title, subtitle, user }) {
  const attendantName = getAttendantName(user);
  const roleLabel = getRoleLabel(user);
  const avatarLabel = user?.avatar || getAvatarLabel(attendantName);

  return (
    <div className="pk-header" style={{ width: "100%", maxWidth: 700 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div className="pk-avatar">{avatarLabel}</div>
        <div className="pk-user-info">
          <div className="pk-user-name">hello, {attendantName}</div>
          <div className="pk-user-role">{roleLabel}</div>
        </div>
        <div style={{ flex: 1 }} />
        <div className="pk-system-title">ParkGO System</div>
      </div>
      <div className="pk-page-title">{title}</div>
      <div className="pk-page-sub">{subtitle}</div>
    </div>
  );
}

// ─── SCREEN 1: MAIN DASHBOARD ─────────────────────────────────────────────────
function MainDashboard({ onNavigate, onBackToHome, user }) {
  const buttons = [
    { label: "Register New Subscriber", key: "register", active: true },
    { label: "Parking facility maintenance", key: null, active: false },
    { label: "View Subscribers", key: "subscribers", active: true },
    { label: "View Parked Cars", key: "parked", active: true },
    { label: "View Parking Facility Status", key: null, active: false },
    { label: "View Parking Load Level 80%", key: null, active: false },
  ];

  return (
    <div className="pk-bg">
      <style>{globalStyles}</style>
      <div className="pk-content">
        <PageHeader title="Attendant Dashboard" subtitle="Subscriber And Parking Mangement" user={user} />

        <div style={{ marginTop: 24, width: "100%", maxWidth: 440 }}>
          {buttons.map((btn, i) => (
            <button
              key={i}
              className={`pk-btn-main${btn.active ? "" : " disabled"}`}
              onClick={() => btn.active && btn.key && onNavigate(btn.key)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="pk-bottom-bar" style={{ marginTop: 32 }}>
          <button className="pk-btn-back pk-btn-red" onClick={onBackToHome}>Back</button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 2: REGISTER NEW SUBSCRIBER ───────────────────────────────────────
function RegisterSubscriber({ onBack, user }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleClear = () => setForm({ firstName: "", lastName: "", phone: "", email: "" });
  const handleConfirm = async () => {
    setSaving(true);
    setMessage("");

    try {
      await subscriberService.create(form);
      setMessage("Subscriber registered by server.");
      handleClear();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pk-bg">
      <style>{globalStyles}</style>
      <div className="pk-content">
        <PageHeader title="Register new Subscriber" subtitle="Create a new subscriber account" user={user} />

        <div className="pk-card" style={{ marginTop: 24 }}>
          <div className="pk-form-title">Register information</div>
          <hr className="pk-divider" />

          <div className="pk-form-grid">
            <div className="pk-field">
              <label className="pk-label">First name :</label>
              <input className="pk-inp" value={form.firstName} onChange={e => handleChange("firstName", e.target.value)} />
            </div>
            <div className="pk-field">
              <label className="pk-label">Phone number:</label>
              <input className="pk-inp" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
            </div>
            <div className="pk-field">
              <label className="pk-label">Last name :</label>
              <input className="pk-inp" value={form.lastName} onChange={e => handleChange("lastName", e.target.value)} />
            </div>
            <div className="pk-field">
              <label className="pk-label">Email</label>
              <input className="pk-inp" value={form.email} onChange={e => handleChange("email", e.target.value)} />
            </div>
          </div>

          {message && (
            <div style={{ textAlign: "center", fontWeight: 700, marginTop: 8, color: message.includes("registered") ? "#2e7d32" : "#b04545" }}>
              {message}
            </div>
          )}

          <div className="pk-bottom-bar">
            <button className="pk-btn-back pk-btn-red" onClick={onBack}>Back</button>
            <button className="pk-btn-back pk-btn-dark" onClick={handleClear}>clear</button>
            <button className="pk-btn-back pk-btn-gold" onClick={handleConfirm} disabled={saving}>
              {saving ? "saving..." : "confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 3: VIEW SUBSCRIBERS ──────────────────────────────────────────────
function ViewSubscribers({ onBack, user }) {
  const [searchId, setSearchId] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    subscriberService
      .list()
      .then((items) => {
        if (!alive) return;
        setSubscribers(items);
        setDisplayed(items);
      })
      .catch((err) => alive && setError(err.message))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const found = subscribers.filter(s => String(s.id) === searchId.trim());
    setDisplayed(found);
  };

  const handleShowAll = () => {
    setSearchId("");
    setDisplayed(subscribers);
  };

  const cols = ["ID", "User name", "First name", "Last name", "Email", "Phone", "Registion", "Delays", "Status"];

  return (
    <div className="pk-bg">
      <style>{globalStyles}</style>
      <div className="pk-content">
        <PageHeader title="Subscribers Managment" subtitle="View And Search Subscriber Information" user={user} />

        <div className="pk-card" style={{ marginTop: 24 }}>
          {(loading || error) && (
            <div style={{ marginBottom: 14, color: error ? "#b04545" : "#4a6a7a", fontWeight: 700 }}>
              {loading ? "Loading subscribers from server..." : error}
            </div>
          )}

          <div className="pk-search-bar">
            <span className="pk-search-label">Search by Subscriber ID :</span>
            <input
              className="pk-search-inp"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="pk-btn-search" onClick={handleSearch}>Search</button>
            <button className="pk-btn-showall" onClick={handleShowAll}>Show All</button>
          </div>

          <table className="pk-table">
            <thead>
              <tr>{cols.map(c => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {displayed.map((s, i) => (
                <tr key={s.id} className={i === 0 ? "highlighted" : ""}>
                  <td>{s.id}</td>
                  <td>{s.username}</td>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.registration}</td>
                  <td style={{ textAlign: "center" }}>{s.delays}</td>
                  <td className="pk-status-active">{s.status}</td>
                </tr>
              ))}
              {/* Empty rows to match screenshot */}
              {Array.from({ length: Math.max(0, 5 - displayed.length) }).map((_, i) => (
                <tr key={`empty-${i}`}>
                  {cols.map((_, j) => <td key={j}>&nbsp;</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pk-bottom-bar">
            <button className="pk-btn-back pk-btn-red" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 4: VIEW PARKED CARS ───────────────────────────────────────────────
function ViewParkedCars({ onBack, user }) {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cols = ["Parking Code", "Parking Space", "Start Time", "End Time"];

  useEffect(() => {
    let alive = true;

    parkingService
      .list()
      .then((items) => alive && setParkings(items))
      .catch((err) => alive && setError(err.message))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="pk-bg">
      <style>{globalStyles}</style>
      <div className="pk-content">
        <PageHeader title="Parking Records" subtitle="View And Search Parking Information" user={user} />

        <div className="pk-card" style={{ marginTop: 24 }}>
          {(loading || error) && (
            <div style={{ marginBottom: 14, color: error ? "#b04545" : "#4a6a7a", fontWeight: 700 }}>
              {loading ? "Loading parking records from server..." : error}
            </div>
          )}

          <table className="pk-table">
            <thead>
              <tr>{cols.map(c => <th key={c} style={{ textAlign: "center" }}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {parkings.map((row, i) => (
                <tr key={row.code} className={i === 0 ? "highlighted" : ""}>
                  <td style={{ textAlign: "center" }}>{row.code}</td>
                  <td style={{ textAlign: "center" }}>{row.space}</td>
                  <td style={{ textAlign: "center" }}>{row.startTime}</td>
                  <td style={{ textAlign: "center" }}>{row.endTime}</td>
                </tr>
              ))}
              {/* Empty rows */}
              {Array.from({ length: Math.max(0, 5 - parkings.length) }).map((_, i) => (
                <tr key={`e-${i}`}>
                  {cols.map((_, j) => <td key={j}>&nbsp;</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pk-bottom-bar">
            <button className="pk-btn-back pk-btn-red" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function ParkErraDashboard({ onNavigate, onBackToHome, user }) {
  const [screen, setScreen] = useState("main"); 

  const nav = (key) => setScreen(key);
  const back = () => setScreen("main");

  if (screen === "register") return <RegisterSubscriber onBack={back} user={user} />;
  if (screen === "subscribers") return <ViewSubscribers onBack={back} user={user} />;
  if (screen === "parked") return <ViewParkedCars onBack={back} user={user} />;
  return <MainDashboard onNavigate={nav} onBackToHome={onBackToHome} user={user} />;
}
