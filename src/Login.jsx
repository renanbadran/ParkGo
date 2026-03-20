import { useState, useEffect, useRef } from "react";

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

import { loginUser } from "./Userstore";

export default function Login({ onNavigate, onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errMsg, setErrMsg]     = useState("");
  const [vis, setVis]           = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 60); }, []);
  const fly = (d=0) => ({ opacity:vis?1:0, transform:vis?"translateY(0) scale(1)":"translateY(28px) scale(.97)", transition:`opacity .45s cubic-bezier(.22,1,.36,1) ${d}ms, transform .45s cubic-bezier(.22,1,.36,1) ${d}ms` });

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"#F0F9FF",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .li{width:100%;background:rgba(255,255,255,.9);border:1.5px solid rgba(186,230,253,.6);border-radius:14px;padding:14px 18px;color:#0C4A6E;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .2s}
        .li:focus{border-color:#0EA5E9;background:#fff;box-shadow:0 0 0 4px rgba(14,165,233,.1);transform:scale(1.01)}
        .li::placeholder{color:#94A3B8}
        .sb{flex:1;background:rgba(255,255,255,.85);border:1.5px solid rgba(186,230,253,.5);border-radius:14px;color:#0369A1;padding:12px 16px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;backdrop-filter:blur(8px)}
        .sb:hover{border-color:#38BDF8;transform:translateY(-2px);box-shadow:0 8px 20px rgba(14,165,233,.15)}
        .btn-main{width:100%;background:linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8);border:none;color:#fff;padding:15px;border-radius:14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;transition:all .25s;box-shadow:0 4px 20px rgba(14,165,233,.35)}
        .btn-main:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 12px 36px rgba(14,165,233,.5)}
        .btn-main:active{transform:scale(.97)}
        .lnk{background:none;border:none;color:#0284C7;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;padding:0;transition:all .2s}
        .lnk:hover{color:#0EA5E9;text-decoration:underline}
        .eye{background:none;border:none;cursor:pointer;position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:16px;color:#94A3B8;padding:0;transition:all .2s}
        .eye:hover{color:#0EA5E9;transform:translateY(-50%) scale(1.2)}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blobP{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes glowP{0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,.4)}50%{box-shadow:0 0 0 10px rgba(14,165,233,0)}}
        .blob{animation:blobP 8s ease-in-out infinite}
        .glow{animation:glowP 2.5s ease-in-out infinite}
      `}</style>
      <Particles/>
      <div className="blob" style={{position:"fixed",top:"-120px",right:"-100px",width:400,height:400,borderRadius:"60% 40% 70% 30%",background:"linear-gradient(135deg,rgba(56,189,248,.18),rgba(14,165,233,.1))",zIndex:0,pointerEvents:"none",filter:"blur(45px)"}}/>
      <div className="blob" style={{position:"fixed",bottom:"-100px",left:"-80px",width:360,height:360,borderRadius:"40% 60% 30% 70%",background:"rgba(186,230,253,.15)",zIndex:0,pointerEvents:"none",filter:"blur(40px)",animationDelay:"4s"}}/>

      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:420}}>
        <div style={{...fly(0),textAlign:"center",marginBottom:32}}>
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

        <div style={{...fly(80),background:"rgba(255,255,255,.85)",border:"1.5px solid rgba(186,230,253,.5)",borderRadius:24,padding:"44px 40px",boxShadow:"0 24px 64px rgba(14,165,233,.13)",backdropFilter:"blur(20px)"}}>
          <div style={{marginBottom:32}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(56,189,248,.1)",border:"1.5px solid rgba(56,189,248,.25)",borderRadius:100,padding:"5px 14px",fontSize:11,fontWeight:700,color:"#0284C7",letterSpacing:".06em",marginBottom:16}}>
              ✦ Welcome Back
            </div>
            <h1 style={{fontSize:36,fontWeight:800,lineHeight:1.1,color:"#0C4A6E",letterSpacing:"-.02em"}}>
              Sign in to your<br/>
              <span style={{background:"linear-gradient(135deg,#0284C7,#0EA5E9,#38BDF8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>account</span>
            </h1>
            <div style={{width:36,height:3,background:"linear-gradient(90deg,#0EA5E9,#7DD3FC)",borderRadius:4,marginTop:14}}/>
          </div>

          <div style={{display:"flex",gap:10,marginBottom:22}}>
            <button className="sb"><span>🌐</span> Google</button>
            <button className="sb"><span>🍎</span> Apple</button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
            <div style={{flex:1,height:1,background:"rgba(56,189,248,.2)"}}/>
            <span style={{color:"#94A3B8",fontSize:11,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase"}}>or</span>
            <div style={{flex:1,height:1,background:"rgba(56,189,248,.2)"}}/>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#64748B",marginBottom:8}}>Email Address</label>
            <input className="li" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>

          <div style={{marginBottom:10}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#64748B",marginBottom:8}}>Password</label>
            <div style={{position:"relative"}}>
              <input className="li" type={showPass?"text":"password"} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{paddingRight:46}}/>
              <button className="eye" onClick={()=>setShowPass(!showPass)}>{showPass?"🙈":"👁"}</button>
            </div>
          </div>

          <div style={{textAlign:"right",marginBottom:26}}>
            <button className="lnk" style={{fontSize:12}}>Forgot password?</button>
          </div>

          {errMsg && (
            <div style={{padding:"12px 16px",borderRadius:12,background:"rgba(239,68,68,.08)",border:"1.5px solid rgba(239,68,68,.3)",fontSize:13,fontWeight:600,color:"#DC2626",marginBottom:16}}>
              ⚠ {errMsg}
            </div>
          )}

          <button className="btn-main" onClick={()=>{
            if (!email || !password) { setErrMsg("Please enter email and password."); return; }
            setErrMsg(""); setLoading(true);
            setTimeout(() => {
              const result = loginUser({ email, password });
              setLoading(false);
              if (!result.success) { setErrMsg(result.message); return; }
              if (onLogin) onLogin(result.user);
            }, 1200);
          }} disabled={loading}>
            {loading
              ? <span style={{display:"inline-flex",alignItems:"center",gap:10}}><span style={{width:16,height:16,border:"2px solid rgba(255,255,255,.35)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite"}}/>Signing in...</span>
              : "Sign In →"}
          </button>

          <p style={{textAlign:"center",marginTop:24,color:"#94A3B8",fontSize:13}}>
            No account? <button className="lnk" onClick={()=>onNavigate&&onNavigate("signup")}>Create one</button>
          </p>
        </div>

        <div style={{...fly(160),textAlign:"center",marginTop:20}}>
          <button className="lnk" style={{color:"#94A3B8",fontSize:12}} onClick={()=>onNavigate&&onNavigate("home")}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}
