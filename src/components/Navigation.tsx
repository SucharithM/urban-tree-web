import { Leaf, Menu, X, Globe } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState, useEffect } from "react";
import messages_en from "../app/locales/en.json";
import messages_es from "../app/locales/es.json";
import { useSelector, useDispatch } from 'react-redux';
import { setLocale } from '../app/LocaleSlice';
import { links_en, links_es } from "../app/publications";
import { IntlProvider, FormattedMessage } from "react-intl";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [inputValue, setInputValue] = useState('');
  debugger
  const locale = useSelector(state => state.locale.value)
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let links = locale === "es" ? links_es : links_en;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // You can then use windowWidth to conditionally render or apply styles
  const isReduced = windowWidth < 768; // Example breakpoint

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const messages = {
    en: messages_en,
    es: messages_es
  }



  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <nav className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border shadow-sm">
        {!isReduced && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 relative">
              {/* Left Side: Logo & Text */}
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                <div>
                  <h1 className="text-primary-foreground">Prof. Joy Winbourne</h1>
                  <p className="text-xs text-primary-foreground/80">Environmental Research Lab</p>
                </div>
              </div>

              {/* Right Side - Desktop Navigation & Language Selector */}

              <div className="md:flex items-center gap-4">
                {/* Desktop Navigation Links */}
                <div className="flex gap-1">
                  {links.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => onNavigate(link.id)}
                      className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${currentPage === link.id
                        ? "bg-primary-foreground/20"
                        : "hover:bg-primary-foreground/10"
                        }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Language Selector */}
              <Tabs defaultValue="English">
                <TabsList className="grid w-[180px] grid-cols-2">
                  <TabsTrigger value="English" onClick={() => dispatch(setLocale("en"))}>English</TabsTrigger>
                  <TabsTrigger value="Español" onClick={() => dispatch(setLocale("es"))}>Español</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isReduced && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 relative">

              {/* Left Side: Logo & Text */}
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                <div>
                  <h1 className="text-primary-foreground">Prof. Joy Winbourne</h1>
                  <p className="text-xs text-primary-foreground/80">Environmental Research Lab</p>
                </div>
              </div>

              <button
                className="p-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {/* Mobile Dropdown Menu */}
              {isMenuOpen && (
                <div className="md:hidden absolute w-full left-0 top-16 bg-primary shadow-xl border-t border-border">
                  <div className="flex flex-col p-4 space-y-2">
                    {/* Mobile Links */}
                    {links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          onNavigate(link.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${currentPage === link.id
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "hover:bg-primary-foreground/10 text-primary-foreground"
                          }`}
                      >
                        {link.name}
                      </button>
                    ))}

                    {/* Mobile Language Switcher */}
                    <div className="pt-2 border-t border-primary-foreground/10">
                      <Tabs defaultValue="English">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger
                            value="English"
                            onClick={() => {
                              dispatch(setLocale("en"));
                              setIsMenuOpen(false);
                            }}
                          >
                            English
                          </TabsTrigger>
                          <TabsTrigger
                            value="Español"
                            onClick={() => {
                              dispatch(setLocale("es"));
                              setIsMenuOpen(false);
                            }}
                          >
                            Español
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </IntlProvider>
  );
}
