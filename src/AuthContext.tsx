// Authentication Context for managing user authentication state
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import { urbanTreeAPI } from "./api-services";
import type { AuthUser, AuthLoginRequest } from "./api-types";

// Define the shape of our context
interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// Create the context with undefined as initial value
const AuthContextInstance = createContext<AuthContextValue | undefined>(undefined);

// Props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has a valid token on mount
    const token = urbanTreeAPI.getToken();
    if (token) {
      // Token exists, but we need to verify it's valid
      // You might want to add a /auth/me endpoint to verify the token
      // For now, we'll just check if token exists
      try {
        const userData = localStorage.getItem("auth_user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: AuthLoginRequest) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await urbanTreeAPI.login(credentials);
      console.log("Login response:", response);
      setUser(response.user);
      console.log("Logged in user:", response.user);
      // Save user data to localStorage for persistence
      localStorage.setItem("auth_user", JSON.stringify(response.user));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await urbanTreeAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("auth_user");
      setIsLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  };

  return <AuthContextInstance.Provider value={value}>{children}</AuthContextInstance.Provider>;
}

// Custom hook to use the auth context
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContextInstance);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
