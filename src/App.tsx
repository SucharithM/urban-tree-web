import { useState } from "react";

import { AuthProvider, useAuth } from "./AuthContext";
import { AdminPage } from "./components/AdminPage";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { Navigation } from "./components/Navigation";
import { ResearchPage } from "./components/ResearchPage";
import { SensorDataPage } from "./components/SensorDataPage";
import { TeamPage } from "./components/TeamPage";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const { isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    // After successful login, redirect to sensor data page
    setCurrentPage("data");
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage("home");
  };

  const renderPage = () => {
    // Show login page if trying to access admin without authentication
    if (currentPage === "admin" && !isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (currentPage === "login") {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "data":
        return <SensorDataPage />;
      case "team":
        return <TeamPage />;
      case "research":
        return <ResearchPage />;
      case "admin":
        return <AdminPage />;
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
