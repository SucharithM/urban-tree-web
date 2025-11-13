import { Leaf } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const links = [
    { name: "Home", id: "home" },
    { name: "Sensor Data", id: "data" },
    { name: "Team", id: "team" },
    { name: "Research", id: "research" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8" />
            <div>
              <h1 className="text-primary-foreground">Prof. Joy Winbourne</h1>
              <p className="text-xs text-primary-foreground/80">Environmental Research Lab</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === link.id
                    ? "bg-primary-foreground/20"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
