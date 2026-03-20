import { useState } from "react";
import ParkGoLanding from "../HomePage";
import Login from "../Login";
import SignUp from "../SignUp";
import CustomerDashboard from "../CustomerDashboard";
import AdminDashboard from "./AdminDashboard";
import AttendantDashboard from "./AttendantDashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "admin")     setPage("admin");
    else if (userData.role === "attendant") setPage("attendant");
    else setPage("dashboard");
  };

  if (page === "login")     return <Login              onNavigate={setPage} onLogin={handleLogin} />;
  if (page === "signup")    return <SignUp             onNavigate={setPage} />;
  if (page === "dashboard") return <CustomerDashboard  onNavigate={setPage} user={user} />;
  if (page === "admin")     return <AdminDashboard     onNavigate={setPage} user={user} />;
  if (page === "attendant") return <AttendantDashboard onNavigate={setPage} onBackToHome={() => setPage("home")} user={user} />;
  return <ParkGoLanding onNavigate={setPage} />;
}
