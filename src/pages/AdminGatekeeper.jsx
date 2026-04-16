import { useState } from "react";
import AdminDashboard from "./AdminDashboard"; // Your existing dashboard

export default function AdminGatekeeper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // In a real app, this would check against an Environment Variable
  const ATELIER_KEY = "Arinya123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ATELIER_KEY) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-12 text-center">

        {/* Branding */}
        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl tracking-[0.3em] text-white">ARINYA</span>
          <span className="font-sans text-[10px] tracking-[0.6em] uppercase text-arinya-gold mt-1">Atelier Access</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Private Access Key"
              className={`w-full bg-transparent border-b ${error ? 'border-arinya-red' : 'border-white/20'} py-4 text-center text-white font-sans tracking-[0.5em] outline-none focus:border-arinya-gold transition-all`}
              autoFocus
            />
            {error && (
              <p className="text-arinya-red font-sans text-[10px] uppercase tracking-widest mt-4 animate-shake">
                Invalid Credentials. Access Denied.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-accent w-full py-4 text-[#0F0F0F] font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl"
          >
            Authenticate
          </button>
        </form>

        <p className="text-white/30 font-sans text-[9px] uppercase tracking-widest">
          Restricted to authorized boutique staff only.
        </p>
      </div>
    </div>
  );
}
