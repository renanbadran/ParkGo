import carImg from "./images/car0.jpeg";

export default function LoginPage({ onNavigate }) {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "serif",
      background: "#eaeaea"
    }}>

      {/* LEFT SIDE */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "80px"
      }}>

        <h1 style={{
          fontSize: "70px",
          color: "#4a4444",
          margin: 0
        }}>
          ParkGO
        </h1>

        <h2 style={{
          color: "#4f8c95",
          fontStyle: "italic",
          marginTop: "10px"
        }}>
          welcome
        </h2>

        <p style={{
          marginTop: "10px",
          fontSize: "20px",
          color: "#333"
        }}>
          Your smart parking <br />
          starts here
        </p>

        {/* INPUTS */}
        <div style={{ marginTop: "30px", width: "380px" }}>
          <input
            placeholder="Username"
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            style={inputStyle}
          />

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "15px" }}>
            <button style={{...btnStyle, flex:1}} onClick={() => onNavigate ? onNavigate("dashboard") : window.location.hash = "#CustomerDashboard"}>
              Sign In SUB
            </button>

            <button style={{...btnStyle, flex:1}} onClick={() => onNavigate ? onNavigate("admin") : window.location.hash = "#AdminDashboard"}>
              Sign In MANG
            </button>

            <button style={{...btnStyle, flex:1}} onClick={() => onNavigate ? onNavigate("attendant") : window.location.hash = "#AttendantDashboard"}>
              Sign In ATT
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div style={{
        flex: 1,
        position: "relative",
        overflow: "hidden"
      }}>
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