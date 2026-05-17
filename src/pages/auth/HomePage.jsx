import { useState } from "react";
import carImg from "../../images/car0.jpeg";
import { authService } from "../../services/auth.service";

export default function HomePage({ onNavigate, onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const result = await authService.loginUser({ identifier, password });

    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.message);
      return;
    }

    onLogin?.(result.user);
  };

  return (
    <div style={pageStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

        .home-shell {
          min-height: calc(100vh - 9px);
          display: grid;
          grid-template-columns: minmax(390px, 520px) minmax(360px, 1fr);
          align-items: center;
          gap: clamp(12px, 2vw, 34px);
          padding: 28px clamp(14px, 1.8vw, 24px) 26px clamp(40px, 5vw, 88px);
          position: relative;
          overflow: hidden;
        }

        .home-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 78% 43%, rgba(144, 149, 156, 0.17), transparent 16%),
            radial-gradient(circle at 80% 43%, rgba(255, 255, 255, 0.65), transparent 22%);
          pointer-events: none;
        }

        .home-copy {
          position: relative;
          z-index: 1;
          width: min(100%, 470px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-self: start;
        }

        .brand-row {
          display: flex;
          align-items: center;
          margin: 0 0 2px -10px;
          color: #494240;
          font-family: "Cormorant Garamond", serif;
        }

        .brand-mark {
          font-size: 10.6rem;
          line-height: 0.72;
          font-weight: 600;
          letter-spacing: -0.09em;
          margin-right: -4px;
        }

        .brand-word {
          font-size: 5.45rem;
          line-height: 0.86;
          font-weight: 400;
          margin-top: 4px;
        }

        .welcome-word {
          margin: -18px 0 8px 108px;
          color: #2d7081;
          font-family: "Allura", cursive;
          font-size: 4rem;
          line-height: 1;
          font-weight: 400;
        }

        .hero-title {
          width: 380px;
          margin: 0 0 26px 58px;
          color: #211d1c;
          font-family: "Cormorant Garamond", serif;
          font-size: 4.55rem;
          line-height: 0.86;
          font-weight: 500;
          text-align: center;
        }

        .signin-card {
          width: 292px;
          margin-left: 72px;
          padding: 18px 18px 16px;
          display: grid;
          gap: 11px;
          border-radius: 28px;
          border: 1px solid rgba(175, 166, 161, 0.14);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 22px 44px rgba(67, 58, 53, 0.09);
          backdrop-filter: blur(14px);
        }

        .signin-field {
          width: 100%;
          border: 1px solid rgba(168, 158, 153, 0.36);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.96);
          padding: 15px 16px;
          color: #312d2b;
          font-size: 0.98rem;
          font-family: "Manrope", sans-serif;
          outline: none;
          box-shadow: inset 0 -1px 0 rgba(110, 101, 96, 0.08), 0 12px 18px rgba(86, 76, 72, 0.04);
          transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }

        .signin-field::placeholder {
          color: rgba(144, 140, 138, 0.84);
        }

        .signin-field:focus {
          border-color: rgba(45, 112, 129, 0.72);
          box-shadow: 0 0 0 4px rgba(45, 112, 129, 0.08), 0 12px 22px rgba(86, 76, 72, 0.06);
          transform: translateY(-1px);
        }

        .signin-field:-webkit-autofill,
        .signin-field:-webkit-autofill:hover,
        .signin-field:-webkit-autofill:focus {
          -webkit-text-fill-color: #312d2b;
          box-shadow: 0 0 0 1000px #ffffff inset;
          transition: background-color 9999s ease-out 0s;
        }

        .signin-button {
          display: block;
          width: 130px;
          border: 0;
          border-radius: 999px;
          margin: 6px auto 0;
          padding: 13px 20px;
          background: #2d7081;
          color: #ffffff;
          font-size: 1.08rem;
          font-weight: 600;
          font-family: "Manrope", sans-serif;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
          box-shadow: 0 16px 28px rgba(45, 112, 129, 0.24);
        }

        .signin-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 32px rgba(45, 112, 129, 0.28);
        }

        .signin-button:disabled {
          cursor: wait;
          opacity: 0.8;
        }

        .signup-link {
          margin: 16px 0 0 84px;
          border: 0;
          background: transparent;
          color: #7f7673;
          font-size: 0.88rem;
          font-family: "Manrope", sans-serif;
          cursor: pointer;
        }

        .home-error {
          width: 292px;
          margin: 14px 0 0 72px;
          padding: 12px 14px;
          border-radius: 18px;
          background: rgba(173, 67, 67, 0.08);
          color: #914646;
          font-size: 0.82rem;
          line-height: 1.45;
          font-family: "Manrope", sans-serif;
        }

        .home-visual {
          position: relative;
          z-index: 1;
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: clamp(0px, 1.3vw, 20px);
          overflow: visible;
        }

        .car-aura {
          position: absolute;
          right: 7%;
          top: 15%;
          width: min(42vw, 520px);
          height: min(42vw, 520px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(61, 68, 75, 0.14) 0%, rgba(255, 255, 255, 0) 72%);
          filter: blur(6px);
        }

        .hero-car {
          position: relative;
          right: -2.4vw;
          width: min(43vw, 560px);
          max-height: 88vh;
          object-fit: contain;
          filter: drop-shadow(0 22px 42px rgba(39, 37, 36, 0.18));
        }

        @media (max-width: 980px) {
          .home-shell {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 34px 24px 28px;
          }

          .home-copy {
            align-items: center;
          }

          .welcome-word,
          .hero-title,
          .signin-card,
          .signup-link,
          .home-error {
            margin-left: 0;
          }

          .brand-mark {
            font-size: 8rem;
          }

          .brand-word {
            font-size: 4.25rem;
          }

          .welcome-word {
            font-size: 3.45rem;
            margin-top: -4px;
          }

          .hero-title {
            width: auto;
            font-size: 3.5rem;
            margin-bottom: 22px;
          }

          .home-visual {
            min-height: auto;
            justify-content: center;
          }

          .car-aura {
            right: 50%;
            top: 8%;
            transform: translateX(50%);
            width: 78vw;
            height: 78vw;
          }

          .hero-car {
            right: 0;
            width: min(78vw, 440px);
            max-height: 52vh;
          }
        }

        @media (max-width: 640px) {
          .brand-mark {
            font-size: 6.8rem;
          }

          .brand-word {
            font-size: 3.35rem;
            margin-top: 6px;
          }

          .welcome-word {
            font-size: 2.9rem;
          }

          .hero-title {
            font-size: 2.95rem;
          }

          .signin-card {
            width: min(100%, 300px);
          }
        }
      `}</style>

      <div className="home-shell">
        <div className="home-copy">
          <div className="brand-row">
            <span className="brand-mark">P</span>
            <span className="brand-word">arkGo</span>
          </div>

          <div className="welcome-word">welcome</div>

          <h1 className="hero-title">
            Your smart parking
            <br />
            starts here
          </h1>

          <form onSubmit={handleSubmit} className="signin-card">
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Email"
              className="signin-field"
            />

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="signin-field"
            />

            <button type="submit" disabled={loading} className="signin-button">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {errorMsg ? <div className="home-error">{errorMsg}</div> : null}
        </div>

        <div className="home-visual" aria-hidden="true">
          <div className="car-aura" />
          <img src={carImg} alt="ParkGo car" className="hero-car" />
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f4f2",
  borderTop: "9px solid #d8cecb",
  color: "#221f1d",
};
