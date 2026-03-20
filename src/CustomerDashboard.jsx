import { useState, useEffect, useRef } from "react";
import ProfilePage from "./Profilepage";
import heroBg from "./images/Car1.jpeg";

/* ── Mock Data ── */
const MOCK_USER = { name: "Maya", role: "subscriber", avatar: "M" };
const MOCK_HISTORY = [
  { code: 12, space: 2, date: "2025-11-28 15:27", retrieval: "2025-11-28 15:27", confirmation: 4816, id: 11, ext: 0, max: 240, status: "completed" },
  { code: 8,  space: 5, date: "2025-12-01 10:00", retrieval: "2025-12-01 12:00", confirmation: 3921, id: 14, ext: 1, max: 120, status: "active" },
  { code: 15, space: 3, date: "2025-12-05 09:30", retrieval: "2025-12-05 11:30", confirmation: 5104, id: 17, ext: 0, max: 180, status: "cancelled" },
];

/* ── Main Component ── */
export default function CustomerDashboard({ onNavigate, user }) {
  const [currentUser, setCurrentUser] = useState(user || { name: "Renan", role: "subscriber", avatar: "G" });
  const [page, setPage]         = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vis, setVis]           = useState(false);

  // Reserve form
  const [resDate, setResDate]   = useState("");
  const [resTime, setResTime]   = useState("");
  const [resMsg, setResMsg]     = useState("");

  // Cancel form
  const [cancelId, setCancelId] = useState("");
  const [cancelMsg, setCancelMsg] = useState("");

  // DropOff / PickUp
  const [doPlate, setDoPlate]   = useState("");
  const [doMsg, setDoMsg]       = useState("");
  const [puCode, setPuCode]     = useState("");
  const [puMsg, setPuMsg]       = useState("");

  // Avatar quick change from topbar
  const avatarFileRef = useRef(null);
  const handleTopbarAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCurrentUser(prev => ({ ...prev, avatarImg: ev.target.result, avatar: prev.name?.charAt(0).toUpperCase() }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => { setTimeout(() => setVis(true), 60); }, []);
  useEffect(() => { setVis(false); setTimeout(() => setVis(true), 60); }, [page]);

  const fly = (d=0) => ({
    opacity: vis?1:0,
    transform: vis?"translateY(0) scale(1)":"translateY(18px) scale(.98)",
    transition:`opacity .45s ease ${d}ms, transform .45s ease ${d}ms`
  });

  const goTo = (p) => { setMenuOpen(false); setPage(p); };

  /* ── Handlers ── */
  const handleReserve = () => {
    if (!resDate || !resTime) { setResMsg("⚠ Please fill in all fields."); return; }
    setResMsg("✅ Spot reserved successfully! Confirmation sent.");
    setTimeout(() => { setResMsg(""); setResDate(""); setResTime(""); setPage("home"); }, 2000);
  };
  const handleCancel = () => {
    if (!cancelId) { setCancelMsg("⚠ Please enter your Reservation ID."); return; }
    setCancelMsg("✅ Reservation cancelled.");
    setTimeout(() => { setCancelMsg(""); setCancelId(""); setPage("home"); }, 2000);
  };
  const handleDropOff = () => {
    if (!doPlate) { setDoMsg("⚠ Please enter your plate number."); return; }
    setDoMsg("✅ Car checked in! An attendant will park your vehicle.");
    setTimeout(() => { setDoMsg(""); setDoPlate(""); setPage("home"); }, 2500);
  };
  const handlePickUp = () => {
    if (!puCode) { setPuMsg("⚠ Please enter your pickup code."); return; }
    if (puCode === "4816" || MOCK_HISTORY.some(h => h.confirmation === parseInt(puCode))) {
      setPuMsg("✅ Code verified! Your car is being brought to the kiosk.");
    } else {
      setPuMsg("❌ Invalid code. Please try again.");
    }
    setTimeout(() => setPuMsg(""), 3000);
  };

  const statusColor = (s) => s==="active"?"#7a6a2a":s==="completed"?"#3d6b4f":"#8b3a3a";
  const statusBg    = (s) => s==="active"?"rgba(180,160,80,.13)":s==="completed"?"rgba(80,160,100,.1)":"rgba(200,80,80,.1)";

  // Parking lot image (the Car1.jpeg user uploaded – use as base64 or public URL)
  // We'll use the uploaded file path for the hero
  //const heroBg = "./images/Car1.jpeg";

  return (
    <div style={{fontFamily:"'Cormorant Garamond', 'Georgia', serif",background:"#e8e3da",minHeight:"100vh",color:"#3a3020",overflowX:"hidden",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#b5a87a;border-radius:4px}

        .inp{width:100%;background:rgba(255,255,255,.92);border:1.5px solid rgba(180,165,120,.4);border-radius:10px;padding:13px 18px;color:#3a3020;font-family:'Jost',sans-serif;font-size:14px;font-weight:400;outline:none;transition:all .2s}
        .inp:focus{border-color:#9a8c5a;background:#fff;box-shadow:0 0 0 3px rgba(154,140,90,.12)}
        .inp::placeholder{color:#b0a882}

        .btn-primary{background:#9a8c5a;border:none;color:#fff;padding:13px 32px;border-radius:100px;cursor:pointer;font-family:'Jost',sans-serif;font-size:13px;font-weight:600;letter-spacing:.06em;transition:all .25s;box-shadow:0 4px 16px rgba(154,140,90,.25)}
        .btn-primary:hover{background:#7d7248;transform:translateY(-2px);box-shadow:0 8px 24px rgba(154,140,90,.35)}
        .btn-primary:active{transform:scale(.97)}

        .btn-red{background:#8b3a3a;border:none;color:#fff;padding:13px 32px;border-radius:100px;cursor:pointer;font-family:'Jost',sans-serif;font-size:13px;font-weight:600;letter-spacing:.06em;transition:all .25s;box-shadow:0 4px 16px rgba(139,58,58,.25)}
        .btn-red:hover{background:#6e2e2e;transform:translateY(-2px)}

        .btn-ghost{background:transparent;border:1.5px solid rgba(154,140,90,.5);color:#7d7248;padding:13px 32px;border-radius:100px;cursor:pointer;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;transition:all .25s}
        .btn-ghost:hover{border-color:#9a8c5a;background:rgba(154,140,90,.06);transform:translateY(-1px)}

        .action-card{background:rgba(255,255,255,.95);border:none;border-radius:18px;padding:40px 28px 36px;box-shadow:0 4px 32px rgba(60,48,20,.08);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;transition:all .3s ease}
        .action-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(60,48,20,.14)}
        .action-card:active{transform:scale(.98)}

        .menu-item{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:10px;cursor:pointer;transition:all .2s;font-size:14px;font-weight:500;font-family:'Jost',sans-serif;color:#5a4e30}
        .menu-item:hover{background:rgba(154,140,90,.1);color:#3a3020}

        .glass-panel{background:rgba(255,255,255,.95);border:none;border-radius:18px;box-shadow:0 8px 40px rgba(60,48,20,.1)}

        .table-wrap{background:rgba(255,255,255,.95);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(60,48,20,.08)}
        th{background:rgba(232,227,218,.8);color:#7d7248;font-size:11px;font-weight:700;font-family:'Jost',sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:14px 16px;text-align:left;border-bottom:1px solid rgba(180,165,120,.2)}
        td{padding:14px 16px;font-size:13px;font-weight:400;font-family:'Jost',sans-serif;color:#3a3020;border-bottom:1px solid rgba(180,165,120,.12);transition:background .15s}
        tr:hover td{background:rgba(232,227,218,.3)}
        tr:last-child td{border-bottom:none}

        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:.5}}

        .menu-panel{animation:slideIn .3s cubic-bezier(.22,1,.36,1)}
        .overlay{animation:fadeIn .2s ease both}

        .hero-band{
          position:relative;
          width:100%;
          height:260px;
          overflow:hidden;
          background:#2a2015;
        }
        .hero-band img{
          width:100%;
          height:100%;
          object-fit:cover;
          opacity:.72;
          filter:brightness(.85) saturate(.9);
        }
        .hero-band-content{
          position:absolute;
          inset:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:6px;
        }
      `}</style>

      {/* ── MENU OVERLAY ── */}
      {menuOpen && (
        <>
          <div className="overlay" onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,background:"#3a3020",zIndex:40,cursor:"pointer"}}/>
          <div className="menu-panel" style={{position:"fixed",top:0,right:0,bottom:0,width:280,background:"#faf8f4",zIndex:50,boxShadow:"-8px 0 40px rgba(60,48,20,.18)",display:"flex",flexDirection:"column",padding:"28px 20px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,paddingBottom:20,borderBottom:"1px solid rgba(180,165,120,.25)"}}>
              <div>
                <div style={{fontSize:16,fontWeight:700,fontFamily:"'Cormorant Garamond',serif",color:"#3a3020",letterSpacing:".02em"}}>Menu</div>
                <div style={{fontSize:11,color:"#9a8c5a",fontFamily:"'Jost',sans-serif",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase"}}>ParkGo</div>
              </div>
              <button onClick={()=>setMenuOpen(false)} style={{background:"rgba(154,140,90,.1)",border:"none",width:36,height:36,borderRadius:8,cursor:"pointer",fontSize:16,color:"#7d7248",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}
                onMouseOver={e=>e.target.style.background="rgba(154,140,90,.2)"}
                onMouseOut={e=>e.target.style.background="rgba(154,140,90,.1)"}>✕</button>
            </div>

            <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
              {[
                {icon:"👤", label:"My Profile",         p:"profile"},
                {icon:"🅿️", label:"Parking History",    p:"parking-history"},
                {icon:"📋", label:"Reservation History",p:"history"},
                {icon:"✏️", label:"Update Details",     p:"update"},
                {icon:"❌", label:"Cancel Reservation", p:"cancel"},
              ].map((item,i)=>(
                <div key={i} className="menu-item" onClick={()=>goTo(item.p)}>
                  <span style={{fontSize:17}}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <button className="btn-red" style={{width:"100%",padding:"14px"}} onClick={()=>onNavigate&&onNavigate("home")}>
              Exit to Home
            </button>
          </div>
        </>
      )}

      {/* ── HERO BAND with parking lot image ── */}
      <div className="hero-band">
        <img src={heroBg} alt="parking lot" onError={e=>{e.target.style.display='none'}}/>
        <div className="hero-band-content">
          {/* Topbar inside hero */}
          <div style={{position:"absolute",top:0,left:0,right:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 32px"}}>
            {/* User */}
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div onClick={()=>goTo("profile")}
                style={{width:46,height:46,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,.7)",flexShrink:0,cursor:"pointer",transition:"transform .2s"}}
                onMouseOver={e=>e.currentTarget.style.transform="scale(1.08)"}
                onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
                {currentUser.avatarImg
                  ? <img src={currentUser.avatarImg} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <div style={{width:"100%",height:"100%",background:"rgba(154,140,90,.85)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff",fontFamily:"'Cormorant Garamond',serif"}}>{currentUser.avatar}</div>
                }
              </div>
              <input ref={avatarFileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleTopbarAvatar}/>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:"#fff",fontFamily:"'Jost',sans-serif",textShadow:"0 1px 4px rgba(0,0,0,.4)"}}>hello, {currentUser.name.toLowerCase()}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.75)",fontFamily:"'Jost',sans-serif",fontWeight:400,letterSpacing:".08em"}}>{currentUser.role}</div>
              </div>
            </div>

            {/* Hamburger */}
            <button onClick={()=>setMenuOpen(true)} style={{background:"rgba(0,0,0,.25)",border:"none",width:42,height:42,borderRadius:8,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,transition:"all .2s",backdropFilter:"blur(8px)"}}
              onMouseOver={e=>e.currentTarget.style.background="rgba(0,0,0,.4)"}
              onMouseOut={e=>e.currentTarget.style.background="rgba(0,0,0,.25)"}>
              {[0,1,2].map(i=><div key={i} style={{width:18,height:1.5,background:"#fff",borderRadius:2}}/>)}
            </button>
          </div>

          {/* Hero title */}
          <div style={{textAlign:"center",marginTop:28}}>
            <h1 style={{fontSize:44,fontWeight:700,color:"#fff",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".04em",textShadow:"0 2px 16px rgba(0,0,0,.45)",lineHeight:1}}>ParkErra System</h1>
            <p style={{fontSize:14,color:"rgba(255,255,255,.85)",fontFamily:"'Jost',sans-serif",fontWeight:300,letterSpacing:".1em",marginTop:8,textShadow:"0 1px 8px rgba(0,0,0,.4)"}}>your Smart Parking Solution</p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{position:"relative",zIndex:10,maxWidth:960,margin:"0 auto",padding:"0 24px"}}>

        {/* ══════════════════════════════════════════════
            PROFILE PAGE
        ══════════════════════════════════════════════ */}
        {page==="profile" && (
          <div style={{paddingTop:32}}>
            <ProfilePage
              user={currentUser}
              onUserUpdate={(updated) => setCurrentUser(updated)}
              onBack={()=>goTo("home")}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════
            HOME PAGE
        ══════════════════════════════════════════════ */}
        {page==="home" && (
          <div style={{paddingBottom:48,paddingTop:0}}>
            {/* Action cards – pulled up to overlap hero */}
            <div style={{...fly(80),display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22,marginTop:-60,marginBottom:28}}>
              {/* Reserve */}
              <div className="action-card" onClick={()=>goTo("reserve")}>
                <h3 style={{fontSize:28,fontWeight:700,color:"#9a8c5a",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".01em",lineHeight:1.15}}>Reserve<br/>Parking</h3>
                <p style={{fontSize:12,color:"#8a7e60",lineHeight:1.7,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Reserve a parking space in advance</p>
                <button className="btn-primary" style={{marginTop:12}}>order now</button>
              </div>

              {/* Drop Off */}
              <div className="action-card" onClick={()=>goTo("dropoff")}>
                <h3 style={{fontSize:28,fontWeight:700,color:"#9a8c5a",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".01em",lineHeight:1.15}}>Drop Off<br/>Car</h3>
                <p style={{fontSize:12,color:"#8a7e60",lineHeight:1.7,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Leave your car in the parking</p>
                <button className="btn-primary" style={{marginTop:12}}>Drop Off Car</button>
              </div>

              {/* Pick Up */}
              <div className="action-card" onClick={()=>goTo("pickup")}>
                <h3 style={{fontSize:28,fontWeight:700,color:"#9a8c5a",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".01em",lineHeight:1.15}}>Pick Up<br/>Car</h3>
                <p style={{fontSize:12,color:"#8a7e60",lineHeight:1.7,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Take the car from the parking</p>
                <button className="btn-primary" style={{marginTop:12}}>Pick Up Car</button>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{...fly(200),display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {[
                {label:"Active Bookings",  val:"1",    icon:"📅"},
                {label:"Total Parked",     val:"12",   icon:"🚗"},
                {label:"Next Reminder",    val:"15 min",icon:"⏰"},
              ].map((s,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.8)",border:"1px solid rgba(180,165,120,.2)",borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",gap:14,transition:"all .25s",cursor:"default"}}
                  onMouseOver={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(60,48,20,.1)"}}
                  onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{width:40,height:40,background:"rgba(154,140,90,.12)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.icon}</div>
                  <div>
                    <div style={{fontSize:20,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif"}}>{s.val}</div>
                    <div style={{fontSize:10,color:"#9a8c5a",fontWeight:600,fontFamily:"'Jost',sans-serif",textTransform:"uppercase",letterSpacing:".08em"}}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            RESERVE PAGE
        ══════════════════════════════════════════════ */}
        {page==="reserve" && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>Reserve <span style={{color:"#9a8c5a"}}>Parking</span></h2>
              <p style={{color:"#8a7e60",fontSize:13,marginTop:6,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Reservation is automatic — just select date and time</p>
            </div>

            <div className="glass-panel" style={{padding:"40px 44px",maxWidth:520,margin:"0 auto"}}>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Reservation Date</label>
                <input className="inp" type="date" value={resDate} onChange={e=>setResDate(e.target.value)}/>
              </div>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Reservation Time (HH:MM)</label>
                <input className="inp" type="time" placeholder="e.g. 14:30" value={resTime} onChange={e=>setResTime(e.target.value)}/>
              </div>
              <div style={{marginBottom:24}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Duration</label>
                <select className="inp" style={{cursor:"pointer"}}>
                  {["30 minutes","1 hour","2 hours","3 hours","All day"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>

              <div style={{background:"rgba(154,140,90,.07)",border:"1px solid rgba(154,140,90,.25)",borderRadius:10,padding:"12px 16px",marginBottom:28,fontSize:12,color:"#7d7248",fontFamily:"'Jost',sans-serif",fontWeight:400}}>
                ℹ Your parking spot will be automatically assigned upon submission.
              </div>

              {resMsg && <div style={{padding:"12px 16px",borderRadius:10,background:resMsg.startsWith("✅")?"rgba(80,140,80,.08)":"rgba(180,60,60,.06)",border:`1px solid ${resMsg.startsWith("✅")?"rgba(80,140,80,.3)":"rgba(180,60,60,.25)"}`,fontSize:13,fontWeight:500,fontFamily:"'Jost',sans-serif",color:resMsg.startsWith("✅")?"#3d6b4f":"#8b3a3a",marginBottom:20}}>{resMsg}</div>}

              <div style={{display:"flex",gap:12,justifyContent:"space-between"}}>
                <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
                <button className="btn-ghost" style={{color:"#9a6a30",borderColor:"rgba(154,106,48,.3)"}} onClick={()=>{setResDate("");setResTime(""); setResMsg("")}}>Clear</button>
                <button className="btn-primary" onClick={handleReserve}>Reserve a Spot ✓</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            DROP OFF PAGE
        ══════════════════════════════════════════════ */}
        {page==="dropoff" && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>Drop Off <span style={{color:"#9a8c5a"}}>Your Car</span></h2>
              <p style={{color:"#8a7e60",fontSize:13,marginTop:6,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Hand over your vehicle at the kiosk</p>
            </div>

            <div className="glass-panel" style={{padding:"40px 44px",maxWidth:520,margin:"0 auto"}}>
              <div style={{width:68,height:68,background:"rgba(154,140,90,.12)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 28px"}}>🚗</div>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Plate Number</label>
                <input className="inp" placeholder="e.g. ABC 1234" value={doPlate} onChange={e=>setDoPlate(e.target.value)}/>
              </div>
              <div style={{marginBottom:28}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Reservation ID</label>
                <input className="inp" placeholder="e.g. RES 1234"/>
              </div>

              {doMsg && <div style={{padding:"12px 16px",borderRadius:10,background:doMsg.startsWith("✅")?"rgba(80,140,80,.08)":"rgba(180,60,60,.06)",border:`1px solid ${doMsg.startsWith("✅")?"rgba(80,140,80,.3)":"rgba(180,60,60,.25)"}`,fontSize:13,fontWeight:500,fontFamily:"'Jost',sans-serif",color:doMsg.startsWith("✅")?"#3d6b4f":"#8b3a3a",marginBottom:20}}>{doMsg}</div>}

              <div style={{display:"flex",gap:12,justifyContent:"space-between"}}>
                <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
                <button className="btn-primary" onClick={handleDropOff}>Check In Car 🚗</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            PICK UP PAGE
        ══════════════════════════════════════════════ */}
        {page==="pickup" && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>Pick Up <span style={{color:"#9a8c5a"}}>Your Car</span></h2>
              <p style={{color:"#8a7e60",fontSize:13,marginTop:6,fontFamily:"'Jost',sans-serif",fontWeight:400}}>Enter your secure pickup code</p>
            </div>

            <div className="glass-panel" style={{padding:"40px 44px",maxWidth:520,margin:"0 auto"}}>
              <div style={{width:68,height:68,background:"rgba(154,140,90,.12)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 28px"}}>🔑</div>
              <div style={{marginBottom:28}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Pickup Code</label>
                <input className="inp" placeholder="e.g. 4816" value={puCode} onChange={e=>setPuCode(e.target.value)} style={{fontSize:20,fontWeight:600,textAlign:"center",letterSpacing:".25em",fontFamily:"'Jost',sans-serif"}}/>
                <p style={{fontSize:11,color:"#b0a882",fontFamily:"'Jost',sans-serif",marginTop:6,textAlign:"center"}}>Try code: <strong style={{color:"#7d7248"}}>4816</strong></p>
              </div>

              {puMsg && <div style={{padding:"12px 16px",borderRadius:10,background:puMsg.startsWith("✅")?"rgba(80,140,80,.08)":puMsg.startsWith("❌")?"rgba(180,60,60,.06)":"rgba(154,140,90,.07)",border:`1px solid ${puMsg.startsWith("✅")?"rgba(80,140,80,.3)":puMsg.startsWith("❌")?"rgba(180,60,60,.25)":"rgba(154,140,90,.3)"}`,fontSize:13,fontWeight:500,fontFamily:"'Jost',sans-serif",color:puMsg.startsWith("✅")?"#3d6b4f":puMsg.startsWith("❌")?"#8b3a3a":"#7d7248",marginBottom:20}}>{puMsg}</div>}

              <div style={{display:"flex",gap:12,justifyContent:"space-between"}}>
                <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
                <button className="btn-primary" onClick={handlePickUp}>Verify Code 🔑</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            CANCEL PAGE
        ══════════════════════════════════════════════ */}
        {page==="cancel" && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>Cancel <span style={{color:"#8b3a3a"}}>Reservation</span></h2>
            </div>

            <div className="glass-panel" style={{padding:"40px 44px",maxWidth:520,margin:"0 auto"}}>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>Enter Reservation ID</label>
                <input className="inp" placeholder="e.g. RES 1234" value={cancelId} onChange={e=>setCancelId(e.target.value)}/>
              </div>

              <div style={{background:"rgba(139,58,58,.06)",border:"1px solid rgba(139,58,58,.2)",borderRadius:10,padding:"12px 16px",marginBottom:28,fontSize:12,color:"#8b3a3a",fontFamily:"'Jost',sans-serif",fontWeight:500}}>
                ⚠ This action cannot be undone.
              </div>

              {cancelMsg && <div style={{padding:"12px 16px",borderRadius:10,background:"rgba(80,140,80,.08)",border:"1px solid rgba(80,140,80,.3)",fontSize:13,fontWeight:500,fontFamily:"'Jost',sans-serif",color:"#3d6b4f",marginBottom:20}}>{cancelMsg}</div>}

              <div style={{display:"flex",gap:12,justifyContent:"space-between"}}>
                <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
                <button className="btn-red" onClick={handleCancel}>Cancel Reservation</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            RESERVATION / PARKING HISTORY
        ══════════════════════════════════════════════ */}
        {(page==="history" || page==="parking-history") && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>
                {page==="history"?"Reservation":"Parking"}{" "}
                <span style={{color:"#9a8c5a"}}>History</span>
              </h2>
              <p style={{color:"#8a7e60",fontSize:13,marginTop:6,fontFamily:"'Jost',sans-serif",fontWeight:400}}>View all your past and upcoming reservations</p>
            </div>

            <div className="table-wrap" style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                <thead>
                  <tr>
                    {["Code","Space","Date","Retrieval","Confirmation","ID","+Ext","Max","Status"].map(h=>(
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_HISTORY.map((row,i)=>(
                    <tr key={i}>
                      <td style={{fontWeight:600,color:"#7d7248"}}>{row.code}</td>
                      <td>{row.space}</td>
                      <td style={{fontFamily:"monospace",fontSize:12}}>{row.date}</td>
                      <td style={{fontFamily:"monospace",fontSize:12}}>{row.retrieval}</td>
                      <td style={{fontWeight:600}}>{row.confirmation}</td>
                      <td>{row.id}</td>
                      <td>{row.ext}</td>
                      <td>{row.max}</td>
                      <td>
                        <span style={{background:statusBg(row.status),color:statusColor(row.status),padding:"4px 12px",borderRadius:100,fontSize:11,fontWeight:600,fontFamily:"'Jost',sans-serif",textTransform:"capitalize"}}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{textAlign:"center",marginTop:24}}>
              <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
            </div>
          </div>
        )}

        {/* UPDATE PAGE */}
        {page==="update" && (
          <div style={{...fly(0),paddingBottom:48,paddingTop:36}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <h2 style={{fontSize:38,fontWeight:700,color:"#3a3020",fontFamily:"'Cormorant Garamond',serif",letterSpacing:".02em"}}>Update <span style={{color:"#9a8c5a"}}>Details</span></h2>
            </div>
            <div className="glass-panel" style={{padding:"40px 44px",maxWidth:520,margin:"0 auto"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px 24px"}}>
                {[{label:"Full Name",ph:"Maya Johnson",type:"text"},{label:"Email",ph:"maya@example.com",type:"email"},{label:"Phone",ph:"+972 50 000 0000",type:"tel"},{label:"Plate Number",ph:"ABC 1234",type:"text"}].map((f,i)=>(
                  <div key={i}>
                    <label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#9a8c5a",fontFamily:"'Jost',sans-serif",marginBottom:8}}>{f.label}</label>
                    <input className="inp" type={f.type} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,justifyContent:"space-between",marginTop:24}}>
                <button className="btn-ghost" onClick={()=>goTo("home")}>← Back</button>
                <button className="btn-primary">Save Changes ✓</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
