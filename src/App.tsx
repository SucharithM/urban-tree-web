import { useState } from "react";

import { HomePage } from "./components/HomePage";
import { Navigation } from "./components/Navigation";
import { ResearchPage } from "./components/ResearchPage";
import { SensorDataPage } from "./components/SensorDataPage";
import { TeamPage } from "./components/TeamPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
