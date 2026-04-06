import { useState } from "react";
import carImg from "./images/car0.jpeg";
import { supabase } from "./supabaseClient";

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrMsg("Please enter email and password");
      return;
    }

    setErrMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setErrMsg(error.message);
      return;
    }

    const role = data.user?.user_metadata?.role || "customer";
    

    if (role === "admin") {
      onNavigate ? onNavigate("admin") : window.location.hash = "#AdminDashboard";
    } else if (role === "attendant") {
      onNavigate ? onNavigate("attendant") : window.location.hash = "#AttendantDashboard";
    } else {
      onNavigate ? onNavigate("dashboard") : window.location.hash = "#CustomerDashboard";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "serif",
        background: "#eaeaea"
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px"
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            color: "#4a4444",
            margin: 0
          }}
        >
          ParkGO
        </h1>

        <h2
          style={{
            color: "#4f8c95",
            fontStyle: "italic",
            marginTop: "10px"
          }}
        >
          welcome
        </h2>

        <p
          style={{
            marginTop: "10px",
            fontSize: "20px",
            color: "#333"
          }}
        >
          Your smart parking <br />
          starts here
        </p>

        {/* INPUTS */}
        <div style={{ marginTop: "30px", width: "380px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {errMsg && (
            <p style={{ color: "red", marginTop: "10px", marginBottom: "10px" }}>
              {errMsg}
            </p>
          )}

          <div style={{ marginTop: "15px" }}>
            <button
              style={{ ...btnStyle, width: "100%" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <img
          src={carImg}
          alt="car"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "none",
  borderBottom: "1px solid #aaa",
  background: "transparent",
  outline: "none"
};

const btnStyle = {
  width: "120px",
  padding: "10px",
  borderRadius: "20px",
  border: "none",
  background: "#3b6f7a",
  color: "#fff",
  cursor: "pointer"
};