import { useState } from "react";
import HomePage from "./pages/auth/HomePage";
import SubscriberDashboard from "./pages/subscriber/SubscriberDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AttendantDashboard from "./pages/attendant/AttendantDashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "admin")     setPage("admin");
    else if (userData.role === "attendant") setPage("attendant");
    else setPage("dashboard");
  };

  if (page === "dashboard") return <SubscriberDashboard  onNavigate={setPage} user={user} />;
  if (page === "admin")     return <ManagerDashboard     onNavigate={setPage} user={user} />;
  if (page === "attendant") return <AttendantDashboard onNavigate={setPage} onBackToHome={() => setPage("home")} user={user} />;
  return <HomePage onNavigate={setPage} onLogin={handleLogin} />;
}
