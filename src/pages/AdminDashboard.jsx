import { useState } from "react";
import bgImage from "../images/resreve.jpeg";

/* ── Mock Data ── */
const MOCK_SUBSCRIBERS = [
  { id: 16, username: "renan badran", firstName: "renan",  lastName: "Badran", email: "renankabh@......", phone: "053918.....", registration: "2026-03-8",  delays: 0, status: "active" },
  { id: 17, username: "ahmed khalil", firstName: "Ahmed",  lastName: "Khalil", email: "ahmed@.......",    phone: "052100.....", registration: "2026-02-14", delays: 1, status: "active" },
  { id: 18, username: "sara nasser",  firstName: "Sara",   lastName: "Nasser", email: "sara@........",   phone: "054200.....", registration: "2026-01-20", delays: 0, status: "active" },
];

const MOCK_PARKED_CARS = [
  { code: 1, space: 1, startTime: "2025-11-28 15:27", endTime: "2025-11-28 15:27" },
  { code: 2, space: 3, startTime: "2026-03-18 09:00", endTime: "2026-03-18 11:00" },
  { code: 3, space: 7, startTime: "2026-03-19 14:30", endTime: "2026-03-19 16:30" },
];

/* ── Shared CSS ── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mg-wrap {
    min-height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url("${bgImage}") center/cover no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    font-family: 'DM Sans', sans-serif;
    color: #222;
    overflow-x: hidden;
  }

  .mg-wrap::before {
    content: '';
    position: fixed;
    top: -80px; right: -80px;
    width: 500px; height: 400px;
    background: radial-gradient(ellipse, rgba(200,215,230,0.45) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .mg-car-shadow {
    position: fixed;
    bottom: -30px; right: -50px;
    width: 460px;
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
  }

  .mg-inner {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px 48px;
  }

  /* Header */
  .mg-topbar {
    width: 100%;
    max-width: 780px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 0 4px;
  }

  .mg-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #b0b8c8, #8898aa);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    border: 2.5px solid #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    flex-shrink: 0;
  }

  .mg-user-name { font-size: 13px; font-weight: 700; color: #333; }
  .mg-user-role { font-size: 10px; color: #888; font-weight: 500; }
  .mg-spacer    { flex: 1; }
  .mg-sys-title {
    font-size: 12px; font-weight: 700; color: #555;
    letter-spacing: .12em; text-transform: uppercase;
  }

  /* Page title block */
  .mg-title-block {
    width: 100%; max-width: 780px;
    text-align: center;
    padding: 6px 0 18px;
  }
  .mg-page-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 42px;
    color: #1a1a1a;
    line-height: 1.1;
    margin: 2px 0 5px;
  }
  .mg-page-sub {
    font-size: 12px; font-weight: 600; color: #666;
    letter-spacing: .06em;
  }

  /* Main button row */
  .mg-btn-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 560px;
    margin: 5px 0;
  }

  .mg-status-pill {
    min-width: 90px;
    padding: 13px 18px;
    border-radius: 100px;
    background: #4CAF50;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-align: center;
    box-shadow: 0 4px 14px rgba(76,175,80,0.35);
  }

  .mg-main-btn {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 100px;
    border: none;
    background: rgba(255,255,255,0.88);
    box-shadow: 0 2px 12px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #222;
    transition: all .22s;
  }
  .mg-main-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.13);
  }
  .mg-main-btn.disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
  .mg-main-btn.disabled:hover { transform: none; box-shadow: 0 2px 12px rgba(0,0,0,0.09); }

  .mg-btn-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6ec6f0, #4ab0e8);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  /* Bottom action bar */
  .mg-bottom-bar {
    display: flex;
    gap: 14px;
    margin-top: 24px;
  }
  .mg-action-btn {
    padding: 12px 34px;
    border-radius: 100px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
  }
  .mg-btn-red  { background: #e05a5a; color: #fff; box-shadow: 0 4px 14px rgba(224,90,90,0.35); }
  .mg-btn-red:hover  { background: #cc4a4a; transform: translateY(-1px); }
  .mg-btn-dark { background: #555; color: #fff; }
  .mg-btn-dark:hover { background: #444; }
  .mg-btn-gold { background: linear-gradient(135deg, #d4a940, #c49030); color: #fff; box-shadow: 0 4px 14px rgba(196,144,48,0.3); }
  .mg-btn-gold:hover { transform: translateY(-1px); }

  /* Card */
  .mg-card {
    background: rgba(255,255,255,0.84);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 8px 32px rgba(0,0,0,0.09);
    backdrop-filter: blur(16px);
    padding: 28px 32px;
    width: 100%;
    max-width: 780px;
    margin-top: 16px;
  }

  /* Table */
  .mg-table { width: 100%; border-collapse: collapse; }
  .mg-table th {
    font-size: 12px; font-weight: 700; color: #333;
    padding: 13px 14px; text-align: left;
    background: rgba(235,235,235,0.7);
    border-bottom: 2px solid rgba(0,0,0,0.08);
    letter-spacing: .03em;
  }
  .mg-table th.center { text-align: center; }
  .mg-table td {
    padding: 13px 14px;
    font-size: 12px; font-weight: 500; color: #333;
    border-bottom: 1px dashed rgba(0,0,0,0.1);
  }
  .mg-table td.center { text-align: center; }
  .mg-table tr:last-child td { border-bottom: none; }
  .mg-table tr.highlight td { background: rgba(212,185,100,0.18); }
  .mg-table tr:not(.highlight):hover td { background: rgba(74,159,212,0.07); }

  .mg-status-active { color: #2e7d32; font-weight: 700; }

  /* Search bar */
  .mg-search-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .mg-search-label { font-size: 13px; font-weight: 700; white-space: nowrap; }
  .mg-search-inp {
    flex: 1; min-width: 160px; max-width: 240px;
    border: 1.5px solid #ccc;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: all .2s;
  }
  .mg-search-inp:focus { border-color: #4a9fd4; background: #fff; }
  .mg-btn-search {
    padding: 10px 22px;
    background: #4CAF50; color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all .2s;
    box-shadow: 0 3px 10px rgba(76,175,80,0.3);
  }
  .mg-btn-search:hover { background: #43a047; transform: translateY(-1px); }
  .mg-btn-showall {
    padding: 10px 18px;
    background: #4a9fd4; color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all .2s;
  }
  .mg-btn-showall:hover { background: #3a8bc4; }

  /* Report form */
  .mg-form-title {
    font-size: 16px; font-weight: 800; color: #c4a040;
    text-align: center; margin-bottom: 14px;
  }
  .mg-form-divider { border: none; border-top: 1.5px solid #e0e0e0; margin-bottom: 20px; }
  .mg-field { margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }
  .mg-field-label { font-size: 13px; font-weight: 600; min-width: 120px; color: #444; }
  .mg-field-inp {
    flex: 1;
    border: 1.5px solid #d0d0d0;
    background: #f0f0f0;
    border-radius: 6px;
    padding: 9px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: all .2s;
  }
  .mg-field-inp:focus { border-color: #4a9fd4; background: #fff; }
  .mg-btn-generate {
    display: block;
    margin: 20px auto 0;
    padding: 13px 36px;
    background: #4CAF50; color: #fff;
    border: none; border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 800;
    cursor: pointer; transition: all .22s;
    box-shadow: 0 4px 16px rgba(76,175,80,0.35);
  }
  .mg-btn-generate:hover { background: #43a047; transform: translateY(-2px); }
  .mg-back-center { display: flex; justify-content: center; margin-top: 20px; }
`;

/* ── Shared Header ─────────────────────────────────────────── */
function Header({ title, subtitle }) {
  return (
    <>
      <div className="mg-topbar">
        <div className="mg-avatar">👩</div>
        <div>
          <div className="mg-user-name">hello, Mohamed</div>
          <div className="mg-user-role">Manger</div>
        </div>
        <div className="mg-spacer" />
        <div className="mg-sys-title">ParkGo System</div>
      </div>
      <div className="mg-title-block">
        <div className="mg-page-title">{title}</div>
        <div className="mg-page-sub">{subtitle}</div>
      </div>
    </>
  );
}

/* ── SCREEN 1: Manager Dashboard ───────────────────────────── */
function ManagerHome({ onNavigate }) {
  const buttons = [
    { icon: "➕", label: "Add  Facality",            key: null,           hasStatus: true  },
    { icon: "🗑️", label: "Remove Facality",          key: null,           hasStatus: true  },
    { icon: "👥", label: "View Subscribers",         key: "subscribers",  hasStatus: false },
    { icon: "🚗", label: "View Parked Cars",         key: "parked",       hasStatus: false },
    { icon: "📊", label: "View Reports",             key: "reports",      hasStatus: false },
  ];

  return (
    <div className="mg-wrap">
      <style>{G}</style>
      <div className="mg-inner">
        <Header title="Manager Dashboard" subtitle="Comprehensive Management Control" />

        <div style={{ width: "100%", maxWidth: 560 }}>
          {buttons.map((btn, i) => (
            <div className="mg-btn-row" key={i}>
              {btn.hasStatus && (
                <div className="mg-status-pill">Success</div>
              )}
              <button
                className={`mg-main-btn${!btn.key ? " disabled" : ""}`}
                onClick={() => btn.key && onNavigate(btn.key)}
              >
                <div className="mg-btn-icon">{btn.icon}</div>
                {btn.label}
              </button>
            </div>
          ))}
        </div>

        <div className="mg-bottom-bar" style={{ justifyContent: "center" }}>
          <button className="mg-action-btn mg-btn-red" onClick={() => onNavigate("home")}>Back</button>
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 2: View Subscribers ────────────────────────────── */
function ViewSubscribers({ onBack }) {
  const [searchId, setSearchId] = useState("");
  const [displayed, setDisplayed] = useState(MOCK_SUBSCRIBERS);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    setDisplayed(MOCK_SUBSCRIBERS.filter(s => String(s.id) === searchId.trim()));
  };

  const handleShowAll = () => {
    setSearchId("");
    setDisplayed(MOCK_SUBSCRIBERS);
  };

  const COLS = ["ID", "User name", "First name", "Last name", "Email", "Phone", "Registion", "Delays", "Status"];
  const EMPTY = Math.max(0, 5 - displayed.length);

  return (
    <div className="mg-wrap">
      <style>{G}</style>
      <div className="mg-inner">
        <Header title="Subscribers Managment" subtitle="View And Search Subscriber Information" />

        <div className="mg-card">
          <div className="mg-search-row">
            <span className="mg-search-label">Search by Subscriber ID :</span>
            <input
              className="mg-search-inp"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="mg-btn-search" onClick={handleSearch}>Search</button>
            <button className="mg-btn-showall" onClick={handleShowAll}>Show All</button>
          </div>

          <table className="mg-table">
            <thead>
              <tr>{COLS.map(c => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {displayed.map((s, i) => (
                <tr key={s.id} className={i === 0 ? "highlight" : ""}>
                  <td>{s.id}</td>
                  <td>{s.username}</td>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.registration}</td>
                  <td className="center">{s.delays}</td>
                  <td className="mg-status-active">{s.status}</td>
                </tr>
              ))}
              {Array.from({ length: EMPTY }).map((_, i) => (
                <tr key={`e${i}`}>
                  {COLS.map((_, j) => <td key={j}>&nbsp;</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mg-back-center">
            <button className="mg-action-btn mg-btn-red" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 3: View Parked Cars (Parking Records) ──────────── */
function ViewParkedCars({ onBack }) {
  const COLS = ["Parking Code", "Parking Space", "Start Time", "End Time"];
  const EMPTY = 5;

  return (
    <div className="mg-wrap">
      <style>{G}</style>
      <div className="mg-inner">
        <Header title="Parking Records" subtitle="View And Search Parking Information" />

        <div className="mg-card">
          <table className="mg-table">
            <thead>
              <tr>{COLS.map(c => <th key={c} className="center">{c}</th>)}</tr>
            </thead>
            <tbody>
              {MOCK_PARKED_CARS.map((row, i) => (
                <tr key={row.code} className={i === 0 ? "highlight" : ""}>
                  <td className="center">{row.code}</td>
                  <td className="center">{row.space}</td>
                  <td className="center">{row.startTime}</td>
                  <td className="center">{row.endTime}</td>
                </tr>
              ))}
              {Array.from({ length: EMPTY }).map((_, i) => (
                <tr key={`e${i}`}>
                  {COLS.map((_, j) => <td key={j}>&nbsp;</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mg-back-center">
            <button className="mg-action-btn mg-btn-red" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 4: View Reports ────────────────────────────────── */
function ViewReports({ onBack }) {
  const [form, setForm] = useState({ date: "", month: "", year: "" });
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 2500);
  };

  return (
    <div className="mg-wrap">
      <style>{G}</style>
      <div className="mg-inner">
        <Header title="View Reports" subtitle="Generate  and View System Reports" />

        <div className="mg-card" style={{ maxWidth: 500 }}>
          <div className="mg-form-title">Report Configuration</div>
          <hr className="mg-form-divider" />

          <div className="mg-field">
            <label className="mg-field-label">Reservation Date</label>
            <input
              className="mg-field-inp"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className="mg-field">
            <label className="mg-field-label">Month:</label>
            <input
              className="mg-field-inp"
              placeholder="e.g. 03"
              value={form.month}
              onChange={e => setForm(f => ({ ...f, month: e.target.value }))}
            />
          </div>
          <div className="mg-field">
            <label className="mg-field-label">Year:</label>
            <input
              className="mg-field-inp"
              placeholder="e.g. 2026"
              value={form.year}
              onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
            />
          </div>

          {generated && (
            <div style={{
              margin: "16px 0 0",
              padding: "12px 16px",
              borderRadius: 10,
              background: "rgba(76,175,80,0.12)",
              border: "1.5px solid rgba(76,175,80,0.35)",
              textAlign: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#2e7d32"
            }}>
              ✅ Report generated successfully!
            </div>
          )}

          <button className="mg-btn-generate" onClick={handleGenerate}>
            Generate Report
          </button>

          <div className="mg-back-center">
            <button className="mg-action-btn mg-btn-red" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────── */
export default function ManagerDashboard({ onNavigate }) {
  const [screen, setScreen] = useState("main");

  const nav = key => key === "home" ? onNavigate("home") : setScreen(key);
  const back = () => setScreen("main");

  if (screen === "subscribers") return <ViewSubscribers onBack={back} />;
  if (screen === "parked")      return <ViewParkedCars  onBack={back} />;
  if (screen === "reports")     return <ViewReports     onBack={back} />;

  return <ManagerHome onNavigate={nav} />;
}