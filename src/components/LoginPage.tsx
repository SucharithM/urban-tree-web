import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../AuthContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const { login, error: authError } = useAuth();

  // Combine local validation errors with auth errors
  const error = localError || authError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    if (!email.includes("@")) {
      setLocalError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      // If login is successful, call the onLogin callback
      onLogin();
    } catch (err) {
      // Error is already handled by AuthContext
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access the research dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="urbantree.ecoproject@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:border-primary focus:ring-primary"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-accent transition-colors"
                  onClick={() => alert("Password reset functionality would be implemented here")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:border-primary focus:ring-primary"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Need access?{" "}
              <button
                type="button"
                className="text-primary hover:text-accent transition-colors font-medium"
                onClick={() =>
                  alert("Contact administrator functionality would be implemented here")
                }
              >
                Contact the research team
              </button>
            </p>
          </div>
        </Card>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            This portal is for authorized research personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
