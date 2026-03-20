import { useState, useEffect, useRef } from "react";
import { registerUser } from "./Userstore";

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    c.width=window.innerWidth; c.height=window.innerHeight;
    const pts = Array.from({length:40},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*2.5+.5,dx:(Math.random()-.5)*.4,dy:(Math.random()-.5)*.4,o:Math.random()*.35+.08,col:["#38BDF8","#7DD3FC","#BAE6FD","#0EA5E9"][Math.floor(Math.random()*4)]}));
    let raf;
    const draw=()=>{ctx.clearRect(0,0,c.width,c.height);pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.col;ctx.globalAlpha=p.o;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>c.width)p.dx*=-1;if(p.y<0||p.y>c.height)p.dy*=-1});pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle="#38BDF8";ctx.globalAlpha=(1-d/100)*.12;ctx.lineWidth=.5;ctx.stroke()}}));raf=requestAnimationFrame(draw)};
    draw();
    const onR=()=>{c.width=window.innerWidth;c.height=window.innerHeight};
    window.addEventListener("resize",onR);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onR)};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

export default function SignUp({ onNavigate }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [errMsg, setErrMsg]     = useState("");
  const [vis, setVis]           = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 60); }, []);
  const fly = (d=0) => ({ opacity:vis?1:0, transform:vis?"translateY(0) scale(1)":"translateY(28px) scale(.97)", transition:`opacity .45s cubic-bezier(.22,1,.36,1) ${d}ms, transform .45s cubic-bezier(.22,1,.36,1) ${d}ms` });

  const [staffOpen, setStaffOpen] = useState(false);
  const [staffCode, setStaffCode] = useState("");
  const [staffRole, setStaffRole] = useState("customer"); // customer | attendant | admin
  const [staffMsg,  setStaffMsg]  = useState("");

  const STAFF_CODES = { "ATTEND2025": "attendant", "ADMIN2025": "admin" };

  const checkStaffCode = (code) => {
    const role = STAFF_CODES[code.toUpperCase()];
    if (role) {
      setStaffRole(role);
      setStaffMsg({ ok:true, text: role==="admin" ? "✅ Admin access granted!" : "✅ Attendant access granted!" });
    } else {
      setStaffRole("customer");
      setStaffMsg({ ok:false, text:"❌ Invalid staff code." });
    }
    setTimeout(() => setStaffMsg(""), 2500);
  };

  const str    = password.length===0?0:password.length<6?1:password.length<10?2:3;
  const sLabel = ["","Weak 😟","Fair 😐","Strong 💪"];
  const sColor = ["","#EF4444","#F59E0B","#10B981"];

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"#F0F9FF",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .si{width:100%;background:rgba(255,255,255,.9);border:1.5px solid rgba(186,230,253,.6);border-radius:14px;padding:13px 18px;color:#0C4A6E;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .2s}
        .si:focus{border-color:#0EA5E9;background:#fff;box-shadow:0 0 0 4px rgba(14,165,233,.1);transform:scale(1.01)}
        .si::placeholder{color:#94A3B8}
        .sb2{flex:1;background:rgba(255,255,255,.85);border:1.5px solid rgba(186,230,253,.5);border-radius:14px;color:#0369A1;padding:11px 14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;backdrop-filter:blur(8px)}
        .sb2:hover{border-color:#38BDF8;transform:translateY(-2px);box-shadow:0 8px 20px rgba(14,165,233,.15)}
        .btn-main2{width:100%;background:linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8);border:none;color:#fff;padding:15px;border-radius:14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;transition:all .25s;box-shadow:0 4px 20px rgba(14,165,233,.35)}
        .btn-main2:hover:not(:disabled){transform:translateY(-3px) scale(1.02);box-shadow:0 12px 36px rgba(14,165,233,.5)}
        .btn-main2:active{transform:scale(.97)}
        .btn-main2:disabled{opacity:.4;cursor:not-allowed}
        .lnk2{background:none;border:none;color:#0284C7;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;padding:0;transition:all .2s}
        .lnk2:hover{color:#0EA5E9;text-decoration:underline}
        .eye2{background:none;border:none;cursor:pointer;position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:16px;color:#94A3B8;padding:0;transition:all .2s}
        .eye2:hover{color:#0EA5E9;transform:translateY(-50%) scale(1.2)}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blobP{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes glowP{0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,.4)}50%{box-shadow:0 0 0 10px rgba(14,165,233,0)}}
        .blob{animation:blobP 8s ease-in-out infinite}
        .glow{animation:glowP 2.5s ease-in-out infinite}
      `}</style>
      <Particles/>
      <div className="blob" style={{position:"fixed",top:"-120px",left:"-100px",width:380,height:380,borderRadius:"60% 40% 70% 30%",background:"linear-gradient(135deg,rgba(56,189,248,.18),rgba(14,165,233,.1))",zIndex:0,pointerEvents:"none",filter:"blur(45px)"}}/>
      <div className="blob" style={{position:"fixed",bottom:"-80px",right:"-80px",width:340,height:340,borderRadius:"40% 60% 30% 70%",background:"rgba(186,230,253,.15)",zIndex:0,pointerEvents:"none",filter:"blur(40px)",animationDelay:"4s"}}/>

      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:430}}>
        <div style={{...fly(0),textAlign:"center",marginBottom:28}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12}}>
            <div className="glow" style={{width:44,height:44,background:"linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(14,165,233,.35)"}}>
              <span style={{fontSize:22,fontWeight:800,color:"#fff"}}>P</span>
            </div>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#0C4A6E",letterSpacing:"-.02em"}}>ParkGo</div>
              <div style={{fontSize:9,color:"#38BDF8",letterSpacing:".16em",textTransform:"uppercase",fontWeight:700}}>Smart Valet</div>
            </div>
          </div>
        </div>

        <div style={{...fly(80),background:"rgba(255,255,255,.85)",border:"1.5px solid rgba(186,230,253,.5)",borderRadius:24,padding:"38px 38px",boxShadow:"0 24px 64px rgba(14,165,233,.13)",backdropFilter:"blur(20px)"}}>
          <div style={{marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(56,189,248,.1)",border:"1.5px solid rgba(56,189,248,.25)",borderRadius:100,padding:"5px 14px",fontSize:11,fontWeight:700,color:"#0284C7",letterSpacing:".06em",marginBottom:14}}>
              ✦ Join ParkGo
            </div>
            <h1 style={{fontSize:34,fontWeight:800,lineHeight:1.1,color:"#0C4A6E",letterSpacing:"-.02em"}}>
              Create your<br/>
              <span style={{background:"linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>account</span>
            </h1>
            <div style={{width:36,height:3,background:"linear-gradient(90deg,#0EA5E9,#7DD3FC)",borderRadius:4,marginTop:12}}/>
          </div>

          <div style={{display:"flex",gap:10,marginBottom:18}}>
            <button className="sb2"><span>🌐</span> Google</button>
            <button className="sb2"><span>🍎</span> Apple</button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            <div style={{flex:1,height:1,background:"rgba(56,189,248,.2)"}}/>
            <span style={{color:"#94A3B8",fontSize:11,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase"}}>or</span>
            <div style={{flex:1,height:1,background:"rgba(56,189,248,.2)"}}/>
          </div>

          {[
            {label:"Full Name",    type:"text",  ph:"John Doe",        val:name,  set:setName},
            {label:"Email Address",type:"email", ph:"you@example.com", val:email, set:setEmail},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#64748B",marginBottom:7}}>{f.label}</label>
              <input className="si" type={f.type} placeholder={f.ph} value={f.val} onChange={e=>f.set(e.target.value)}/>
            </div>
          ))}

          <div style={{marginBottom:str>0?5:12}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#64748B",marginBottom:7}}>Password</label>
            <div style={{position:"relative"}}>
              <input className="si" type={showPass?"text":"password"} placeholder="Minimum 8 characters" value={password} onChange={e=>setPassword(e.target.value)} style={{paddingRight:46}}/>
              <button className="eye2" onClick={()=>setShowPass(!showPass)}>{showPass?"🙈":"👁"}</button>
            </div>
          </div>

          {str>0&&(
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",gap:4,marginBottom:5}}>
                {[1,2,3].map(i=><div key={i} style={{flex:1,height:4,borderRadius:4,background:i<=str?sColor[str]:"rgba(56,189,248,.15)",transition:"all .3s cubic-bezier(.22,1,.36,1)",boxShadow:i<=str?`0 2px 8px ${sColor[str]}55`:undefined}}/>)}
              </div>
              <span style={{fontSize:12,color:sColor[str],fontWeight:700}}>{sLabel[str]}</span>
            </div>
          )}

          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#64748B",marginBottom:7}}>Confirm Password</label>
            <input className="si" type={showPass?"text":"password"} placeholder="Repeat your password" value={confirm} onChange={e=>setConfirm(e.target.value)} style={{borderColor:confirm&&confirm!==password?"#EF4444":undefined}}/>
            {confirm&&confirm!==password&&<p style={{color:"#EF4444",fontSize:12,marginTop:5,fontWeight:600}}>⚠ Passwords do not match</p>}
          </div>

          {/* ── Staff Access ── */}
          <div style={{marginBottom:16}}>
            <button onClick={()=>setStaffOpen(!staffOpen)}
              style={{width:"100%",background:"rgba(255,255,255,.6)",border:"1.5px dashed rgba(186,230,253,.7)",borderRadius:12,padding:"11px 16px",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:600,color:"#64748B",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .2s"}}
              onMouseOver={e=>e.currentTarget.style.borderColor="#38BDF8"}
              onMouseOut={e=>e.currentTarget.style.borderColor="rgba(186,230,253,.7)"}>
              <span>🔒 Staff Access</span>
              <span style={{fontSize:10,transition:"transform .2s",display:"inline-block",transform:staffOpen?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
            </button>

            {staffOpen && (
              <div style={{marginTop:10,padding:"16px",background:"rgba(14,165,233,.04)",border:"1.5px solid rgba(186,230,253,.5)",borderRadius:12}}>
                <label style={{display:"block",fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#64748B",marginBottom:8}}>Enter Staff Code</label>
                <div style={{display:"flex",gap:8}}>
                  <input className="si" placeholder="e.g. ATTEND2025" value={staffCode}
                    onChange={e=>{ setStaffCode(e.target.value); if(!e.target.value){ setStaffRole("customer"); }}}
                    style={{letterSpacing:".08em",fontWeight:700}}/>
                  <button onClick={()=>checkStaffCode(staffCode)}
                    style={{background:"linear-gradient(135deg,#0284C7,#38BDF8)",border:"none",color:"#fff",padding:"0 18px",borderRadius:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,flexShrink:0,transition:"all .2s"}}
                    onMouseOver={e=>e.currentTarget.style.transform="scale(1.04)"}
                    onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
                    Apply
                  </button>
                </div>

                {staffMsg && (
                  <div style={{marginTop:8,fontSize:12,fontWeight:600,color:staffMsg.ok?"#059669":"#DC2626"}}>{staffMsg.text}</div>
                )}

                {staffRole!=="customer" && (
                  <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8,background:staffRole==="admin"?"rgba(239,68,68,.07)":"rgba(245,158,11,.07)",border:`1.5px solid ${staffRole==="admin"?"rgba(239,68,68,.2)":"rgba(245,158,11,.2)"}`,borderRadius:10,padding:"8px 12px"}}>
                    <span style={{fontSize:16}}>{staffRole==="admin"?"🛡️":"👷"}</span>
                    <span style={{fontSize:12,fontWeight:700,color:staffRole==="admin"?"#DC2626":"#D97706",textTransform:"capitalize"}}>Registering as: {staffRole}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:20,cursor:"pointer"}} onClick={()=>setAgreed(!agreed)}>
            <div style={{width:22,height:22,borderRadius:8,background:agreed?"linear-gradient(135deg,#0284C7,#38BDF8)":"rgba(255,255,255,.9)",border:agreed?"none":"1.5px solid rgba(186,230,253,.7)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s cubic-bezier(.22,1,.36,1)",marginTop:1,transform:agreed?"scale(1.1)":"scale(1)",boxShadow:agreed?"0 4px 12px rgba(14,165,233,.35)":undefined}}>
              {agreed&&<span style={{color:"#fff",fontSize:13,fontWeight:800,lineHeight:1}}>✓</span>}
            </div>
            <p style={{color:"#64748B",fontSize:12,lineHeight:1.65,userSelect:"none"}}>
              I agree to ParkGo's <span style={{color:"#0284C7",fontWeight:700}}>Terms of Service</span> and <span style={{color:"#0284C7",fontWeight:700}}>Privacy Policy</span>
            </p>
          </div>

          {errMsg && (
            <div style={{padding:"12px 16px",borderRadius:12,background:"rgba(239,68,68,.08)",border:"1.5px solid rgba(239,68,68,.3)",fontSize:13,fontWeight:600,color:"#DC2626",marginBottom:16}}>
              ⚠ {errMsg}
            </div>
          )}

          <button className="btn-main2" onClick={()=>{
            if (!agreed) return;
            if (!name || !email || !password) { setErrMsg("Please fill in all fields."); return; }
            if (password !== confirm) { setErrMsg("Passwords do not match."); return; }
            setErrMsg("");
            setLoading(true);
            setTimeout(() => {
              const result = registerUser({ name, email, password, role: staffRole });
              setLoading(false);
              if (!result.success) { setErrMsg(result.message); return; }
              onNavigate && onNavigate("login");
            }, 1200);
          }} disabled={loading||!agreed}>
            {loading
              ? <span style={{display:"inline-flex",alignItems:"center",gap:10}}><span style={{width:16,height:16,border:"2px solid rgba(255,255,255,.35)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/>Creating account...</span>
              : "Create Account →"}
          </button>

          <p style={{textAlign:"center",marginTop:22,color:"#94A3B8",fontSize:13}}>
            Already a member? <button className="lnk2" onClick={()=>onNavigate&&onNavigate("login")}>Sign in</button>
          </p>
        </div>

        <div style={{...fly(160),textAlign:"center",marginTop:20}}>
          <button className="lnk2" style={{color:"#94A3B8",fontSize:12}} onClick={()=>onNavigate&&onNavigate("home")}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}
