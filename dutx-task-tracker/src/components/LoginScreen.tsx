import React, { useState } from "react";
import { Bolt, AtSign, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, insira o seu e-mail.");
      return;
    }
    setError("");
    onLogin(email);
  };

  const handleSkip = () => {
    onLogin("guest@dutx.com");
  };

  const simulateSocialLogin = (platform: string) => {
    onLogin(`${platform.toLowerCase()}user@dutx.com`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-full h-full flex-1 bg-background text-on-surface flex flex-col justify-between"
    >
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-4 h-16 max-w-md mx-auto">
        <div className="text-2xl font-bold tracking-tight text-primary-container">
          dutX
        </div>
        <button
          onClick={handleSkip}
          className="px-4 py-1 text-sm font-semibold text-primary-container hover:bg-surface-container/50 active:scale-95 transition-all rounded-full cursor-pointer"
        >
          Pular
        </button>
      </header>

      {/* Main Content Form Container */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 w-full max-w-md mx-auto">
        <div className="w-full flex flex-col gap-8">
          {/* Hero Branding */}
          <div className="flex flex-col items-center text-center gap-4">
            <motion.div
              animate={{ rotate: [3, -1, 3] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-18 h-18 bg-primary-container flex items-center justify-center rounded-2xl shadow-lg border border-primary-container/20"
            >
              <Bolt className="text-on-primary-container w-10 h-10 fill-on-primary-container" />
            </motion.div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-on-surface">
                {isRegistering ? "Criar conta" : "Bem-vindo"}
              </h1>
              <p className="text-on-surface-variant text-sm">
                {isRegistering
                  ? "junte-se a nós para organizar as suas metas!"
                  : "faça login para não perder suas tarefas!"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-950/40 text-red-300 text-xs py-2 px-3 rounded-lg border border-red-900/30 text-center animate-pulse">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider px-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-container border-none focus:outline-none focus:ring-2 focus:ring-primary-container text-on-surface h-13 pl-4 pr-11 rounded-xl text-sm placeholder:text-neutral-500 transition-all font-sans"
                />
                <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Simulação: Enviar link de redefinição de senha para " + (email || "seu email"))}
                  className="text-xs font-semibold text-primary-container hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container border-none focus:outline-none focus:ring-2 focus:ring-primary-container text-on-surface h-13 pl-4 pr-11 rounded-xl text-sm placeholder:text-neutral-500 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-on-surface transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 bg-primary-container text-on-primary-container font-semibold h-13 rounded-full hover:brightness-110 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 text-sm shadow-premium cursor-pointer"
            >
              {isRegistering ? "Criar Conta" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="flex flex-col gap-4">
            <div className="relative flex items-center gap-4 py-1">
              <div className="h-[1px] flex-grow bg-surface-container-highest"></div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-center">
                Or continue with
              </span>
              <div className="h-[1px] flex-grow bg-surface-container-highest"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-display text-sm font-medium">
              <button
                type="button"
                onClick={() => simulateSocialLogin("Google")}
                className="flex items-center justify-center gap-2 h-12 bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all rounded-xl border border-white/5 cursor-pointer text-xs"
              >
                <span className="w-4 h-4 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-[10px] font-bold">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => simulateSocialLogin("Apple")}
                className="flex items-center justify-center gap-2 h-12 bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all rounded-xl border border-white/5 cursor-pointer text-xs"
              >
                <span className="w-4 h-4 bg-white/20 text-white rounded-full flex items-center justify-center text-[10px] font-bold"></span>
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-on-surface-variant font-medium">
              {isRegistering ? "Já tem uma conta?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-primary-container font-bold hover:underline"
              >
                {isRegistering ? "Faça login" : "Create account"}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-neutral-600">
        © 2026 dutX Platform. All rights reserved.
      </footer>
    </motion.div>
  );
}
