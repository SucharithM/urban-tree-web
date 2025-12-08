import { useState } from "react";

import { AdminPage } from "./components/AdminPage";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { Navigation } from "./components/Navigation";
import { ResearchPage } from "./components/ResearchPage";
import { SensorDataPage } from "./components/SensorDataPage";
import { TeamPage } from "./components/TeamPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("admin");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "data":
        return <SensorDataPage />;
      case "team":
        return <TeamPage />;
      case "research":
        return <ResearchPage />;
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "admin":
        return isAuthenticated ? <AdminPage /> : <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}